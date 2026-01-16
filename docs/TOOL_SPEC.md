# Client Health Dashboard v1 - Tool Specification

## Overview

This document provides an exhaustive specification of every table, column, computed field, formula, threshold, and behavior in the Client Health Dashboard v1 system.

## Purpose and Scope

**v1 Scope**: This dashboard monitors client campaign performance using only:
1. `public.clients` (Bucket 1: client config and ownership)
2. `public.campaign_reporting` (Bucket 2: daily campaign performance)

**v1 Excludes**: Bookings, qualification, show-rate, or any Bucket 3 data. These will be added in v2.

## Data Sources

### Supabase Source 1: Clients Database
- **Table**: `public.clients`
- **Access**: READ-ONLY
- **Key Fields Used**:
  - `client_id` (bigint) - Primary identifier
  - `client_code` (text) - Short name for matching
  - `client_name` (text) - Full client name
  - `client_company_name` (text)
  - `client_email` (text)
  - `client_website` (text)
  - `relationship_status` (text)
  - `relationship_type` (text)
  - `assigned_account_manager_id/name/email`
  - `assigned_inbox_manager_id/name/email`
  - `assigned_sdr_id/name/email`
  - `weekly_target` (text) - Weekly sending target (parsed)
  - `closelix` (boolean)
  - `onboarding_activated` (boolean)
  - `onboarding_date` (date)
  - `exit_date` (date)

### Supabase Source 2: Reporting Database
- **Table**: `public.campaign_reporting`
- **Access**: READ-ONLY
- **Key Fields Used**:
  - `campaign_date_key` (text) - Primary key
  - `campaign_id` (text)
  - `parent_campaign_id` (text)
  - `campaign_name` (text)
  - `client_name` (text) - Matched to client_code
  - `status` (text)
  - `start_date` (date) - Reporting interval start
  - `end_date` (date) - Reporting interval end (used for 7-day window)
  - `total_sent` (integer)
  - `new_leads_reached` (integer)
  - `replies_count` (integer)
  - `positive_reply` (integer)
  - `bounce_count` (integer)
  - `reply_rate` (numeric)
  - `positive_reply_rate` (numeric)
  - `inserted_at` (timestamptz)
  - `updated_at` (timestamptz)
  - `smartlead_account_name` (varchar)

**CRITICAL**: Use `end_date` for the 7-day window, NOT `inserted_at`. The reporting interval represents when the campaign activity occurred, not when the data was loaded.

## Local Database Schema

### Table: clients_local

Subset of `public.clients` with parsed fields.

| Column | Type | Description |
|--------|------|-------------|
| client_id | bigint | Primary key, from Supabase |
| client_code | text | Unique, from Supabase |
| client_name | text | From Supabase |
| client_company_name | text | From Supabase |
| client_email | text | From Supabase |
| client_website | text | From Supabase |
| relationship_status | text | From Supabase, used for active logic |
| relationship_type | text | From Supabase |
| assigned_account_manager_id | bigint | From Supabase |
| assigned_account_manager_name | text | From Supabase |
| assigned_account_manager_email | text | From Supabase |
| assigned_inbox_manager_id | bigint | From Supabase |
| assigned_inbox_manager_name | text | From Supabase |
| assigned_inbox_manager_email | text | From Supabase |
| assigned_sdr_id | bigint | From Supabase |
| assigned_sdr_name | text | From Supabase |
| assigned_sdr_email | text | From Supabase |
| weekly_target | text | Original text from Supabase |
| weekly_target_int | integer | **PARSED**: First integer extracted |
| weekly_target_missing | boolean | **PARSED**: True if parsing failed |
| closelix | boolean | From Supabase |
| onboarding_activated | boolean | From Supabase |
| onboarding_date | date | From Supabase |
| exit_date | date | From Supabase |
| created_at | timestamptz | Auto-generated |
| updated_at | timestamptz | Auto-updated on row changes |

**Indexes**:
- `client_code` (unique)
- `relationship_status`
- `assigned_account_manager_name`
- `assigned_inbox_manager_name`
- `assigned_sdr_name`

### Table: campaign_reporting_local

