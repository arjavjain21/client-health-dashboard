-- Migration: Add not_contacted_leads column
-- Date: 2026-02-05
-- Description: Adds column to track leads with STARTED status (not yet contacted)
-- Backward compatible: YES (uses DEFAULT 0)

-- Add new column to existing table
ALTER TABLE client_health_dashboard_v1_local
ADD COLUMN not_contacted_leads INTEGER DEFAULT 0;

-- Add index for better query performance (optional but recommended)
CREATE INDEX IF NOT EXISTS idx_not_contacted_leads
ON client_health_dashboard_v1_local(not_contacted_leads);

-- Add comment for documentation
COMMENT ON COLUMN client_health_dashboard_v1_local.not_contacted_leads IS
'Number of leads with STARTED status (not yet contacted) from SmartLead API. Updated daily during ingestion.';

-- Verification query (run this to verify)
-- SELECT client_code, not_contacted_leads FROM client_health_dashboard_v1_local LIMIT 10;
