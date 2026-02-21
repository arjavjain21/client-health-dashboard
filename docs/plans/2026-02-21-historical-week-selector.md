# Historical Week Selector Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a multi-select dropdown to view and compare client health metrics across the last 4 completed Friday-Thursday weeks, with aggregated views for multi-week selections.

**Architecture:** Parallel database tables (historical vs current), new API endpoints for historical data, additive frontend component. Zero breaking changes to existing current-week system.

**Tech Stack:** PostgreSQL, Python (psycopg2), Next.js 16, TypeScript, Tailwind CSS, PM2

---

## Prerequisites

**Read these docs first:**
- `/home/ubuntu/client-health-dashboard/README.md` - Project overview
- `/home/ubuntu/client-health-dashboard/ingest/ingest_main.py` - Current ingestion logic
- `/home/ubuntu/client-health-dashboard/ZERO_POSITIVES_FIX_SUMMARY.md` - Recent RAG fix (for context)

**Environment:**
- Database: `client_health_dashboard_v1` (local PostgreSQL)
- Ingestion: `/home/ubuntu/client-health-dashboard/ingest/ingest_main.py`
- Frontend: `/home/ubuntu/client-health-dashboard/app/`
- Process: PM2 manages `client-health-dashboard` app

**Safety constraints:**
- DO NOT modify `client_7d_rollup_v1_local` table
- DO NOT modify `client_health_dashboard_v1_local` table
- DO NOT modify existing `/api/dashboard` endpoint
- DO NOT modify current ingestion logic for Friday-to-yesterday
- All new code in separate tables/functions/endpoints

---

## Task 1: Create Database Migration for Historical Tables

**Files:**
- Create: `/home/ubuntu/client-health-dashboard/db/migration_001_historical_tables.sql`

**Step 1: Create the migration file**

```bash
cat > /home/ubuntu/client-health-dashboard/db/migration_001_historical_tables.sql << 'EOF'
-- Migration: Add historical week tables
-- Created: 2026-02-21
-- Description: New tables to store last 4 completed weeks (parallel to current week tables)

-- Table 1: Historical 7-day rollups
CREATE TABLE IF NOT EXISTS client_7d_rollup_historical (
    id SERIAL PRIMARY KEY,
    client_id BIGINT NOT NULL,
    client_code TEXT NOT NULL,

    -- Period tracking
    period_start_date DATE NOT NULL,
    period_end_date DATE NOT NULL,
    week_number INTEGER NOT NULL, -- 1=last week, 2=two weeks ago, etc.

    -- Metrics (same as client_7d_rollup_v1_local)
    contacted_7d INTEGER DEFAULT 0,
    replies_7d INTEGER DEFAULT 0,
    positives_7d INTEGER DEFAULT 0,
    bounces_7d INTEGER DEFAULT 0,
    new_leads_reached_7d INTEGER DEFAULT 0,
    reply_rate_7d NUMERIC(10, 4),
    positive_reply_rate_7d NUMERIC(10, 4),
    bounce_pct_7d NUMERIC(10, 4),
    most_recent_reporting_end_date DATE,

    -- Metadata
    computed_at TIMESTAMPTZ DEFAULT NOW(),

    -- Constraints
    UNIQUE(client_id, period_start_date),
    FOREIGN KEY (client_id) REFERENCES clients_local(client_id) ON DELETE CASCADE
);

-- Table 2: Historical dashboard dataset (with RAG)
CREATE TABLE IF NOT EXISTS client_health_dashboard_historical (
    id SERIAL PRIMARY KEY,
    client_id BIGINT NOT NULL,
    client_code TEXT NOT NULL,
    client_name TEXT,
    client_company_name TEXT,
    relationship_status TEXT,
    assigned_account_manager_name TEXT,
    assigned_inbox_manager_name TEXT,
    assigned_sdr_name TEXT,
    weekly_target_int INTEGER,
    weekly_target_missing BOOLEAN,
    closelix BOOLEAN,
    bonus_pool_monthly NUMERIC(10, 2),
    weekend_sending_effective BOOLEAN DEFAULT FALSE,
    monthly_booking_goal NUMERIC(10, 2),

    -- Period tracking
    period_start_date DATE NOT NULL,
    period_end_date DATE NOT NULL,
    week_number INTEGER NOT NULL,

    -- 7-day metrics
    contacted_7d INTEGER DEFAULT 0,
    replies_7d INTEGER DEFAULT 0,
    positives_7d INTEGER DEFAULT 0,
    bounces_7d INTEGER DEFAULT 0,
    reply_rate_7d NUMERIC(10, 4),
    positive_reply_rate_7d NUMERIC(10, 4),
    bounce_pct_7d NUMERIC(10, 4),
    new_leads_reached_7d INTEGER DEFAULT 0,
    prorated_target NUMERIC(10, 2),

    -- Computed metrics
    volume_attainment NUMERIC(10, 4),
    pcpl_proxy_7d NUMERIC(10, 4),
    not_contacted_leads BIGINT DEFAULT 0,

    -- Flags
    deliverability_flag BOOLEAN DEFAULT FALSE,
    volume_flag BOOLEAN DEFAULT FALSE,
    mmf_flag BOOLEAN DEFAULT FALSE,
    data_missing_flag BOOLEAN DEFAULT FALSE,
    data_stale_flag BOOLEAN DEFAULT FALSE,

    -- RAG status
    rag_status TEXT,
    rag_reason TEXT,

    -- Metadata
    most_recent_reporting_end_date DATE,
    computed_at TIMESTAMPTZ DEFAULT NOW(),

    -- Constraints
    UNIQUE(client_id, period_start_date),
    FOREIGN KEY (client_id) REFERENCES clients_local(client_id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_rollup_hist_period ON client_7d_rollup_historical(period_start_date, period_end_date);
CREATE INDEX IF NOT EXISTS idx_rollup_hist_client ON client_7d_rollup_historical(client_id);
CREATE INDEX IF NOT EXISTS idx_rollup_hist_week ON client_7d_rollup_historical(week_number);

CREATE INDEX IF NOT EXISTS idx_dashboard_hist_period ON client_health_dashboard_historical(period_start_date, period_end_date);
CREATE INDEX IF NOT EXISTS idx_dashboard_hist_client ON client_health_dashboard_historical(client_id);
CREATE INDEX IF NOT EXISTS idx_dashboard_hist_week ON client_health_dashboard_historical(week_number);
CREATE INDEX IF NOT EXISTS idx_dashboard_hist_rag ON client_health_dashboard_historical(rag_status);

-- Success marker
COMMENT ON TABLE client_7d_rollup_historical IS 'Stores last 4 completed Friday-Thursday weeks of rollup data';
COMMENT ON TABLE client_health_dashboard_historical IS 'Stores last 4 completed weeks with RAG status for dashboard UI';
EOF
```