Subset of `public.campaign_reporting` with normalized client name.

| Column | Type | Description |
|--------|------|-------------|
| id | serial | Primary key (local) |
| campaign_date_key | text | From Supabase |
| campaign_id | text | From Supabase |
| parent_campaign_id | text | From Supabase |
| campaign_name | text | From Supabase |
| client_name | text | Original from Supabase |
| **client_name_norm** | text | **NORMALIZED**: LOWER(TRIM(client_name)) |
| status | text | From Supabase |
| start_date | date | From Supabase |
| end_date | date | From Supabase, used for 7-day window |
| total_sent | integer | From Supabase |
| new_leads_reached | integer | From Supabase |
| replies_count | integer | From Supabase |
| positive_reply | integer | From Supabase |
| bounce_count | integer | From Supabase |
| reply_rate | numeric | From Supabase |
| positive_reply_rate | numeric | From Supabase |
| inserted_at | timestamptz | From Supabase |
| updated_at | timestamptz | From Supabase |
| smartlead_account_name | varchar | From Supabase |
| ingested_at | timestamptz | Auto-generated |

**Indexes**:
- `client_name_norm`
- `end_date`
- `(client_name_norm, end_date)` - Composite for 7-day queries
- `campaign_date_key`

### Table: client_name_map_local

Maps `client_code` to `client_name` for joining.

| Column | Type | Description |
|--------|------|-------------|
| id | serial | Primary key |
| client_id | bigint | Foreign key to clients_local |
| client_code | text | From clients_local |
| **client_code_norm** | text | **NORMALIZED**: LOWER(TRIM(client_code)) |
| client_name_norm | text | From campaign_reporting_local |
| match_confidence | text | 'exact' for v1 (no fuzzy matching) |
| is_matched | boolean | True if match found |
| created_at | timestamptz | Auto-generated |
| updated_at | timestamptz | Auto-updated |

**Mapping Rule** (v1):
```sql
client_code_norm = client_name_norm
```
Exact match only. No fuzzy matching, no partial matching.

**Indexes**:
- `client_code_norm` (unique)
- `client_name_norm`

### Table: client_7d_rollup_v1_local

7-day aggregated metrics per client.

| Column | Type | Description | Formula |
|--------|------|-------------|---------|
| client_id | bigint | Primary key, foreign key | |
| client_code | text | From clients_local | |
| contacted_7d | integer | Sum of sends | `SUM(total_sent)` |
| replies_7d | integer | Sum of replies | `SUM(replies_count)` |
| positives_7d | integer | Sum of positives | `SUM(positive_reply)` |
| bounces_7d | integer | Sum of bounces | `SUM(bounce_count)` |
| reply_rate_7d | numeric | Reply ratio | `replies_7d / contacted_7d` (null-safe) |
| positive_reply_rate_7d | numeric | Positive reply ratio | `positives_7d / contacted_7d` (null-safe) |
| bounce_pct_7d | numeric | Bounce ratio | `bounces_7d / contacted_7d` (null-safe) |
| most_recent_reporting_end_date | date | Latest report date | `MAX(end_date)` |
| computed_at | timestamptz | When computed | Auto-generated |

**Time Window**:
- Last 7 **completed** days
- Excludes today
- Uses `end_date >= CURRENT_DATE - INTERVAL '7 days'`

**Null-Safe Formulas**:
```sql
reply_rate_7d = CASE
    WHEN contacted_7d > 0 THEN replies_7d::numeric / contacted_7d
    ELSE NULL
END
```
All ratios follow this pattern.

### Table: client_health_dashboard_v1_local

Final dataset for dashboard UI with all computed metrics, flags, and RAG status.

