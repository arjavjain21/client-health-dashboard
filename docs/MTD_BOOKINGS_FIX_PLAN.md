# Plan: Fix MTD Dashboard Qualified/Showed/Total Booked Display

**Date**: March 9, 2026
**Status**: Ready for Review
**Priority**: High

## Problem Statement

The Month-to-Date (MTD) dashboard currently displays **zeros** for the following columns:
- `qualified_7d` (Qualified leads)
- `showed_7d` (Showed for meetings)
- `total_booked_7d` (Total booked appointments)

These columns work correctly in:
1. **Main Dashboard (7-day)** - Shows correct values
2. **Historical Weeks Dashboard** - Shows correct values

But they are hardcoded to `0` in the MTD dashboard API.

## Root Cause Analysis

### How Main Dashboard Works (Working Correctly)

**File**: `/app/src/app/api/dashboard/route.ts`

The main dashboard queries the pre-computed `client_health_dashboard_v1_local` table:

```sql
SELECT
  ...
  qualified_7d,
  showed_7d,
  total_booked_7d
FROM client_health_dashboard_v1_local
```

This table is populated by the nightly ingestion script (`ingest/ingest_main.py`) which:
1. Queries `hyperke_dashboard.interested_leads` table
2. Counts bookings by client_code for the 7-day period
3. Updates the `client_health_dashboard_v1_local` table with these counts

**Ingestion Query** (lines 628-640):
```python
query = """
    SELECT
        client_code,
        COUNT(*) FILTER (WHERE call_feedback = 'QUALIFIED') as qualified_7d,
        COUNT(*) FILTER (WHERE call_feedback IN ('QUALIFIED', 'UNQUALIFIED')) as showed_7d,
        COUNT(*) as total_booked_7d
    FROM interested_leads
    WHERE meeting_date >= %s
      AND meeting_date < %s + INTERVAL '1 day'
      AND deleted_at IS NULL
      AND meeting_date IS NOT NULL
    GROUP BY client_code
"""
```

### How Historical Weeks Dashboard Works (Working Correctly)

**File**: `/app/src/app/api/dashboard/historical/route.ts`

The historical weeks dashboard also queries a pre-computed table `client_health_dashboard_historical`:

```sql
SELECT
  ...
  qualified_7d,
  showed_7d,
  total_booked_7d
FROM client_health_dashboard_historical
WHERE week_number IN (...)
```

This table is also populated by the ingestion script during the historical data aggregation process.

### How MTD Dashboard Works (BROKEN)

**File**: `/app/src/app/api/dashboard/historical/mtd/route.ts`

The MTD dashboard performs a **live SQL aggregation** using CTEs (Common Table Expressions):

```sql
WITH date_range AS (...),
     rollup AS (
       SELECT
         ...
         COALESCE(SUM(cr.total_sent), 0)::integer AS contacted_7d,
         ...
       FROM client_name_map_local m
       INNER JOIN clients_local c ON c.client_id = m.client_id
       LEFT JOIN campaign_reporting_local cr ON ...
       ...
     )
SELECT
  ...
  0 AS qualified_7d,    -- ❌ HARDCODED ZERO
  0 AS showed_7d,       -- ❌ HARDCODED ZERO
  0 AS total_booked_7d  -- ❌ HARDCODED ZERO
FROM ...
```

**Problem**: The `rollup` CTE only joins with `campaign_reporting_local` (campaign metrics). It does **NOT** join with the bookings data source (`hyperke_dashboard.interested_leads`), so these fields are hardcoded to 0.

### Data Source Details

**Database**: `hyperke_dashboard` (local PostgreSQL)
**Table**: `public.interested_leads`
**Connection**: Peer authentication (no password required for `ubuntu` user)