**Step 2: Review the migration file**

Run: `cat /home/ubuntu/client-health-dashboard/db/migration_001_historical_tables.sql`
Expected: File contents displayed

**Step 3: Apply the migration to database**

Run: `psql -U ubuntu -d client_health_dashboard_v1 -f /home/ubuntu/client-health-dashboard/db/migration_001_historical_tables.sql`
Expected: Output showing "CREATE TABLE" and "CREATE INDEX" statements

**Step 4: Verify tables were created**

Run:
```bash
psql -U ubuntu -d client_health_dashboard_v1 -c "\dt client_7d_rollup_historical"
psql -U ubuntu -d client_health_dashboard_v1 -c "\dt client_health_dashboard_historical"
```
Expected: Both tables show in output

**Step 5: Commit the migration**

```bash
git add db/migration_001_historical_tables.sql
git commit -m "feat: add historical week tables for 4-week rollback view"
```

---

## Task 2: Add Historical Week Calculation Function

**Files:**
- Modify: `/home/ubuntu/client-health-dashboard/ingest/ingest_main.py`

**Step 1: Read the current Friday-to-yesterday function**

Run: `grep -A 30 "def get_friday_to_yesterday_range" /home/ubuntu/client-health-dashboard/ingest/ingest_main.py`
Expected: Function shows current date calculation logic

**Step 2: Add historical weeks calculation function**

Insert after `get_friday_to_yesterday_range()` function (around line 90):

```python
def get_historical_weeks(num_weeks: int = 4) -> list:
    """
    Calculate last N completed Friday-Thursday weeks.

    A "completed week" is a full Friday-Thursday period that ended before yesterday.
    Week 1 = most recent completed week (last Friday to last Thursday)
    Week 2 = previous completed week, etc.

    Args:
        num_weeks: Number of historical weeks to calculate (default: 4)

    Returns:
        List of dicts with keys: week_number, start_date, end_date (as date objects)
    """
    from datetime import datetime, timedelta

    today = datetime.utcnow().date()
    current_day = today.weekday()  # 0=Monday, ..., 4=Friday, 5=Saturday, 6=Sunday

    # Find yesterday (the end of current incomplete week)
    yesterday = today - timedelta(days=1)

    # Start from yesterday and go back to find completed weeks
    # Each completed week ends on Thursday, starts on Friday (7 days earlier)
    weeks = []

    # Start searching from yesterday
    search_date = yesterday

    for week_num in range(1, num_weeks + 1):
        # Find the most recent Thursday on or before search_date
        # Thursday = weekday 3
        days_since_thursday = (search_date.weekday() - 3) % 7
        most_recent_thursday = search_date - timedelta(days=days_since_thursday)

        # Week starts on Friday (6 days before Thursday)
        week_start = most_recent_thursday - timedelta(days=6)
        week_end = most_recent_thursday

        # If this week is the current incomplete week (contains yesterday but not full), skip it
        if week_end >= yesterday:
            # Move search_date to before this week and try again
            search_date = week_start - timedelta(days=1)
            continue

        weeks.append({
            'week_number': week_num,
            'start_date': week_start,
            'end_date': week_end
        })

        # Move search_date to before this week for next iteration
        search_date = week_start - timedelta(days=1)

    return weeks
```

**Step 3: Test the function**

