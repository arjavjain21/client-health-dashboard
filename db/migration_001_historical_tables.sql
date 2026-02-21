-- Migration: Add historical week tables
-- Created: 2026-02-21
-- Description: New tables to store last 4 completed weeks (parallel to current week tables)

-- Table 1: Historical 7-day rollups
CREATE TABLE IF NOT EXISTS client_7d_rollup_historical (
    id SERIAL PRIMARY KEY,
    client_id BIGINT NOT NULL,
    client_code TEXT NOT NULL,

    -- Period tracking
    period_start_date DATE NOT NULL,
    period_end_date DATE NOT NULL,
    week_number INTEGER NOT NULL, -- 1=last week, 2=two weeks ago, etc.

    -- Metrics (same as client_7d_rollup_v1_local)
    contacted_7d INTEGER DEFAULT 0,
    replies_7d INTEGER DEFAULT 0,
    positives_7d INTEGER DEFAULT 0,
    bounces_7d INTEGER DEFAULT 0,
    new_leads_reached_7d INTEGER DEFAULT 0,
    reply_rate_7d NUMERIC(10, 4),
    positive_reply_rate_7d NUMERIC(10, 4),
    bounce_pct_7d NUMERIC(10, 4),
    most_recent_reporting_end_date DATE,

    -- Metadata
    computed_at TIMESTAMPTZ DEFAULT NOW(),

    -- Constraints
    UNIQUE(client_id, period_start_date),
    FOREIGN KEY (client_id) REFERENCES clients_local(client_id) ON DELETE CASCADE
);

-- Table 2: Historical dashboard dataset (with RAG)
CREATE TABLE IF NOT EXISTS client_health_dashboard_historical (
    id SERIAL PRIMARY KEY,
    client_id BIGINT NOT NULL,
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
    bonus_pool_monthly NUMERIC(10, 2),
    weekend_sending_effective BOOLEAN DEFAULT FALSE,
    monthly_booking_goal NUMERIC(10, 2),

    -- Period tracking
    period_start_date DATE NOT NULL,
    period_end_date DATE NOT NULL,
    week_number INTEGER NOT NULL,

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
    not_contacted_leads BIGINT DEFAULT 0,

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

    -- Constraints
    UNIQUE(client_id, period_start_date),
    FOREIGN KEY (client_id) REFERENCES clients_local(client_id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_rollup_hist_period ON client_7d_rollup_historical(period_start_date, period_end_date);
CREATE INDEX IF NOT EXISTS idx_rollup_hist_client ON client_7d_rollup_historical(client_id);
CREATE INDEX IF NOT EXISTS idx_rollup_hist_week ON client_7d_rollup_historical(week_number);

CREATE INDEX IF NOT EXISTS idx_dashboard_hist_period ON client_health_dashboard_historical(period_start_date, period_end_date);
CREATE INDEX IF NOT EXISTS idx_dashboard_hist_client ON client_health_dashboard_historical(client_id);
CREATE INDEX IF NOT EXISTS idx_dashboard_hist_week ON client_health_dashboard_historical(week_number);
CREATE INDEX IF NOT EXISTS idx_dashboard_hist_rag ON client_health_dashboard_historical(rag_status);

-- Success marker
COMMENT ON TABLE client_7d_rollup_historical IS 'Stores last 4 completed Friday-Thursday weeks of rollup data';
COMMENT ON TABLE client_health_dashboard_historical IS 'Stores last 4 completed weeks with RAG status for dashboard UI';