| Column | Type | Description | Formula/Rule |
|--------|------|-------------|--------------|
| client_id | bigint | Primary key | From clients_local |
| client_code | text | | From clients_local |
| client_name | text | | From clients_local |
| client_company_name | text | | From clients_local |
| relationship_status | text | | From clients_local |
| assigned_account_manager_name | text | | From clients_local |
| assigned_inbox_manager_name | text | | From clients_local |
| assigned_sdr_name | text | | From clients_local |
| weekly_target_int | integer | | From clients_local |
| weekly_target_missing | boolean | | From clients_local |
| closelix | boolean | | From clients_local |
| contacted_7d | integer | | From 7d_rollup |
| replies_7d | integer | | From 7d_rollup |
| positives_7d | integer | | From 7d_rollup |
| bounces_7d | integer | | From 7d_rollup |
| reply_rate_7d | numeric | | From 7d_rollup |
| positive_reply_rate_7d | numeric | | From 7d_rollup |
| bounce_pct_7d | numeric | | From 7d_rollup |
| **volume_attainment** | numeric | **COMPUTED** | `contacted_7d / weekly_target_int` (null-safe) |
| **pcpl_proxy_7d** | numeric | **COMPUTED** | `contacted_7d / positives_7d` (null-safe) |
| **deliverability_flag** | boolean | **COMPUTED** | `reply_rate_7d < 0.02 OR bounce_pct_7d >= 0.05` |
| **volume_flag** | boolean | **COMPUTED** | `volume_attainment < 0.8` (null-safe) |
| **mmf_flag** | boolean | **COMPUTED** | `reply_rate_7d >= 0.02 AND positive_reply_rate_7d < 0.002` |
| **data_missing_flag** | boolean | **COMPUTED** | `contacted_7d IS NULL OR contacted_7d = 0` |
| **data_stale_flag** | boolean | **COMPUTED** | `most_recent_reporting_end_date < CURRENT_DATE - 1` |
| **rag_status** | text | **COMPUTED** | See RAG Rules below |
| **rag_reason** | text | **COMPUTED** | See RAG Rules below |
| most_recent_reporting_end_date | date | | From 7d_rollup |
| computed_at | timestamptz | | Auto-generated |

**Computed Formulas**:

```sql
-- Volume Attainment (null-safe)
volume_attainment = CASE
    WHEN weekly_target_int IS NOT NULL AND weekly_target_int > 0 THEN
        contacted_7d::numeric / weekly_target_int
    ELSE NULL
END

-- PCPL Proxy (null-safe)
pcpl_proxy_7d = CASE
    WHEN positives_7d > 0 THEN
        contacted_7d::numeric / positives_7d
    ELSE NULL
END

-- Deliverability Flag
deliverability_flag = (reply_rate_7d < 0.02 OR bounce_pct_7d >= 0.05)

-- Volume Flag
volume_flag = (
    weekly_target_int IS NOT NULL
    AND weekly_target_int > 0
    AND contacted_7d::numeric / weekly_target_int < 0.8
)

-- MMF Flag (Message Meaning Failure)
mmf_flag = (reply_rate_7d >= 0.02 AND positive_reply_rate_7d < 0.002)

-- Data Missing Flag
data_missing_flag = (contacted_7d IS NULL OR contacted_7d = 0)

-- Data Stale Flag
data_stale_flag = (most_recent_reporting_end_date < CURRENT_DATE - 1)
```

### Table: unmatched_mappings_report

Tracks clients and reporting rows that could not be matched.

| Column | Type | Description |
|--------|------|-------------|
| id | serial | Primary key |
| match_type | text | 'client_without_reporting' or 'reporting_without_client' |
| client_code | text | Client code (if applicable) |
| client_name_norm | text | Normalized name that couldn't match |
| last_seen_date | date | Most recent date seen |
| first_seen_date | date | First date seen |
| record_count | integer | Number of records |
| last_updated | timestamptz | Last update time |

## RAG Rules

### RAG Status Logic

```sql
rag_status = CASE
    -- RED: Critical issues
    WHEN data_missing_flag
        OR deliverability_flag
        OR (weekly_target_int IS NOT NULL
            AND weekly_target_int > 0
            AND contacted_7d::numeric / weekly_target_int < 0.5)
    THEN 'Red'

    -- YELLOW: Warning signs
    WHEN mmf_flag
        OR (weekly_target_int IS NOT NULL
            AND weekly_target_int > 0
            AND contacted_7d::numeric / weekly_target_int < 0.8)
    THEN 'Yellow'

    -- GREEN: Healthy
    ELSE 'Green'
END
```