```bash
cd /home/ubuntu/client-health-dashboard
python3 << 'EOF'
from datetime import datetime, timedelta
import sys
sys.path.insert(0, 'ingest')

# Import the function (will be defined in ingest_main.py)
# For testing, we'll define it inline

def get_historical_weeks(num_weeks: int = 4):
    today = datetime.utcnow().date()
    yesterday = today - timedelta(days=1)
    weeks = []
    search_date = yesterday

    for week_num in range(1, num_weeks + 1):
        days_since_thursday = (search_date.weekday() - 3) % 7
        most_recent_thursday = search_date - timedelta(days=days_since_thursday)
        week_start = most_recent_thursday - timedelta(days=6)
        week_end = most_recent_thursday

        if week_end >= yesterday:
            search_date = week_start - timedelta(days=1)
            continue

        weeks.append({
            'week_number': week_num,
            'start_date': week_start,
            'end_date': week_end
        })
        search_date = week_start - timedelta(days=1)

    return weeks

weeks = get_historical_weeks(4)
for week in weeks:
    print(f"Week {week['week_number']}: {week['start_date']} to {week['end_date']}")
EOF
```
Expected: Output showing 4 weeks with Friday-Thursday ranges

**Step 4: Commit the function**

```bash
git add ingest/ingest_main.py
git commit -m "feat: add historical week calculation function"
```

---

## Task 3: Implement Historical Rollups Computation

**Files:**
- Modify: `/home/ubuntu/client-health-dashboard/ingest/ingest_main.py`

**Step 1: Create historical rollups function**

Add after `compute_7d_rollups()` function (around line 620):

```python
def compute_historical_rollups(local_db: LocalDatabase):
    """Compute and store rollups for last 4 completed Friday-Thursday weeks"""
    logger.info("Computing historical rollups for last 4 completed weeks...")

    # Get historical week definitions
    historical_weeks = get_historical_weeks(num_weeks=4)

    if not historical_weeks:
        logger.warning("No historical weeks to compute")
        return

    for week_info in historical_weeks:
        week_num = week_info['week_number']
        start_date = week_info['start_date']
        end_date = week_info['end_date']

        logger.info(f"Computing historical week {week_num}: {start_date} to {end_date}")

        # Check if this week already exists
        existing_check = local_db.execute_read("""
            SELECT COUNT(*) FROM client_7d_rollup_historical
            WHERE period_start_date = %s
        """, (start_date.isoformat(),))

        if existing_check[0][0] > 0:
            logger.info(f"  Week {week_num} already exists, skipping...")
            continue

        # Compute rollups for this week
        rollup_query = """
            INSERT INTO client_7d_rollup_historical (
                client_id, client_code,
                period_start_date, period_end_date, week_number,
                contacted_7d, replies_7d, positives_7d, bounces_7d,
                reply_rate_7d, positive_reply_rate_7d, bounce_pct_7d,
                new_leads_reached_7d,
                most_recent_reporting_end_date
            )
            SELECT
                m.client_id,
                c.client_code,
                %s as period_start_date,
                %s as period_end_date,
                %s as week_number,
                COALESCE(SUM(cr.total_sent), 0) as contacted_7d,
                COALESCE(SUM(cr.replies_count), 0) as replies_7d,
                COALESCE(SUM(cr.positive_reply), 0) as positives_7d,
                COALESCE(SUM(cr.bounce_count), 0) as bounces_7d,
                CASE
                    WHEN SUM(cr.new_leads_reached) > 0 THEN
                        ROUND(SUM(cr.replies_count)::numeric / SUM(cr.new_leads_reached), 4)
                    ELSE NULL
                END as reply_rate_7d,
                CASE
                    WHEN SUM(cr.replies_count) > 0 THEN
                        ROUND(SUM(cr.positive_reply)::numeric / SUM(cr.replies_count), 4)
                    ELSE NULL
                END as positive_reply_rate_7d,
                CASE
                    WHEN SUM(cr.total_sent) > 0 THEN
                        ROUND(SUM(cr.bounce_count)::numeric / SUM(cr.total_sent), 4)
                    ELSE NULL
                END as bounce_pct_7d,
                COALESCE(SUM(cr.new_leads_reached), 0) as new_leads_reached_7d,
                MAX(cr.end_date) as most_recent_reporting_end_date
            FROM clients_local c
            INNER JOIN client_name_map_local m ON c.client_code = m.client_code
            LEFT JOIN campaign_reporting_local cr
                ON m.client_name_norm = cr.client_name_norm
                AND cr.end_date >= %s
                AND cr.end_date <= %s
            GROUP BY m.client_id, c.client_code
            ON CONFLICT (client_id, period_start_date) DO NOTHING
        """

        start_date_iso = start_date.isoformat()
        end_date_iso = end_date.isoformat()

        rowcount = local_db.execute_write(rollup_query, (
            start_date_iso, end_date_iso, week_num,
            start_date_iso, end_date_iso
        ))

        logger.info(f"  Inserted {rowcount} rollup rows for week {week_num}")

    logger.info(f"Historical rollups complete: {len(historical_weeks)} weeks")
```

**Step 2: Integrate into main ingestion flow**

Find the `main()` function and add the call after `compute_dashboard_dataset()`:

```python
# In main() function, after existing dashboard computation
compute_7d_rollups(local_db)
compute_dashboard_dataset(local_db, days_in_period)

# NEW: Compute historical rollups
compute_historical_rollups(local_db)  # <- ADD THIS LINE
```

**Step 3: Run test ingestion**

