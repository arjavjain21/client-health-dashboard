-- Client Health Dashboard v1 - Local Database Schema
-- This database stores transformed data from Supabase for dashboard queries
-- Supabase connections are READ-ONLY, this is the only writable store

-- ====================================================================
-- LOCAL TABLES
-- ====================================================================

-- Clients: Subset of fields from public.clients (Clients DB)
CREATE TABLE IF NOT EXISTS clients_local (
    client_id BIGINT PRIMARY KEY,
    client_code TEXT NOT NULL,
    client_name TEXT,
    client_company_name TEXT,
    client_email TEXT,
    client_website TEXT,
    relationship_status TEXT,
    relationship_type TEXT,
    assigned_account_manager_id BIGINT,
    assigned_account_manager_name TEXT,
    assigned_account_manager_email TEXT,
    assigned_inbox_manager_id BIGINT,
    assigned_inbox_manager_name TEXT,
    assigned_inbox_manager_email TEXT,
    assigned_sdr_id BIGINT,
    assigned_sdr_name TEXT,
    assigned_sdr_email TEXT,
    weekly_target TEXT,
    weekly_target_int INTEGER,
    weekly_target_missing BOOLEAN DEFAULT FALSE,
    closelix BOOLEAN DEFAULT FALSE,
    onboarding_activated BOOLEAN,
    onboarding_date DATE,
    exit_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_clients_local_code ON clients_local(client_code);
CREATE INDEX IF NOT EXISTS idx_clients_local_client_id ON clients_local(client_id);
CREATE INDEX IF NOT EXISTS idx_clients_local_status ON clients_local(relationship_status);
CREATE INDEX IF NOT EXISTS idx_clients_local_am ON clients_local(assigned_account_manager_name);
CREATE INDEX IF NOT EXISTS idx_clients_local_im ON clients_local(assigned_inbox_manager_name);
CREATE INDEX IF NOT EXISTS idx_clients_local_sdr ON clients_local(assigned_sdr_name);

-- Campaign Reporting: Subset of fields from public.campaign_reporting (Reporting DB)
CREATE TABLE IF NOT EXISTS campaign_reporting_local (
    id SERIAL PRIMARY KEY,
    campaign_date_key TEXT NOT NULL,
    campaign_id TEXT NOT NULL,
    parent_campaign_id TEXT,
    campaign_name TEXT NOT NULL,
    client_name TEXT NOT NULL,
    client_name_norm TEXT NOT NULL,
    status TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_sent INTEGER DEFAULT 0,
    new_leads_reached INTEGER DEFAULT 0,
    replies_count INTEGER DEFAULT 0,
    positive_reply INTEGER DEFAULT 0,
    bounce_count INTEGER DEFAULT 0,
    reply_rate NUMERIC(10, 4),
    positive_reply_rate NUMERIC(10, 4),
    inserted_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    smartlead_account_name VARCHAR(255),
    ingested_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_campaign_local_client ON campaign_reporting_local(client_name_norm);
CREATE INDEX IF NOT EXISTS idx_campaign_local_end_date ON campaign_reporting_local(end_date);
CREATE INDEX IF NOT EXISTS idx_campaign_local_client_end ON campaign_reporting_local(client_name_norm, end_date);
CREATE INDEX IF NOT EXISTS idx_campaign_local_date_key ON campaign_reporting_local(campaign_date_key);

-- Client Name Mapping: Tracks mapping between client_code and reporting client_name
CREATE TABLE IF NOT EXISTS client_name_map_local (
    id SERIAL PRIMARY KEY,
    client_id BIGINT NOT NULL,
    client_code TEXT NOT NULL,
    client_code_norm TEXT NOT NULL,
    client_name_norm TEXT NOT NULL,
    match_confidence TEXT DEFAULT 'exact',
    is_matched BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (client_id) REFERENCES clients_local(client_id) ON DELETE CASCADE
);

-- Create index for mapping lookups
CREATE INDEX IF NOT EXISTS idx_client_map_code ON client_name_map_local(client_code);
CREATE INDEX IF NOT EXISTS idx_client_map_norm_code ON client_name_map_local(client_code_norm);
CREATE INDEX IF NOT EXISTS idx_client_map_norm_name ON client_name_map_local(client_name_norm);

-- 7-Day Rollup: Aggregated metrics per client for last 7 completed days
CREATE TABLE IF NOT EXISTS client_7d_rollup_v1_local (
    client_id BIGINT PRIMARY KEY,
    client_code TEXT NOT NULL,
    contacted_7d INTEGER DEFAULT 0,
    replies_7d INTEGER DEFAULT 0,
    positives_7d INTEGER DEFAULT 0,
    bounces_7d INTEGER DEFAULT 0,
    reply_rate_7d NUMERIC(10, 4),
    positive_reply_rate_7d NUMERIC(10, 4),
    bounce_pct_7d NUMERIC(10, 4),
    most_recent_reporting_end_date DATE,
    computed_at TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (client_id) REFERENCES clients_local(client_id) ON DELETE CASCADE
);

-- Dashboard Dataset: Final view with all metrics for UI
CREATE TABLE IF NOT EXISTS client_health_dashboard_v1_local (
    client_id BIGINT PRIMARY KEY,
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

    FOREIGN KEY (client_id) REFERENCES clients_local(client_id) ON DELETE CASCADE
);

-- Create indexes for dashboard queries
CREATE INDEX IF NOT EXISTS idx_dashboard_rag ON client_health_dashboard_v1_local(rag_status);
CREATE INDEX IF NOT EXISTS idx_dashboard_am ON client_health_dashboard_v1_local(assigned_account_manager_name);
CREATE INDEX IF NOT EXISTS idx_dashboard_flags ON client_health_dashboard_v1_local(deliverability_flag, volume_flag, mmf_flag);

-- Unmatched Report: Track clients and reporting rows that couldn't be matched
CREATE TABLE IF NOT EXISTS unmatched_mappings_report (
    id SERIAL PRIMARY KEY,
    match_type TEXT NOT NULL, -- 'client_without_reporting' or 'reporting_without_client'
    client_code TEXT,
    client_name_norm TEXT,
    last_seen_date DATE,
    first_seen_date DATE DEFAULT CURRENT_DATE,
    record_count INTEGER DEFAULT 1,
    last_updated TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_unmatched_type ON unmatched_mappings_report(match_type);
CREATE INDEX IF NOT EXISTS idx_unmatched_code ON unmatched_mappings_report(client_code);

-- ====================================================================
-- FUNCTIONS
-- ====================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_clients_local_updated_at
    BEFORE UPDATE ON clients_local
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_client_name_map_local_updated_at
    BEFORE UPDATE ON client_name_map_local
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ====================================================================
-- VIEWS
-- ====================================================================

-- Active clients view (based on relationship_status rules)
CREATE OR REPLACE VIEW active_clients_v1 AS
SELECT *
FROM clients_local
WHERE (
    -- Active relationship statuses
    relationship_status IN ('active', 'live', 'ongoing')
    OR (
        -- Safe default: no exit date and has relationship status
        exit_date IS NULL
        AND relationship_status IS NOT NULL
    )
);

-- Unmatched clients (have client_code but no reporting data in last 30 days)
CREATE OR REPLACE VIEW unmatched_clients_v1 AS
SELECT DISTINCT
    c.client_id,
    c.client_code,
    c.client_company_name,
    c.relationship_status
FROM clients_local c
LEFT JOIN client_name_map_local m ON c.client_code = m.client_code
WHERE m.client_id IS NULL;

-- Unmatched reporting (reporting rows with no matching client_code)
CREATE OR REPLACE VIEW unmatched_reporting_v1 AS
SELECT DISTINCT
    client_name_norm,
    client_name,
    COUNT(*) as record_count,
    MAX(end_date) as last_seen_date
FROM campaign_reporting_local
WHERE end_date >= CURRENT_DATE - INTERVAL '30 days'
AND client_name_norm NOT IN (
    SELECT client_code_norm
    FROM client_name_map_local
)
GROUP BY client_name_norm, client_name;

COMMENT ON TABLE clients_local IS 'Local copy of clients from Supabase public.clients';
COMMENT ON TABLE campaign_reporting_local IS 'Local copy of campaign reporting from Supabase public.campaign_reporting';
COMMENT ON TABLE client_name_map_local IS 'Maps client_code to reporting client_name with normalization';
COMMENT ON TABLE client_7d_rollup_v1_local IS '7-day aggregated rollup per client';
COMMENT ON TABLE client_health_dashboard_v1_local IS 'Final dataset for dashboard UI with all metrics and RAG status';
COMMENT ON TABLE unmatched_mappings_report IS 'Tracks unmatched clients and reporting rows for ops visibility';

COMMENT ON VIEW active_clients_v1 IS 'Clients considered active based on relationship_status rules';
COMMENT ON VIEW unmatched_clients_v1 IS 'Clients in clients_local with no matching reporting data';
COMMENT ON VIEW unmatched_reporting_v1 IS 'Reporting rows with no matching client in clients_local';