**Key Fields**:
- `client_code` (text) - Maps to clients_local.client_code
- `meeting_date` (timestamptz) - Date of the meeting
- `call_feedback` (text) - Feedback from the call:
  - `'QUALIFIED'` - Lead qualified
  - `'UNQUALIFIED'` - Lead not qualified (but showed up)
  - Other values (NO-SHOW, RESCHEDULED, CANCELLED_NOT_A_FIT, etc.)
- `deleted_at` (timestamptz) - Soft delete flag (filter: NULL only)

**Count Logic** (same as ingestion script):
- `qualified_7d` = COUNT(*) FILTER (WHERE call_feedback = 'QUALIFIED')
- `showed_7d` = COUNT(*) FILTER (WHERE call_feedback IN ('QUALIFIED', 'UNQUALIFIED'))
- `total_booked_7d` = COUNT(*)

## Solution Design

### Approach: Add Bookings CTE to MTD Query

Modify the MTD API query to add a new CTE that joins with `hyperke_dashboard.interested_leads` and calculates booking metrics for the MTD date range.

### Implementation Steps

1. **Add `bookings` CTE** after the `rollup` CTE
2. **Join bookings data** into the main query
3. **Replace hardcoded zeros** with actual values from bookings CTE
4. **Handle cross-database join** (client_health_dashboard_v1 ↔ hyperke_dashboard)

### Technical Details

**Database Connection**:
- The API already has a connection pool to `client_health_dashboard_v1`
- Need to add a foreign data wrapper OR use database link to query `hyperke_dashboard.interested_leads`
- **Alternative**: Use `dblink` extension for cross-database queries
- **Preferred**: Create a view or materialized view in the local database

**Database Link Options**:

**Option A: Using `dblink` (Simplest, lowest risk)**
```sql
-- Already available in PostgreSQL
-- Connect using peer authentication
SELECT * FROM dblink(
  'dbname=hyperke_dashboard user=ubuntu',
  'SELECT client_code, ... FROM interested_leads WHERE ...'
) AS t(client_code text, qualified_7d bigint, showed_7d bigint, total_booked_7d bigint)
```

**Option B: Foreign Data Wrapper (Cleaner, more setup)**
```sql
-- Requires setup but more maintainable
CREATE EXTENSION postgres_fdw;
CREATE SERVER hyperke_dashboard FOREIGN DATA WRAPPER postgres_fdw
  OPTIONS (dbname 'hyperke_dashboard', host 'localhost');
CREATE USER MAPPING FOR ubuntu SERVER hyperke_dashboard
  OPTIONS (user 'ubuntu');
-- Then can query directly: hyperke_dashboard.public.interested_leads
```

**Option C: Materialized View (Best performance, more maintenance)**
```sql
-- Create a materialized view in local database
-- Refresh it during ingestion or on schedule
CREATE MATERIALIZED VIEW bookings_local AS
  SELECT * FROM hyperke_dashboard.public.interested_leads;
```

### Recommended Approach: Option A (dblink)

**Reasons**:
1. Minimal changes required
2. No new database objects to maintain
3. Works with existing connection
4. Peer authentication already tested and working
5. Isolated change (low risk of breaking existing functionality)

## Implementation Plan

### Phase 1: Database Verification (Completed ✅)

- [x] Verify hyperke_dashboard database exists
- [x] Verify interested_leads table structure
- [x] Test ubuntu user can connect using peer authentication
- [x] Verify query logic matches ingestion script
- [x] Confirm data exists in the table

### Phase 2: Implementation (Pending)

**Step 1: Modify MTD API Query**
- File: `/app/src/app/api/dashboard/historical/mtd/route.ts`
- Add `bookings` CTE after `date_range` CTE
- Use `dblink` to query `hyperke_dashboard.interested_leads`
- Join with `rollup` CTE on `client_code`

**Step 2: Update Main Query**
- Replace hardcoded `0 AS qualified_7d` with `b.qualified_7d`
- Replace hardcoded `0 AS showed_7d` with `b.showed_7d`
- Replace hardcoded `0 AS total_booked_7d` with `b.total_booked_7d`
- Add LEFT JOIN with bookings CTE