### RAG Reason Logic

```sql
rag_reason = CASE
    WHEN data_missing_flag THEN
        'Data missing: no contacted volume in last 7 days'

    WHEN deliverability_flag THEN
        CASE
            WHEN reply_rate_7d < 0.02 THEN
                'Deliverability risk: reply rate is ' || ROUND(reply_rate_7d::numeric, 2) || '%'
            WHEN bounce_pct_7d >= 0.05 THEN
                'Deliverability risk: bounce rate is ' || ROUND(bounce_pct_7d::numeric, 2) || '%'
            ELSE 'Deliverability risk: check reply and bounce rates'
        END

    WHEN weekly_target_int IS NOT NULL
        AND weekly_target_int > 0
        AND contacted_7d::numeric / weekly_target_int < 0.5 THEN
        'Volume critically low: attainment is ' || ROUND(volume_attainment::numeric, 2) || '%'

    WHEN mmf_flag THEN
        'MMF risk: positive reply rate is ' || ROUND(positive_reply_rate_7d::numeric, 2) || '%'

    WHEN volume_flag THEN
        'Volume below target: attainment is ' || ROUND(volume_attainment::numeric, 2) || '%'

    ELSE 'Performance within acceptable thresholds'
END
```

### Thresholds (Configurable)

All thresholds are documented here for easy adjustment:

| Threshold | Current Value | Description |
|-----------|---------------|-------------|
| `REPLY_RATE_WARNING` | 0.02 (2%) | Below this = deliverability risk |
| `BOUNCE_RATE_WARNING` | 0.05 (5%) | Above or equal = deliverability risk |
| `VOLUME_ATTAINMENT_CRITICAL` | 0.5 (50%) | Below this = Red |
| `VOLUME_ATTAINMENT_WARNING` | 0.8 (80%) | Below this = Yellow |
| `POSITIVE_REPLY_RATE_MMF` | 0.002 (0.2%) | Below this (with good reply rate) = MMF |
| `STALE_DATA_DAYS` | 1 | Older than this = stale |

## Active Client Definition

```sql
-- Active clients view definition
CREATE VIEW active_clients_v1 AS
SELECT * FROM clients_local
WHERE (
    -- Rule 1: Known active statuses
    relationship_status IN ('active', 'live', 'ongoing')
    OR
    -- Rule 2: Safe default (no exit date and has status)
    (exit_date IS NULL AND relationship_status IS NOT NULL)
)
```

**Rationale**: This is defensive and safe. It does not assume any specific status values, but does recognize common ones. The fallback rule ensures clients with no exit date and any status are included.

## Filter Behavior

### Main Dashboard Filters

All filters are **AND**-ed together. If no filters are applied, show all active clients.

| Filter | Type | Database Field | Behavior |
|--------|------|----------------|----------|
| relationship_status | select | relationship_status | Exact match |
| closelix | boolean | closelix | Exact match |
| assigned_account_manager_name | select | assigned_account_manager_name | Exact match |
| assigned_inbox_manager_name | select | assigned_inbox_manager_name | Exact match |
| assigned_sdr_name | select | assigned_sdr_name | Exact match |
| rag_status | select | rag_status | Exact match ('Red', 'Yellow', 'Green') |
| deliverability_flag | boolean | deliverability_flag | Exact match |
| mmf_flag | boolean | mmf_flag | Exact match |
| volume_flag | boolean | volume_flag | Exact match |
| data_missing_flag | boolean | data_missing_flag | Exact match |

### Filter Options Endpoint

`GET /api/dashboard/filters` returns distinct values for dropdowns:

```json
{
  "relationship_statuses": ["active", "paused", ...],
  "account_managers": ["Alice", "Bob", ...],
  "inbox_managers": ["Carol", "Dave", ...],
  "sdrs": ["Eve", "Frank", ...]
}
```

## Sorting Behavior

### Default Sort (Dashboard)

```sql
ORDER BY
    CASE rag_status
        WHEN 'Red' THEN 1
        WHEN 'Yellow' THEN 2
        WHEN 'Green' THEN 3
    END,
    positives_7d ASC,   -- Fewest positives first (need attention)
    contacted_7d ASC    -- Then fewest contacts
```