```bash
cd /home/ubuntu/client-health-dashboard
source venv/bin/activate
python ingest/ingest_main.py --skip-smartlead 2>&1 | grep -A 5 "historical"
```
Expected: Log messages showing "Computing historical rollups..." and "Inserted X rollup rows"

**Step 4: Verify data was inserted**

Run:
```bash
psql -U ubuntu -d client_health_dashboard_v1 -c "
SELECT week_number, period_start_date, period_end_date, COUNT(*) as client_count
FROM client_7d_rollup_historical
GROUP BY week_number, period_start_date, period_end_date
ORDER BY week_number;
"
```
Expected: 4 rows showing weeks 1-4 with client counts

**Step 5: Commit**

```bash
git add ingest/ingest_main.py
git commit -m "feat: add historical rollups computation function"
```

---

## Task 4: Implement Historical Dashboard Dataset Computation

**Files:**
- Modify: `/home/ubuntu/client-health-dashboard/ingest/ingest_main.py`

**Step 1: Create historical dashboard computation function**

Add after `compute_historical_rollups()` function:

```python
def compute_historical_dashboard_dataset(local_db: LocalDatabase):
    """Compute dashboard dataset (with RAG) for each historical week"""
    logger.info("Computing historical dashboard dataset with RAG...")

    # Get all weeks that have rollup data but no dashboard data
    weeks_to_compute = local_db.execute_read("""
        SELECT DISTINCT week_number, period_start_date, period_end_date
        FROM client_7d_rollup_historical
        WHERE week_number NOT IN (
            SELECT DISTINCT week_number
            FROM client_health_dashboard_historical
        )
        ORDER BY week_number
    """)

    if not weeks_to_compute:
        logger.info("No new historical weeks to compute dashboard for")
        return

    for week_num, start_date, end_date in weeks_to_compute:
        logger.info(f"Computing dashboard for historical week {week_num}: {start_date} to {end_date}")

        # Reuse the existing dashboard computation logic but for historical period
        # This is a simplified version - we'll copy the complex RAG logic from compute_dashboard_dataset()

        # For now, insert basic data without RAG (we'll add RAG in next step)
        basic_insert = """
            INSERT INTO client_health_dashboard_historical (
                client_id, client_code, client_name, client_company_name,
                relationship_status, assigned_account_manager_name,
                assigned_inbox_manager_name, assigned_sdr_name,
                weekly_target_int, weekly_target_missing, closelix,
                bonus_pool_monthly, weekend_sending_effective, monthly_booking_goal,
                period_start_date, period_end_date, week_number,
                contacted_7d, replies_7d, positives_7d, bounces_7d,
                reply_rate_7d, positive_reply_rate_7d, bounce_pct_7d,
                new_leads_reached_7d,
                rag_status,
                most_recent_reporting_end_date
            )
            SELECT
                c.client_id, c.client_code, c.client_name, c.client_company_name,
                c.relationship_status, c.assigned_account_manager_name,
                c.assigned_inbox_manager_name, c.assigned_sdr_name,
                c.weekly_target_int, c.weekly_target_missing, c.closelix,
                c.bonus_pool_monthly, c.weekend_sending_effective, c.monthly_booking_goal,
                %s, %s, %s,
                r.contacted_7d, r.replies_7d, r.positives_7d, r.bounces_7d,
                r.reply_rate_7d, r.positive_reply_rate_7d, r.bounce_pct_7d,
                r.new_leads_reached_7d,
                'Green'::text,  -- Placeholder, will compute RAG in next step
                r.most_recent_reporting_end_date
            FROM clients_local c
            INNER JOIN client_name_map_local m ON c.client_code = m.client_code
            INNER JOIN client_7d_rollup_historical r
                ON c.client_id = r.client_id
                AND r.week_number = %s
            WHERE c.relationship_status = 'active'
            ON CONFLICT (client_id, period_start_date) DO NOTHING
        """

        rowcount = local_db.execute_write(basic_insert, (
            start_date, end_date, week_num, week_num
        ))

        logger.info(f"  Inserted {rowcount} dashboard rows for week {week_num}")

    logger.info("Historical dashboard dataset computation complete")
```

**Step 2: Add RAG computation for historical weeks**

This is complex - we need to extract the RAG logic from `compute_dashboard_dataset()` and reuse it. For now, the placeholder above sets all to 'Green'. We'll enhance this in a follow-up task after verifying the basic flow works.

**Step 3: Run ingestion again**

```bash
cd /home/ubuntu/client-health-dashboard
source venv/bin/activate
python ingest/ingest_main.py --skip-smartlead 2>&1 | tail -20
```

**Step 4: Verify historical dashboard data**

Run:
```bash
psql -U ubuntu -d client_health_dashboard_v1 -c "
SELECT week_number, COUNT(*) as clients,
       SUM(CASE WHEN rag_status = 'Red' THEN 1 ELSE 0 END) as red_count
FROM client_health_dashboard_historical
GROUP BY week_number
ORDER BY week_number;
"
```
Expected: Rows for each week with client counts

**Step 5: Commit**

```bash
git add ingest/ingest_main.py
git commit -m "feat: add historical dashboard dataset computation (basic)"
```

---

## Task 5: Create Available Weeks API Endpoint

**Files:**
- Create: `/home/ubuntu/client-health-dashboard/app/src/app/api/dashboard/available-weeks/route.ts`

**Step 1: Create the endpoint directory**