**Step 3: Handle Edge Cases**
- Clients with no bookings: COALESCE to 0
- Connection failures: Graceful degradation (return 0 with warning)
- Date range boundary: Ensure inclusive/exclusive logic matches ingestion

### Phase 3: Testing (Pending)

**Test Cases**:
1. **Happy Path**: MTD period with bookings data
2. **No Bookings**: Clients with campaign data but no bookings
3. **Date Boundaries**: Month start/end transitions
4. **Cross-Database Connection**: Verify dblink works
5. **Performance**: Check query execution time

**Testing Commands**:
```bash
# Test MTD API directly
curl "http://localhost:3100/api/dashboard/historical/mtd" | jq '.data[0] | {client_code, qualified_7d, showed_7d, total_booked_7d}'

# Compare with main dashboard values (should be proportional)
curl "http://localhost:3100/api/dashboard" | jq '.data[0] | {client_code, qualified_7d, showed_7d, total_booked_7d}'

# Test with specific client
curl "http://localhost:3100/api/dashboard/historical/mtd?client_code_search=SEM" | jq '.data[0]'
```

### Phase 4: Deployment (Pending)

**Deployment Steps**:
1. Build Next.js app: `cd app && npm run build`
2. Restart PM2: `pm2 restart client-health-dashboard`
3. Verify logs: `pm2 logs client-health-dashboard --lines 50`
4. Test production URL: `curl https://clienthealth.eagleinfoservice.com/api/dashboard/historical/mtd`

**Rollback Plan**:
- Keep original query as comment
- If issues arise, revert to hardcoded zeros
- No database changes required (easy rollback)

## SQL Implementation Details

### Query Structure (Proposed)

```sql
WITH date_range AS (
  SELECT $1::date AS start_date, $2::date AS end_date
),
bookings AS (
  -- Query hyperke_dashboard.interested_leads using dblink
  SELECT
    client_code,
    COUNT(*) FILTER (WHERE call_feedback = 'QUALIFIED')::integer AS qualified_7d,
    COUNT(*) FILTER (WHERE call_feedback IN ('QUALIFIED', 'UNQUALIFIED'))::integer AS showed_7d,
    COUNT(*)::integer AS total_booked_7d
  FROM dblink(
    'dbname=hyperke_dashboard user=ubuntu',
    $$SELECT
      client_code,
      call_feedback
    FROM interested_leads
    WHERE meeting_date >= $$ || quote_literal((SELECT start_date FROM date_range)::text) ||
      $$ AND meeting_date < $$ || quote_literal((SELECT end_date FROM date_range)::text + $$ 1 day$$) ||
      $$ AND deleted_at IS NULL
      AND meeting_date IS NOT NULL$$
  ) AS t(client_code text, call_feedback text)
  GROUP BY client_code
),
rollup AS (
  -- Existing rollup CTE (unchanged)
  SELECT
    ...
  FROM client_name_map_local m
  ...
),
-- Rest of the query with bookings joined
SELECT
  ...,
  COALESCE(b.qualified_7d, 0)::integer AS qualified_7d,
  COALESCE(b.showed_7d, 0)::integer AS showed_7d,
  COALESCE(b.total_booked_7d, 0)::integer AS total_booked_7d,
  ...
FROM with_rag t
LEFT JOIN bookings b ON b.client_code = t.client_code
...
```

### Alternative: Pre-Aggregated Subquery (Simpler)

If `dblink` has performance issues, use a simpler approach with a subquery that queries the database directly:

```sql
bookings AS (
  SELECT
    il.client_code,
    COUNT(*) FILTER (WHERE il.call_feedback = 'QUALIFIED')::integer AS qualified_7d,
    COUNT(*) FILTER (WHERE il.call_feedback IN ('QUALIFIED', 'UNQUALIFIED'))::integer AS showed_7d,
    COUNT(*)::integer AS total_booked_7d
  FROM hyperke_dashboard.public.interested_leads il
  WHERE il.meeting_date >= (SELECT start_date FROM date_range)
    AND il.meeting_date < (SELECT end_date FROM date_range) + INTERVAL '1 day'
    AND il.deleted_at IS NULL
    AND il.meeting_date IS NOT NULL
  GROUP BY il.client_code
)
```

**Note**: This requires the `ubuntu` user to have SELECT privileges on `hyperke_dashboard.public.interested_leads`, which should already be granted (as evidenced by the ingestion script working).

## Risk Assessment

### Low Risk ✅

- **Isolated Change**: Only affects MTD dashboard API
- **No Database Schema Changes**: No migrations required
- **Easy Rollback**: Can revert to hardcoded zeros in minutes
- **No Breaking Changes**: API response format remains the same
- **Performance**: Should be acceptable (indexed fields, small dataset)

### Medium Risk ⚠️

- **Cross-Database Query**: Depends on hyperke_dashboard availability
  - **Mitigation**: If connection fails, gracefully fallback to zeros
- **Query Complexity**: Adds another CTE and join
  - **Mitigation**: Test query execution time before deploying

### High Risk ❌

- None identified

## Success Criteria

### Functional Requirements

1. ✅ MTD dashboard displays non-zero values for qualified/showed/booked
2. ✅ Values are accurate and match expected counts from interested_leads
3. ✅ All clients show appropriate values (including zeros when no bookings)
4. ✅ Query performance is acceptable (< 2 seconds for full dataset)
5. ✅ No errors in logs related to bookings query

### Data Quality Requirements

1. ✅ Counts match ingestion script logic exactly
2. ✅ Date range boundaries are correct (MTD: 1st of month to yesterday)
3. ✅ NULL handling is consistent (show 0, not NULL)
4. ✅ Client code matching works (same as main dashboard)

### Deployment Requirements

1. ✅ Zero downtime deployment
2. ✅ No impact on other dashboards (main, historical weeks)
3. ✅ PM2 restarts successfully
4. ✅ Production URL works correctly

## Timeline Estimate

- **Implementation**: 30-45 minutes
- **Testing**: 15-30 minutes
- **Deployment**: 5-10 minutes
- **Total**: 50-90 minutes

## Next Steps

1. **Review this plan** with stakeholder
2. **Approve implementation approach** (confirm dblink or direct query)
3. **Proceed with implementation** following Phase 2
4. **Test thoroughly** following Phase 3
5. **Deploy to production** following Phase 4

## Questions for Review

1. Should we use `dblink` or direct cross-database query (e.g., `hyperke_dashboard.public.interested_leads`)?
   - **Recommendation**: Direct query is simpler and cleaner if permissions allow

2. Should we implement graceful fallback if hyperke_dashboard is unavailable?
   - **Recommendation**: Yes, log warning and return zeros (current behavior)

3. Should we add caching for bookings data?
   - **Recommendation**: Not needed for M1, can optimize later if performance issues

4. Should this be backfilled into historical table?
   - **Recommendation**: No, out of scope for this fix. Focus on MTD only.

## Appendix: Related Files

### Files to Modify

1. `/home/ubuntu/client-health-dashboard/app/src/app/api/dashboard/historical/mtd/route.ts`
   - Main implementation file

### Files to Reference

1. `/home/ubuntu/client-health-dashboard/ingest/ingest_main.py` (lines 610-671)
   - Reference query for bookings logic

2. `/home/ubuntu/client-health-dashboard/app/src/app/api/dashboard/route.ts`
   - Reference for how main dashboard queries bookings

3. `/home/ubuntu/client-health-dashboard/app/src/app/api/dashboard/historical/route.ts`
   - Reference for how historical weeks queries bookings

---

**Plan Status**: ✅ Ready for Implementation
**Created By**: Claude Code
**Last Updated**: March 9, 2026
