-- Migration: Add prorated_target column to client_health_dashboard_v1_local
-- Run this manually if the column doesn't exist:
-- psql -U postgres -d client_health_dashboard_local -f MIGRATION_add_prorated_target.sql

ALTER TABLE client_health_dashboard_v1_local 
ADD COLUMN IF NOT EXISTS prorated_target NUMERIC(10, 2);
