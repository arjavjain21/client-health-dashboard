-- Migration: Add weekend_sending_effective to clients_local table
-- Date: 2026-02-16
-- Description: Adds weekend_sending_effective column to support different prorated target calculations
--              (goal/5 for weekday-only sending, goal/7 for weekend sending)

-- Add the column to clients_local
ALTER TABLE clients_local
ADD COLUMN IF NOT EXISTS weekend_sending_effective BOOLEAN DEFAULT FALSE;

-- Add comment for documentation
COMMENT ON COLUMN clients_local.weekend_sending_effective IS
'If TRUE, client sends on weekends (target = goal/7). If FALSE, weekday-only (target = goal/5)';

-- Create index for performance (optional, as this will be used in calculations)
CREATE INDEX IF NOT EXISTS idx_clients_local_weekend_sending
ON clients_local(weekend_sending_effective);

-- Verify the column was added
SELECT
    column_name,
    data_type,
    column_default,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'clients_local'
AND column_name = 'weekend_sending_effective';
