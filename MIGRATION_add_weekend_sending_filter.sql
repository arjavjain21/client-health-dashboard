-- Migration: Add weekend_sending_effective column to dashboard table
-- Date: 2026-02-17
-- Purpose: Enable filtering clients by weekend sending mode (active/inactive)

-- Add the column to the dashboard table
ALTER TABLE client_health_dashboard_v1_local
ADD COLUMN IF NOT EXISTS weekend_sending_effective BOOLEAN DEFAULT FALSE;

-- Create index for efficient filtering
CREATE INDEX IF NOT EXISTS idx_dashboard_weekend_sending
ON client_health_dashboard_v1_local(weekend_sending_effective);

-- Add comment for documentation
COMMENT ON COLUMN client_health_dashboard_v1_local.weekend_sending_effective IS
'Indicates whether the client sends emails on weekends (TRUE) or only weekdays (FALSE)';

-- Verify the column was added
SELECT
    column_name,
    data_type,
    column_default
FROM information_schema.columns
WHERE table_name = 'client_health_dashboard_v1_local'
  AND column_name = 'weekend_sending_effective';
