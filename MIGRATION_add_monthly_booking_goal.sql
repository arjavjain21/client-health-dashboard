-- Migration: Add monthly_booking_goal column to clients_local and dashboard tables
-- Date: 2026-02-17
-- Purpose: Add monthly booking goal to client dashboard

-- Add column to clients_local table
ALTER TABLE clients_local
ADD COLUMN IF NOT EXISTS monthly_booking_goal NUMERIC;

-- Add column to dashboard table
ALTER TABLE client_health_dashboard_v1_local
ADD COLUMN IF NOT EXISTS monthly_booking_goal NUMERIC;

-- Add comment for documentation
COMMENT ON COLUMN clients_local.monthly_booking_goal IS 'Monthly booking goal from Supabase clients table';
COMMENT ON COLUMN client_health_dashboard_v1_local.monthly_booking_goal IS 'Monthly booking goal from Supabase clients table';

-- Verify columns were added
SELECT
    table_name,
    column_name,
    data_type
FROM information_schema.columns
WHERE table_name IN ('clients_local', 'client_health_dashboard_v1_local')
  AND column_name = 'monthly_booking_goal';
