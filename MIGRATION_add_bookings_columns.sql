-- Migration: Add bookings columns for Qualified/Showed/Total Booked metrics
-- Date: 2026-03-04
-- Purpose: Add three new columns to track booking metrics from hyperke_dashboard

BEGIN;

-- ============================================================================
-- STEP 1: Remove old incomplete columns from previous attempt
-- ============================================================================

ALTER TABLE client_health_dashboard_v1_local
DROP COLUMN IF EXISTS total_interested_7d,
DROP COLUMN IF EXISTS booked_7d;

ALTER TABLE client_7d_rollup_historical
DROP COLUMN IF EXISTS total_interested_7d,
DROP COLUMN IF EXISTS booked_7d;

ALTER TABLE client_health_dashboard_historical
DROP COLUMN IF EXISTS total_interested_7d,
DROP COLUMN IF EXISTS booked_7d;

-- ============================================================================
-- STEP 2: Add new bookings columns to main dashboard table
-- ============================================================================

ALTER TABLE client_health_dashboard_v1_local
ADD COLUMN IF NOT EXISTS qualified_7d INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS showed_7d INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_booked_7d INTEGER DEFAULT 0;

-- Add comments for documentation
COMMENT ON COLUMN client_health_dashboard_v1_local.qualified_7d IS 'Count of leads with call_feedback = QUALIFIED in 7-day window (meeting_date based)';
COMMENT ON COLUMN client_health_dashboard_v1_local.showed_7d IS 'Count of leads with call_feedback IN (QUALIFIED, UNQUALIFIED) in 7-day window (meeting_date based)';
COMMENT ON COLUMN client_health_dashboard_v1_local.total_booked_7d IS 'Count of leads with meeting_date IS NOT NULL in 7-day window';

-- ============================================================================
-- STEP 3: Add bookings columns to historical rollup table
-- ============================================================================

ALTER TABLE client_7d_rollup_historical
ADD COLUMN IF NOT EXISTS qualified_7d INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS showed_7d INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_booked_7d INTEGER DEFAULT 0;

COMMENT ON COLUMN client_7d_rollup_historical.qualified_7d IS 'Historical: Count of qualified leads in 7-day window';
COMMENT ON COLUMN client_7d_rollup_historical.showed_7d IS 'Historical: Count of showed leads in 7-day window';
COMMENT ON COLUMN client_7d_rollup_historical.total_booked_7d IS 'Historical: Count of total booked leads in 7-day window';

-- ============================================================================
-- STEP 4: Add bookings columns to historical dashboard table
-- ============================================================================

ALTER TABLE client_health_dashboard_historical
ADD COLUMN IF NOT EXISTS qualified_7d INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS showed_7d INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_booked_7d INTEGER DEFAULT 0;

COMMENT ON COLUMN client_health_dashboard_historical.qualified_7d IS 'Historical: Count of qualified leads in 7-day window';
COMMENT ON COLUMN client_health_dashboard_historical.showed_7d IS 'Historical: Count of showed leads in 7-day window';
COMMENT ON COLUMN client_health_dashboard_historical.total_booked_7d IS 'Historical: Count of total booked leads in 7-day window';

-- ============================================================================
-- STEP 5: Verify columns were added
-- ============================================================================

SELECT
    table_name,
    column_name,
    data_type,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name IN ('client_health_dashboard_v1_local', 'client_7d_rollup_historical', 'client_health_dashboard_historical')
  AND column_name IN ('qualified_7d', 'showed_7d', 'total_booked_7d')
ORDER BY table_name, column_name;

COMMIT;