**Rationale**: Priority clients (Red, then Yellow) appear first. Within status, clients with fewer positives get attention (they might be struggling even if not flagged yet).

## Data Freshness Behavior

### Ingestion Frequency

- **Manual**: Run `python ingest/ingest_main.py`
- **Scheduled**: Set up cron job (recommended: daily at 11:00 AM IST, after Supabase updates at 10:30 AM IST)

### Data staleness Detection

```sql
data_stale_flag = (most_recent_reporting_end_date < CURRENT_DATE - 1)
```

If any client has `data_stale_flag = true`, dashboard shows amber banner:
"Data may be stale: Some clients have not reported data in the last 24 hours."

### Last Computed Timestamp

Every table includes `computed_at` or `ingested_at`:
- `clients_local.updated_at` - Last time client data was pulled
- `campaign_reporting_local.ingested_at` - Last time reporting was pulled
- `client_7d_rollup_v1_local.computed_at` - Last time rollups were computed
- `client_health_dashboard_v1_local.computed_at` - Last time RAG was computed

## Edge Case Handling

### Null Handling

1. **Ratios**: All ratios are null-safe (return NULL if denominator is 0 or NULL)
2. **Flags**: Boolean flags default to FALSE
3. **Filters**: NULL filters are ignored (not applied)
4. **Display**: NULL values show as 'N/A' or '-' in UI

### Division by Zero

All ratios use this pattern:

```sql
CASE
    WHEN denominator > 0 THEN numerator::numeric / denominator
    ELSE NULL
END
```

### Missing Targets

If `weekly_target_int` is NULL:
- `volume_attainment` = NULL
- `volume_flag` = FALSE (can't determine)
- RAG status based on other factors

### Missing Reporting Data

If no reporting data exists for a client:
- All metric columns = 0 or NULL
- `data_missing_flag` = TRUE
- `rag_status` = RED
- `rag_reason` = "Data missing: no contacted volume in last 7 days"

### Unmatched Mappings

Two types tracked:

1. **Client Without Reporting**: Client in `clients_local` but no matching `client_name_norm` in `campaign_reporting_local`
2. **Reporting Without Client**: Reporting rows with `client_name_norm` that doesn't match any `client_code_norm`

Both are visible in `/unmatched` page for ops resolution.

## Performance Considerations

### Indexes

All tables have indexes on:
- Primary keys
- Foreign keys
- Frequently filtered columns
- Composite indexes for common joins

### Query Optimization

- Filters applied at database level (not in memory)
- 7-day window uses `end_date` index
- Client mapping uses `client_code_norm` index
- Dashboard query uses `rag_status` index

### Data Retention

- `campaign_reporting_local`: Keeps last 30 days (configurable via `INGEST_DAYS_BACK`)
- Older data is deleted before fresh insert
- This keeps table size manageable

## Future v2 (Bucket 3 Integration)

### Planned Additions

1. **New Tables**:
   - `bookings_local` - From Bucket 3
   - `qualification_events_local` - Lead qualification events
   - `show_up_events_local` - Meeting show-up tracking

2. **Enhanced Rollups** (`client_7d_rollup_v2_local`):
   - Add `bookings_7d` - Sum of bookings
   - Add `booking_rate_7d` - `bookings_7d / positives_7d`
   - Add `qualified_7d` - Sum of qualified leads
   - Add `qualification_rate_7d` - `qualified_7d / bookings_7d`
   - Add `showed_up_7d` - Sum of attended meetings
   - Add `show_up_rate_7d` - `showed_up_7d / bookings_7d`

3. **Enhanced RAG**:
   - Add `booking_flag` - Low booking rate
   - Add `qualification_flag` - Low qualification rate
   - Combine delivery AND performance flags
   - More nuanced RAG reasons

4. **Enhanced UI**:
   - Funnel columns in dashboard
   - Conversion metrics in client detail
   - Funnel visualization

### Migration Path

v2 will be **additive only**:
- No changes to existing tables or data
- New parallel tables and views
- Backward compatible with v1
- Can run v1 and v2 side-by-side during migration