```bash
mkdir -p /home/ubuntu/client-health-dashboard/app/src/app/api/dashboard/available-weeks
```

**Step 2: Create the route file**

```typescript
/**
 * API endpoint to return available historical weeks for the dropdown selector
 */

import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const queryText = `
      SELECT
        week_number,
        period_start_date as start_date,
        period_end_date as end_date,
        TO_CHAR(period_start_date, 'Mon DD') || ' - ' || TO_CHAR(period_end_date, 'Mon DD') as label
      FROM client_7d_rollup_historical
      GROUP BY week_number, period_start_date, period_end_date
      ORDER BY week_number
    `;

    const rows = await query(queryText, []);

    const weeks = rows.map((row: any) => ({
      value: row.week_number.toString(),
      label: `${row.label} (Week ${row.week_number})`,
      start_date: row.start_date,
      end_date: row.end_date,
    }));

    return NextResponse.json({ weeks });
  } catch (error) {
    console.error('Available weeks API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch available weeks' },
      { status: 500 }
    );
  }
}
```

**Step 3: Test the endpoint**

```bash
cd /home/ubuntu/client-health-dashboard/app
curl http://localhost:3100/api/dashboard/available-weeks
```
Expected: JSON response with weeks array

**Step 4: Commit**

```bash
git add app/src/app/api/dashboard/available-weeks/route.ts
git commit -m "feat: add available weeks API endpoint"
```

---

## Task 6: Create Historical Data API Endpoint

**Files:**
- Create: `/home/ubuntu/client-health-dashboard/app/src/app/api/dashboard/historical/route.ts`

**Step 1: Create the endpoint directory**

```bash
mkdir -p /home/ubuntu/client-health-dashboard/app/src/app/api/dashboard/historical
```

**Step 2: Create the route file with single and multi-week support**

```typescript
/**
 * API endpoint for historical dashboard data
 * Supports single week or aggregated multi-week queries
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const weeksParam = searchParams.getAll('weeks[]');

    // Default to week 1 if no weeks specified
    const selectedWeeks = weeksParam.length > 0 ? weeksParam.map((w) => parseInt(w)) : [1];

    let queryText: string;
    let params: any[];
    let periodType: string;
    let periodRange: string;

    if (selectedWeeks.length === 1) {
      // Single week - return data as-is
      periodType = 'single_week';
      queryText = `
        SELECT
          client_id, client_code, client_name, client_company_name,
          relationship_status, assigned_account_manager_name,
          assigned_inbox_manager_name, assigned_sdr_name,
          weekly_target_int, weekly_target_missing, closelix,
          contacted_7d, replies_7d, positives_7d, bounces_7d,
          reply_rate_7d, positive_reply_rate_7d, bounce_pct_7d,
          new_leads_reached_7d,
          volume_attainment, pcpl_proxy_7d,
          not_contacted_leads,
          deliverability_flag, volume_flag, mmf_flag,
          data_missing_flag, data_stale_flag,
          rag_status, rag_reason,
          period_start_date, period_end_date, week_number,
          computed_at
        FROM client_health_dashboard_historical
        WHERE week_number = $1
        ORDER BY new_leads_reached_7d DESC NULLS LAST
      `;
      params = [selectedWeeks[0]];
      periodRange = `Week ${selectedWeeks[0]}`;
    } else {
      // Multiple weeks - aggregate
      periodType = 'aggregated';
      queryText = `
        SELECT
          client_id, client_code,
          MAX(client_name) as client_name,
          MAX(client_company_name) as client_company_name,
          MAX(relationship_status) as relationship_status,
          MAX(assigned_account_manager_name) as assigned_account_manager_name,
          MAX(assigned_inbox_manager_name) as assigned_inbox_manager_name,
          MAX(assigned_sdr_name) as assigned_sdr_name,
          MAX(weekly_target_int) as weekly_target_int,
          MAX(weekly_target_missing) as weekly_target_missing,
          MAX(closelix) as closelix,
          SUM(contacted_7d) as contacted_7d,
          SUM(replies_7d) as replies_7d,
          SUM(positives_7d) as positives_7d,
          SUM(bounces_7d) as bounces_7d,
          CASE
            WHEN SUM(contacted_7d) > 0 THEN
              ROUND(SUM(replies_7d)::numeric / SUM(contacted_7d), 4)
            ELSE NULL
          END as reply_rate_7d,
          CASE
            WHEN SUM(replies_7d) > 0 THEN
              ROUND(SUM(positives_7d)::numeric / SUM(replies_7d), 4)
            ELSE NULL
          END as positive_reply_rate_7d,
          CASE
            WHEN SUM(contacted_7d) > 0 THEN
              ROUND(SUM(bounces_7d)::numeric / SUM(contacted_7d), 4)
            ELSE NULL
          END as bounce_pct_7d,
          SUM(new_leads_reached_7d) as new_leads_reached_7d,
          SUM(not_contacted_leads) as not_contacted_leads,
          ARRAY_AGG(DISTINCT week_number) as weeks_included,
          MIN(period_start_date) as period_start_date,
          MAX(period_end_date) as period_end_date,
          MAX(computed_at) as computed_at
        FROM client_health_dashboard_historical
        WHERE week_number = ANY($1)
        GROUP BY client_id, client_code
        ORDER BY SUM(new_leads_reached_7d) DESC NULLS LAST
      `;
      params = [selectedWeeks];

      const totalDays = selectedWeeks.length * 7;
      periodRange = `${selectedWeeks.length} weeks (${totalDays} days)`;
    }

    const rows = await query(queryText, params);

    return NextResponse.json({
      data: rows,
      count: rows.length,
      period_type: periodType,
      period_range: periodRange,
      weeks_included: selectedWeeks,
    });
  } catch (error) {
    console.error('Historical dashboard API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch historical dashboard data' },
      { status: 500 }
    );
  }
}
```

