# Bookings Integration Design - 2026-03-04

## Overview

Add bookings count metrics to the client-health-dashboard, displaying Qualified/Showed/Total Booked counts for all active clients. Data is sourced from `hyperke_dashboard.interested_leads` table via READ-ONLY queries.

## Metric Definitions

All metrics use the **7-day rolling window** (Friday to Yesterday, same as campaign metrics):

1. **Total Booked**: Count of leads where `meeting_date IS NOT NULL`
2. **Showed**: Count of leads where `call_feedback IN ('QUALIFIED', 'UNQUALIFIED')`
3. **Qualified**: Count of leads where `call_feedback = 'QUALIFIED'`

**Display Format**: Single column showing "Qualified / Showed / Total Booked" (e.g., "5 / 12 / 20")

**Data Source**: `hyperke_dashboard.interested_leads` table (matches data.hyperke.org dashboard)

## Architecture

### Database Schema Changes

**Table**: `client_health_dashboard_v1_local`

Remove old columns (from previous incomplete attempt):
```sql
ALTER TABLE client_health_dashboard_v1_local
DROP COLUMN IF EXISTS total_interested_7d,
DROP COLUMN IF EXISTS booked_7d;
```

Add new columns:
```sql
ALTER TABLE client_health_dashboard_v1_local
ADD COLUMN qualified_7d INTEGER DEFAULT 0,
ADD COLUMN showed_7d INTEGER DEFAULT 0,
ADD COLUMN total_booked_7d INTEGER DEFAULT 0;
```

**Historical Tables**: Also add these columns to:
- `client_7d_rollup_historical`
- `client_health_dashboard_historical`

### Ingestion Pipeline

**New Function**: `fetch_bookings_data(start_date, end_date)`

Query logic:
```sql
SELECT
    client_code,
    COUNT(*) FILTER (WHERE call_feedback = 'QUALIFIED') as qualified_7d,
    COUNT(*) FILTER (WHERE call_feedback IN ('QUALIFIED', 'UNQUALIFIED')) as showed_7d,
    COUNT(*) as total_booked_7d
FROM hyperke_dashboard.interested_leads
WHERE meeting_date >= [start_date]
  AND meeting_date < [end_date] + INTERVAL '1 day'
  AND deleted_at IS NULL
  AND meeting_date IS NOT NULL
GROUP BY client_code
```

**Integration Point**: After `compute_client_7d_rollup()` in ingestion pipeline

**Client Matching**: Uses existing `client_code` normalization (exact match with LOWER(TRIM()))

### API Changes

**TypeScript Interface** (`app/app/api/dashboard/route.ts`):
```typescript
interface ClientDashboard {
  // ... existing fields
  qualified_7d: number;
  showed_7d: number;
  total_booked_7d: number;
}
```

### Frontend Display

**Dashboard Table** (`app/app/components/DashboardTable.tsx`):

Add single column after Positives column:
```typescript
{
  title: 'Bookings (7d)',
  key: 'bookings',
  render: (record) => (
    <span className="text-sm">
      {record.qualified_7d} / {record.showed_7d} / {record.total_booked_7d}
    </span>
  ),
  tooltip: 'Qualified / Showed / Total Booked'
}
```

**Column Position**: After Positives column, before RAG status

## Edge Cases

1. **No Bookings Data**: Clients with no meetings in 7-day window show "0 / 0 / 0"

2. **Client Code Mismatch**: If `client_code` doesn't match active clients, data is excluded (same logic as campaign matching)

3. **NULL call_feedback**: Leads counted in `total_booked_7d` but NOT in `showed_7d` or `qualified_7d`

4. **Historical Data**: No backfill - historical weeks populate when ingestion runs

5. **Database Unavailable**: If `hyperke_dashboard` unreachable, ingestion logs error and continues with zeros (non-blocking)

## Implementation Plan

### Phase 1: Database Schema (5 min)
- Run migration to add 3 new columns to all tables
- Verify columns exist
- **Rollback**: `ALTER TABLE DROP COLUMN`

### Phase 2: Ingestion Script (20 min)
- Add `fetch_bookings_data()` function to `ingest/ingest_main.py`
- Integrate into main ingestion pipeline
- Update historical computation functions
- **Test**: Run manually, verify counts match data.hyperke.org

### Phase 3: Frontend (15 min)
- Update TypeScript types in `app/app/api/dashboard/route.ts`
- Add bookings column to `app/app/components/DashboardTable.tsx`
- **Test**: Verify display in browser

### Phase 4: Production Deployment (10 min)
- Create git commit with clear message
- Deploy during low-traffic time
- Verify dashboard loads correctly
- Verify ingestion runs successfully

## Rollback Plan

**Current State**: Git commit `87623ef` - "feat: Add MTD mode and fix campaign status, labels, and historical data refresh"

**Rollback Steps**:
1. Revert code changes: `git reset --hard 87623ef`
2. Remove database columns:
   ```sql
   ALTER TABLE client_health_dashboard_v1_local
   DROP COLUMN IF EXISTS qualified_7d,
   DROP COLUMN IF EXISTS showed_7d,
   DROP COLUMN IF EXISTS total_booked_7d;
   ```
3. Restart dashboard service

## Safety Guarantees

- **No data loss**: Existing campaign metrics unchanged
- **No breaking changes**: API backward compatible
- **Atomic updates**: Single transaction for schema changes
- **Read-only access**: No writes to hyperke_dashboard database
- **Graceful degradation**: If bookings data unavailable, dashboard still shows all other metrics

## Success Criteria

1. Dashboard displays "Bookings (7d)" column with format "X / Y / Z"
2. Numbers match exactly what's shown in data.hyperke.org for same client and time period
3. All existing dashboard features continue working
4. Ingestion completes successfully daily
5. No errors in ingestion logs
6. Historical weeks show bookings data when selected

## Notes

- Time window: 7-day rolling (Friday to Yesterday) matches existing campaign metrics
- This is informational only - does not affect RAG status
- Sync frequency: Daily at 8:30 AM IST (during regular ingestion)
- Matches hyperke-dashboard incentives system logic exactly