**Step 3: Test single week**

```bash
curl "http://localhost:3100/api/dashboard/historical?weeks[]=1" | jq '.period_type, .count'
```
Expected: `"single_week"` and count of clients

**Step 4: Test multi-week aggregation**

```bash
curl "http://localhost:3100/api/dashboard/historical?weeks[]=1&weeks[]=2" | jq '.period_type, .period_range'
```
Expected: `"aggregated"` and range like `"2 weeks (14 days)"`

**Step 5: Commit**

```bash
git add app/src/app/api/dashboard/historical/route.ts
git commit -m "feat: add historical dashboard data API with multi-week aggregation"
```

---

## Task 7: Create Week Selector UI Component

**Files:**
- Create: `/home/ubuntu/client-health-dashboard/app/src/components/WeekSelector.tsx`
- Modify: `/home/ubuntu/client-health-dashboard/app/src/app/page.tsx`

**Step 1: Create the WeekSelector component**

```typescript
'use client';

import { useState, useEffect } from 'react';

interface WeekOption {
  value: string;
  label: string;
  start_date: string;
  end_date: string;
}

interface WeekSelectorProps {
  selectedWeeks: string[];
  onWeeksChange: (weeks: string[]) => void;
}

export function WeekSelector({ selectedWeeks, onWeeksChange }: WeekSelectorProps) {
  const [weeks, setWeeks] = useState<WeekOption[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch available weeks
    fetch('/api/dashboard/available-weeks')
      .then((res) => res.json())
      .then((data) => {
        setWeeks(data.weeks || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch weeks:', err);
        setLoading(false);
      });
  }, []);

  const handleWeekChange = (weekValue: string) => {
    const newSelected = selectedWeeks.includes(weekValue)
      ? selectedWeeks.filter((w) => w !== weekValue)
      : [...selectedWeeks, weekValue];

    onWeeksChange(newSelected.length > 0 ? newSelected : ['1']); // Always keep at least week 1
  };

  const totalDays = selectedWeeks.length * 7;

  if (loading) {
    return <div className="text-sm text-gray-500">Loading weeks...</div>;
  }

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Time Period: {selectedWeeks.length} week{selectedWeeks.length !== 1 ? 's' : ''}
        <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 z-20 mt-2 w-72 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu">
              {weeks.map((week) => (
                <label
                  key={week.value}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  role="menuitem"
                >
                  <input
                    type="checkbox"
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={selectedWeeks.includes(week.value)}
                    onChange={() => handleWeekChange(week.value)}
                  />
                  {week.label}
                </label>
              ))}
              <div className="border-t border-gray-100 px-4 py-2 text-xs text-gray-500">
                {selectedWeeks.length} weeks selected | {totalDays} days total
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
```

**Step 2: Update the main dashboard page**

Add the component to the page and wire up state:

```typescript
// In app/src/app/page.tsx, add imports:
import { WeekSelector } from '@/components/WeekSelector';
import { useState, useEffect } from 'react';

// In the dashboard component, add state:
const [selectedWeeks, setSelectedWeeks] = useState<string[]>(['1']);
const [dashboardData, setDashboardData] = useState(null);

// Add fetch function that handles both current and historical:
const fetchDashboardData = async (weeks: string[]) => {
  if (weeks.length === 1 && weeks[0] === 'current') {
    // Fetch current week data (existing API)
    const res = await fetch('/api/dashboard');
    const data = await res.json();
    return data;
  } else {
    // Fetch historical data (new API)
    const params = new URLSearchParams();
    weeks.forEach((w) => params.append('weeks[]', w));
    const res = await fetch(`/api/dashboard/historical?${params}`);
    const data = await res.json();
    return data;
  }
};

// Add useEffect to refetch when weeks change:
useEffect(() => {
  const loadData = async () => {
    const data = await fetchDashboardData(selectedWeeks);
    setDashboardData(data);
  };
  loadData();
}, [selectedWeeks]);

// In the JSX, add the selector near the top of the page:
<div>
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-2xl font-bold">Client Health Dashboard</h1>
    <WeekSelector
      selectedWeeks={selectedWeeks}
      onWeeksChange={setSelectedWeeks}
    />
  </div>

  {/* Existing table and filters */}
  {/* ... */}
</div>
```

**Step 3: Test the UI locally**

```bash
cd /home/ubuntu/client-health-dashboard/app
npm run dev
```

Visit `http://localhost:3100` and verify:
- Dropdown appears
- Shows list of weeks
- Checkboxes work
- Data refreshes when selection changes

**Step 4: Commit**

```bash
git add app/src/components/WeekSelector.tsx app/src/app/page.tsx
git commit -m "feat: add week selector dropdown UI component"
```

---

## Task 8: Add Proper RAG Computation for Historical Weeks

**Files:**
- Modify: `/home/ubuntu/client-health-dashboard/ingest/ingest_main.py`

**Step 1: Extract RAG computation logic into reusable function**

Copy the RAG logic from `compute_dashboard_dataset()` (lines 735-880) into a separate function that can be reused for historical weeks.

This is complex - the function needs to:
- Take a week number and dates as parameters
- Compute all the individual RAG metrics (rr_rag, prr_rag, pcpl_rag, etc.)
- Compute the final rag_status using majority voting
- Generate rag_reason text

**Step 2: Update `compute_historical_dashboard_dataset()` to use RAG function**

Replace the placeholder 'Green' with proper RAG computation.

**Step 3: Run ingestion and verify RAG status distribution**

```bash
psql -U ubuntu -d client_health_dashboard_v1 -c "
SELECT week_number,
       COUNT(*) as total,
       SUM(CASE WHEN rag_status = 'Red' THEN 1 ELSE 0 END) as red,
       SUM(CASE WHEN rag_status = 'Yellow' THEN 1 ELSE 0 END) as yellow,
       SUM(CASE WHEN rag_status = 'Green' THEN 1 ELSE 0 END) as green
FROM client_health_dashboard_historical
GROUP BY week_number
ORDER BY week_number;
"
```

Expected: Realistic distribution of Red/Yellow/Green (not all Green)

**Step 4: Commit**

```bash
git add ingest/ingest_main.py
git commit -m "feat: add proper RAG computation for historical weeks"
```

---

## Task 9: Testing & Validation

**Files:**
- Create: `/home/ubuntu/client-health-dashboard/test_historical_feature.sh`

**Step 1: Create comprehensive test script**

```bash
cat > /home/ubuntu/client-health-dashboard/test_historical_feature.sh << 'EOF'
#!/bin/bash
set -e

echo "=== Testing Historical Week Selector Feature ==="
echo ""

# Test 1: Verify historical tables exist
echo "Test 1: Checking tables..."
TABLES=$(psql -U ubuntu -d client_health_dashboard_v1 -tAc "SELECT COUNT(*) FROM information_schema.tables WHERE table_name LIKE '%historical%'")
if [ "$TABLES" -eq 2 ]; then
    echo "✓ Historical tables exist"
else
    echo "✗ Missing historical tables"
    exit 1
fi

# Test 2: Verify data exists
echo "Test 2: Checking data..."
COUNT=$(psql -U ubuntu -d client_health_dashboard_v1 -tAc "SELECT COUNT(*) FROM client_7d_rollup_historical")
if [ "$COUNT" -gt 0 ]; then
    echo "✓ Historical rollup data exists ($COUNT rows)"
else
    echo "✗ No historical rollup data"
    exit 1
fi

# Test 3: Verify week boundaries
echo "Test 3: Checking week boundaries (Friday-Thursday)..."
INVALID=$(psql -U ubuntu -d client_health_dashboard_v1 -tAc "
    SELECT COUNT(*) FROM client_7d_rollup_historical
    WHERE EXTRACT(DOW FROM period_start_date) != 5
       OR EXTRACT(DOW FROM period_end_date) != 4
")
if [ "$INVALID" -eq 0 ]; then
    echo "✓ All weeks follow Friday-Thursday pattern"
else
    echo "✗ Invalid week boundaries found"
    exit 1
fi

# Test 4: Verify API endpoints
echo "Test 4: Testing API endpoints..."
WEEKS=$(curl -s http://localhost:3100/api/dashboard/available-weeks | jq '.weeks | length')
if [ "$WEEKS" -eq 4 ]; then
    echo "✓ Available weeks API returns 4 weeks"
else
    echo "✗ Available weeks API error"
    exit 1
fi

# Test 5: Verify single week query
echo "Test 5: Testing single week query..."
DATA=$(curl -s "http://localhost:3100/api/dashboard/historical?weeks[]=1" | jq '.data | length')
if [ "$DATA" -gt 0 ]; then
    echo "✓ Single week query returns data ($DATA clients)"
else
    echo "✗ Single week query failed"
    exit 1
fi

# Test 6: Verify multi-week aggregation
echo "Test 6: Testing multi-week aggregation..."
AGG=$(curl -s "http://localhost:3100/api/dashboard/historical?weeks[]=1&weeks[]=2" | jq '.period_type')
if [ "$AGG" == '"aggregated"' ]; then
    echo "✓ Multi-week aggregation works"
else
    echo "✗ Multi-week aggregation failed"
    exit 1
fi

echo ""
echo "=== All Tests Passed ✓ ==="
EOF

chmod +x /home/ubuntu/client-health-dashboard/test_historical_feature.sh
```

**Step 2: Run the test suite**

```bash
cd /home/ubuntu/client-health-dashboard
./test_historical_feature.sh
```
Expected: All tests pass

**Step 3: Manual UI testing**

Visit the dashboard and test:
- Select single weeks
- Select multiple weeks
- Verify aggregation
- Check RAG status display
- Verify data accuracy against known clients

**Step 4: Commit test script**

```bash
git add test_historical_feature.sh
git commit -m "test: add comprehensive test suite for historical feature"
```

---

## Task 10: Deployment to Production

**Files:**
- Modify: PM2 config (no changes needed, just restart)

**Step 1: Run full ingestion with historical data**

```bash
cd /home/ubuntu/client-health-dashboard
source venv/bin/activate
python ingest/ingest_main.py 2>&1 | tee logs/ingest_with_historical.log
```

**Step 2: Verify historical data in database**

```bash
psql -U ubuntu -d client_health_dashboard_v1 -c "
SELECT week_number, COUNT(*) FROM client_health_dashboard_historical GROUP BY week_number;
"
```
Expected: 4 weeks with data

**Step 3: Build and restart Next.js app**

```bash
cd /home/ubuntu/client-health-dashboard/app
npm run build

cd /home/ubuntu/client-health-dashboard
pm2 restart client-health-dashboard
```

**Step 4: Monitor PM2 logs**

```bash
pm2 logs client-health-dashboard --lines 50
```
Expected: No errors, app starts successfully

**Step 5: Verify production endpoints**

```bash
curl -s https://clienthealth.eagleinfoservice.com/api/dashboard/available-weeks | jq '.weeks | length'
```
Expected: Returns 4 weeks

**Step 6: Test UI in production**

Visit https://clienthealth.eagleinfoservice.com and verify:
- Dropdown appears and works
- Historical data loads correctly
- No errors in browser console
- Current week still works (untouched)

**Step 7: Monitor for issues**

Check logs for the next hour:
```bash
pm2 logs client-health-dashboard --lines 0
```

**Step 8: Create deployment documentation**

```bash
cat > /home/ubuntu/client-health-dashboard/DEPLOYMENT_NOTES_HISTORICAL.md << 'EOF'
# Historical Week Selector - Deployment Notes

**Date**: 2026-02-21
**Feature**: Multi-select dropdown for 4-week historical view

## Changes Made

### Database
- New tables: `client_7d_rollup_historical`, `client_health_dashboard_historical`
- Migration: `/home/ubuntu/client-health-dashboard/db/migration_001_historical_tables.sql`

### Ingestion
- New function: `compute_historical_rollups()` in `ingest/ingest_main.py`
- New function: `compute_historical_dashboard_dataset()` in `ingest/ingest_main.py`
- Historical data computed after current week (no impact on existing flow)

### API
- New endpoint: `/api/dashboard/available-weeks` - returns list of available weeks
- New endpoint: `/api/dashboard/historical?weeks[]=1&weeks[]=2` - returns historical data
- Existing `/api/dashboard` - unchanged

### Frontend
- New component: `WeekSelector.tsx`
- Updated: `page.tsx` to include week selector

## Rollback Plan

If issues occur:
1. Frontend: Remove WeekSelector from page.tsx (dropdown disappears)
2. API: Delete `/api/dashboard/historical` and `/api/dashboard/available-weeks` routes
3. Database: `DROP TABLE client_7d_rollup_historical, client_health_dashboard_historical;`
4. Ingestion: Remove historical rollup calls from main()

Zero impact to current week functionality.

## Monitoring

Check historical ingestion logs:
```bash
tail -f /home/ubuntu/client-health-dashboard/logs/ingest.log | grep historical
```
EOF
```

**Step 9: Final commit with deployment tag**

```bash
git add .
git commit -m "deploy: historical week selector feature complete"
git tag -a v1.1.0 -m "Historical Week Selector - 4 week rollback view"
git push origin master --tags
```

---

## Post-Deployment Tasks

### Task 11: Monitor and Validate (Week 1)

**Step 1: Daily checks for first week**
- Verify historical ingestion runs without errors
- Check that new weeks are added correctly each day
- Monitor database growth
- Validate week boundaries remain Friday-Thursday

**Step 2: Gather user feedback**
- Is the dropdown intuitive?
- Are the week labels clear?
- Does aggregation make sense?
- Any performance issues?

**Step 3: Address any issues**
- Fix bugs
- Improve UI if needed
- Add more weeks if requested

### Task 12: Documentation (Final)

**Step 1: Update README**

Add section on historical week feature:
- How to use the dropdown
- What the data means
- How weeks are calculated (Friday-Thursday)

**Step 2: Create user guide**

Document:
- How to compare weeks
- How to interpret aggregated metrics
- Troubleshooting common issues

**Step 3: Archive design doc**

Move this plan to archive:
```bash
mv /home/ubuntu/client-health-dashboard/docs/plans/2026-02-21-historical-week-selector.md \
   /home/ubuntu/client-health-dashboard/docs/plans/archive/
```

---

## Summary

**Total estimated time**: 10-14 hours
**Risk level**: LOW (zero breaking changes)
**Rollback**: Easy (drop new tables, remove new routes)

**Key success criteria**:
- ✅ Current week still works exactly as before
- ✅ Historical dropdown appears and functions
- ✅ Multi-week aggregation produces correct sums/averages
- ✅ RAG status computed correctly for historical weeks
- ✅ Performance is good (indexed queries)

**Next steps after completion**:
1. Monitor usage and feedback
2. Consider adding trends/comparison views
3. Consider adding export functionality for historical data
4. Consider extending to 8-12 weeks if requested

---

**Implementation plan complete. Ready for execution using superpowers:executing-plans.**
