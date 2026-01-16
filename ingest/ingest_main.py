#!/usr/bin/env python3
"""
Client Health Dashboard v1 - Main Ingestion Script

This script orchestrates the entire data ingestion pipeline.
"""
import os
import re
import logging
from datetime import datetime, timedelta, date
from dotenv import load_dotenv
from database import ReadOnlyConnection, LocalDatabase

# Load environment variables
load_dotenv()

# Configure logging
LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')
logging.basicConfig(
    level=LOG_LEVEL,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ============================================================================
# DATE RANGE CALCULATIONS
# ============================================================================

def get_friday_to_yesterday_range():
    """
    Calculate date range from previous Friday to yesterday (inclusive).
    Always shows from previous Friday, even on Fridays.

    Returns:
        tuple: (start_date, end_date) as ISO date strings
    """
    from datetime import datetime, timedelta

    today = datetime.utcnow().date()
    current_day = today.weekday()  # 0=Monday, 1=Tuesday, ..., 4=Friday, 5=Saturday, 6=Sunday

    # End date: Always yesterday
    end_date = today - timedelta(days=1)

    # Start date: Always go back to previous Friday (no special case for Fridays)
    # Calculate days to go back:
    # Sunday (6): go back 3 days (Sun->Sat->Fri) = 3 days
    # Monday (0): go back 4 days (Mon->Sun->Sat->Fri) = 4 days
    # Tuesday (1): go back 5 days = 5 days
    # Wednesday (2): go back 6 days = 6 days
    # Thursday (3): go back 7 days = 7 days
    # Friday (4): go back 7 days to previous Friday = 7 days
    # Saturday (5): go back 1 day (Sat->Fri) = 1 day
    if current_day == 6:  # Sunday
        days_to_subtract = 3
    elif current_day == 5:  # Saturday
        days_to_subtract = 1
    else:  # Monday through Friday
        days_to_subtract = current_day + 3

    start_date = today - timedelta(days=days_to_subtract)

    return start_date.isoformat(), end_date.isoformat()


# ============================================================================
# DATA PARSING FUNCTIONS
# ============================================================================

def parse_weekly_target(weekly_target: str | None) -> tuple[int | None, bool]:
    """
    Parse weekly_target text to extract integer.
    
    Examples:
        "50000" -> 50000, False
        "50,000 emails" -> 50000, False
        "unknown" -> None, True
        None -> None, True
    """
    if not weekly_target:
        return None, True
    
    # Extract first integer from string (handles commas)
    match = re.search(r'[\d,]+', str(weekly_target))
    if match:
        try:
            value = match.group().replace(',', '')
            return int(value), False
        except ValueError:
            return None, True
    return None, True


def normalize_client_name(name: str | None) -> str:
    """Normalize client name for matching: lowercase and trim"""
    if not name:
        return ''
    return name.strip().lower()


# ============================================================================
# DATA INGESTION FUNCTIONS
# ============================================================================

def ingest_clients(supabase_clients: ReadOnlyConnection, local_db: LocalDatabase):
    """Pull clients from Supabase and upsert into local database"""
    logger.info("Starting clients ingestion...")

    query = """
        SELECT
            client_id, client_code, client_name, client_company_name,
            client_email, client_website, relationship_status, relationship_type,
            assigned_account_manager_id, assigned_account_manager_name, assigned_account_manager_email,
            assigned_inbox_manager_id, assigned_inbox_manager_name, assigned_inbox_manager_email,
            assigned_sdr_id, assigned_sdr_name, assigned_sdr_email,
            weekly_target, closelix, onboarding_activated, onboarding_date, exit_date
        FROM public.clients
    """

    rows = supabase_clients.execute_read(query)
    logger.info(f"Fetched {len(rows)} clients from Supabase")

    # Parse weekly_target and prepare data
    processed_rows = []
    for row in rows:
        weekly_target_int, weekly_target_missing = parse_weekly_target(row[17])
        processed_rows.append(row + (weekly_target_int, weekly_target_missing))

    # Upsert into local database
    upsert_query = """
        INSERT INTO clients_local (
            client_id, client_code, client_name, client_company_name, client_email,
            client_website, relationship_status, relationship_type,
            assigned_account_manager_id, assigned_account_manager_name, assigned_account_manager_email,
            assigned_inbox_manager_id, assigned_inbox_manager_name, assigned_inbox_manager_email,
            assigned_sdr_id, assigned_sdr_name, assigned_sdr_email,
            weekly_target, closelix, onboarding_activated, onboarding_date, exit_date,
            weekly_target_int, weekly_target_missing
        ) VALUES (
            %s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s
        )
        ON CONFLICT (client_id) DO UPDATE SET
            client_code = EXCLUDED.client_code,
            client_name = EXCLUDED.client_name,
            client_company_name = EXCLUDED.client_company_name,
            client_email = EXCLUDED.client_email,
            client_website = EXCLUDED.client_website,
            relationship_status = EXCLUDED.relationship_status,
            relationship_type = EXCLUDED.relationship_type,
            assigned_account_manager_id = EXCLUDED.assigned_account_manager_id,
            assigned_account_manager_name = EXCLUDED.assigned_account_manager_name,
            assigned_account_manager_email = EXCLUDED.assigned_account_manager_email,
            assigned_inbox_manager_id = EXCLUDED.assigned_inbox_manager_id,
            assigned_inbox_manager_name = EXCLUDED.assigned_inbox_manager_name,
            assigned_inbox_manager_email = EXCLUDED.assigned_inbox_manager_email,
            assigned_sdr_id = EXCLUDED.assigned_sdr_id,
            assigned_sdr_name = EXCLUDED.assigned_sdr_name,
            assigned_sdr_email = EXCLUDED.assigned_sdr_email,
            weekly_target = EXCLUDED.weekly_target,
            closelix = EXCLUDED.closelix,
            onboarding_activated = EXCLUDED.onboarding_activated,
            onboarding_date = EXCLUDED.onboarding_date,
            exit_date = EXCLUDED.exit_date,
            weekly_target_int = EXCLUDED.weekly_target_int,
            weekly_target_missing = EXCLUDED.weekly_target_missing,
            updated_at = NOW()
    """

    rowcount = local_db.execute_write_many(upsert_query, processed_rows)
    logger.info(f"Upserted {rowcount} clients into local database")


def ingest_campaign_reporting(
    supabase_reporting: ReadOnlyConnection,
    local_db: LocalDatabase,
    days_back: int = 30
):
    """Pull campaign reporting from Supabase and upsert into local database"""
    logger.info(f"Starting campaign reporting ingestion (last {days_back} days)...")

    cutoff_date = (date.today() - timedelta(days=days_back)).isoformat()

    query = """
        SELECT
            campaign_date_key, campaign_id, parent_campaign_id, campaign_name,
            client_name, status, start_date, end_date,
            total_sent, new_leads_reached, replies_count, positive_reply,
            bounce_count, reply_rate, positive_reply_rate,
            inserted_at, updated_at, smartlead_account_name
        FROM public.campaign_reporting
        WHERE end_date >= %s
    """

    rows = supabase_reporting.execute_read(query, (cutoff_date,))
    logger.info(f"Fetched {len(rows)} campaign reporting rows from Supabase")

    # Normalize client_name and prepare data
    processed_rows = []
    for row in rows:
        client_name_norm = normalize_client_name(row[4])
        # Reconstruct row with client_name_norm inserted after client_name
        # Original row has 18 fields, we need to insert at position 5
        processed_row = (
            row[0],  # campaign_date_key
            row[1],  # campaign_id
            row[2],  # parent_campaign_id
            row[3],  # campaign_name
            row[4],  # client_name
            client_name_norm,  # NEW: client_name_norm
            row[5],  # status
            row[6],  # start_date
            row[7],  # end_date
            row[8],  # total_sent
            row[9],  # new_leads_reached
            row[10], # replies_count
            row[11], # positive_reply
            row[12], # bounce_count
            row[13], # reply_rate
            row[14], # positive_reply_rate
            row[15], # inserted_at
            row[16], # updated_at
            row[17]  # smartlead_account_name
        )
        processed_rows.append(processed_row)

    # Delete old data and insert new
    delete_query = "DELETE FROM campaign_reporting_local WHERE end_date >= %s"
    local_db.execute_write(delete_query, (cutoff_date,))

    insert_query = """
        INSERT INTO campaign_reporting_local (
            campaign_date_key, campaign_id, parent_campaign_id, campaign_name,
            client_name, client_name_norm, status, start_date, end_date,
            total_sent, new_leads_reached, replies_count, positive_reply,
            bounce_count, reply_rate, positive_reply_rate,
            inserted_at, updated_at, smartlead_account_name
        ) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
    """

    rowcount = local_db.execute_write_many(insert_query, processed_rows)
    logger.info(f"Inserted {rowcount} campaign reporting rows into local database")


def build_client_mapping(local_db: LocalDatabase):
    """Build mapping between client_code and reporting client_name"""
    logger.info("Building client name mapping...")

    # Get all client codes
    client_codes = local_db.execute_read("""
        SELECT DISTINCT client_id, client_code, LOWER(TRIM(client_code))
        FROM clients_local
    """)

    # Get all reporting client names
    reporting_names = local_db.execute_read("""
        SELECT DISTINCT LOWER(TRIM(client_name)), client_name
        FROM campaign_reporting_local
    """)

    # Build exact matches
    mapping_rows = []
    matched_reporting_names = set()

    for client_id, client_code, client_code_norm in client_codes:
        # Find exact match in reporting names
        for client_name_norm, client_name in reporting_names:
            if client_code_norm == client_name_norm:
                mapping_rows.append((
                    client_id, client_code, client_code_norm,
                    client_name_norm, 'exact', True
                ))
                matched_reporting_names.add(client_name_norm)
                break

    # Clear old mappings and insert fresh
    local_db.execute_write("DELETE FROM client_name_map_local")

    insert_query = """
        INSERT INTO client_name_map_local (
            client_id, client_code, client_code_norm, client_name_norm,
            match_confidence, is_matched
        ) VALUES (%s,%s,%s,%s,%s,%s)
    """

    local_db.execute_write_many(insert_query, mapping_rows)
    logger.info(f"Created {len(mapping_rows)} client mappings")
    logger.warning(f"Unmatched reporting client_names: {len(reporting_names) - len(matched_reporting_names)}")


def compute_7d_rollups(local_db: LocalDatabase):
    """Compute rollups from Friday to yesterday"""
    logger.info("Computing Friday-to-Yesterday rollups...")

    start_date, end_date = get_friday_to_yesterday_range()
    logger.info(f"Date range: {start_date} to {end_date}")

    # Clear old rollups
    local_db.execute_write("DELETE FROM client_7d_rollup_v1_local")

    # Compute rollups
    rollup_query = """
        INSERT INTO client_7d_rollup_v1_local (
            client_id, client_code,
            contacted_7d, replies_7d, positives_7d, bounces_7d,
            reply_rate_7d, positive_reply_rate_7d, bounce_pct_7d,
            new_leads_reached_7d,
            most_recent_reporting_end_date
        )
        SELECT
            m.client_id,
            c.client_code,
            COALESCE(SUM(cr.total_sent), 0) as contacted_7d,
            COALESCE(SUM(cr.replies_count), 0) as replies_7d,
            COALESCE(SUM(cr.positive_reply), 0) as positives_7d,
            COALESCE(SUM(cr.bounce_count), 0) as bounces_7d,
            CASE
                WHEN SUM(cr.new_leads_reached) > 0 THEN
                    ROUND(SUM(cr.replies_count)::numeric / SUM(cr.new_leads_reached), 4)
                ELSE NULL
            END as reply_rate_7d,
            CASE
                WHEN SUM(cr.replies_count) > 0 THEN
                    ROUND(SUM(cr.positive_reply)::numeric / SUM(cr.replies_count), 4)
                ELSE NULL
            END as positive_reply_rate_7d,
            CASE
                WHEN SUM(cr.total_sent) > 0 THEN
                    ROUND(SUM(cr.bounce_count)::numeric / SUM(cr.total_sent), 4)
                ELSE NULL
            END as bounce_pct_7d,
            COALESCE(SUM(cr.new_leads_reached), 0) as new_leads_reached_7d,
            MAX(cr.end_date) as most_recent_reporting_end_date
        FROM clients_local c
        INNER JOIN client_name_map_local m ON c.client_code = m.client_code
        LEFT JOIN campaign_reporting_local cr
            ON m.client_name_norm = cr.client_name_norm
            AND cr.end_date >= %s
            AND cr.end_date <= %s
        GROUP BY m.client_id, c.client_code
    """

    rowcount = local_db.execute_write(rollup_query, (start_date, end_date))
    logger.info(f"Computed {rowcount} client rollups for date range {start_date} to {end_date}")


def compute_dashboard_dataset(local_db: LocalDatabase):
    """Build final dashboard dataset with all metrics, flags, and RAG status"""
    logger.info("Computing dashboard dataset...")

    # Clear old dashboard data
    local_db.execute_write("DELETE FROM client_health_dashboard_v1_local")

    # Compute dashboard dataset
    dashboard_query = """
        INSERT INTO client_health_dashboard_v1_local (
            client_id, client_code, client_name, client_company_name,
            relationship_status, assigned_account_manager_name,
            assigned_inbox_manager_name, assigned_sdr_name,
            weekly_target_int, weekly_target_missing, closelix,
            contacted_7d, replies_7d, positives_7d, bounces_7d,
            reply_rate_7d, positive_reply_rate_7d, bounce_pct_7d,
            new_leads_reached_7d,
            volume_attainment, pcpl_proxy_7d,
            deliverability_flag, volume_flag, mmf_flag,
            data_missing_flag, data_stale_flag,
            rag_status, rag_reason,
            most_recent_reporting_end_date
        )
        SELECT
            c.client_id, c.client_code, c.client_name, c.client_company_name,
            c.relationship_status, c.assigned_account_manager_name,
            c.assigned_inbox_manager_name, c.assigned_sdr_name,
            c.weekly_target_int, c.weekly_target_missing, c.closelix,
            COALESCE(r.contacted_7d, 0) as contacted_7d,
            COALESCE(r.replies_7d, 0) as replies_7d,
            COALESCE(r.positives_7d, 0) as positives_7d,
            COALESCE(r.bounces_7d, 0) as bounces_7d,
            r.reply_rate_7d, r.positive_reply_rate_7d, r.bounce_pct_7d,
            COALESCE(r.new_leads_reached_7d, 0) as new_leads_reached_7d,
            CASE
                WHEN c.weekly_target_int IS NOT NULL AND c.weekly_target_int > 0 THEN
                    ROUND(COALESCE(r.contacted_7d, 0)::numeric / c.weekly_target_int, 4)
                ELSE NULL
            END as volume_attainment,
            CASE
                WHEN r.positives_7d > 0 THEN
                    ROUND(COALESCE(r.contacted_7d, 0)::numeric / r.positives_7d, 2)
                ELSE NULL
            END as pcpl_proxy_7d,
            CASE
                WHEN r.reply_rate_7d < 0.02 OR r.bounce_pct_7d >= 0.05 THEN TRUE
                ELSE FALSE
            END as deliverability_flag,
            CASE
                WHEN c.weekly_target_int IS NOT NULL AND c.weekly_target_int > 0
                    AND COALESCE(r.contacted_7d, 0)::numeric / c.weekly_target_int < 0.8 THEN TRUE
                ELSE FALSE
            END as volume_flag,
            CASE
                WHEN r.reply_rate_7d >= 0.02 AND r.positive_reply_rate_7d < 0.05 THEN TRUE
                ELSE FALSE
            END as mmf_flag,
            CASE
                WHEN r.contacted_7d IS NULL OR r.contacted_7d = 0 THEN TRUE
                ELSE FALSE
            END as data_missing_flag,
            CASE
                WHEN r.most_recent_reporting_end_date < CURRENT_DATE - 1 THEN TRUE
                ELSE FALSE
            END as data_stale_flag,
            CASE
                WHEN (r.contacted_7d IS NULL OR r.contacted_7d = 0)
                    OR r.reply_rate_7d < 0.02 OR r.bounce_pct_7d >= 0.04
                    OR r.positive_reply_rate_7d < 0.05
                    OR (c.weekly_target_int IS NOT NULL AND c.weekly_target_int > 0
                        AND COALESCE(r.contacted_7d, 0)::numeric / c.weekly_target_int < 0.5)
                THEN 'Red'
                WHEN r.positive_reply_rate_7d < 0.08 AND r.reply_rate_7d >= 0.02
                    OR (c.weekly_target_int IS NOT NULL AND c.weekly_target_int > 0
                        AND COALESCE(r.contacted_7d, 0)::numeric / c.weekly_target_int < 0.8)
                THEN 'Yellow'
                ELSE 'Green'
            END as rag_status,
            NULL as rag_reason,
            r.most_recent_reporting_end_date
        FROM active_clients_v1 c
        LEFT JOIN client_7d_rollup_v1_local r USING (client_id)
    """

    rowcount = local_db.execute_write(dashboard_query)
    logger.info(f"Computed {rowcount} dashboard rows")

    # Update rag_reason
    update_reasons_query = """
        UPDATE client_health_dashboard_v1_local
        SET rag_reason = CASE
            WHEN data_missing_flag THEN
                'Data missing: no contacted volume in last 7 days'
            WHEN deliverability_flag THEN
                CASE
                    WHEN reply_rate_7d < 0.02 THEN
                        'Deliverability risk: reply rate is ' || ROUND((reply_rate_7d * 100)::numeric, 2) || '%'
                    WHEN bounce_pct_7d >= 0.04 THEN
                        'Deliverability risk: bounce rate is ' || ROUND((bounce_pct_7d * 100)::numeric, 2) || '%'
                    ELSE 'Deliverability risk: check reply and bounce rates'
                END
            WHEN weekly_target_int IS NOT NULL AND weekly_target_int > 0
                AND contacted_7d::numeric / weekly_target_int < 0.5 THEN
                'Volume critically low: attainment is ' || ROUND(volume_attainment::numeric, 2) || '%'
            WHEN mmf_flag THEN
                'MMF risk: positive reply rate is ' || ROUND((positive_reply_rate_7d * 100)::numeric, 2) || '%'
            WHEN volume_flag THEN
                'Volume below target: attainment is ' || ROUND(volume_attainment::numeric, 2) || '%'
            ELSE 'Performance within acceptable thresholds'
        END
    """

    local_db.execute_write(update_reasons_query)
    logger.info("Updated RAG reasons")


def track_unmatched_mappings(local_db: LocalDatabase):
    """Track unmatched clients and reporting rows for visibility"""
    logger.info("Tracking unmatched mappings...")

    # Clear old report
    local_db.execute_write("DELETE FROM unmatched_mappings_report")

    # Clients without reporting
    clients_without_reporting = """
        INSERT INTO unmatched_mappings_report (
            match_type, client_code, client_name_norm, last_seen_date, record_count
        )
        SELECT
            'client_without_reporting',
            client_code,
            LOWER(TRIM(client_code)),
            CURRENT_DATE,
            1
        FROM clients_local c
        WHERE NOT EXISTS (
            SELECT 1 FROM client_name_map_local m WHERE m.client_code = c.client_code
        )
        AND c.exit_date IS NULL
    """
    local_db.execute_write(clients_without_reporting)

    # Reporting without clients
    reporting_without_clients = """
        INSERT INTO unmatched_mappings_report (
            match_type, client_code, client_name_norm, last_seen_date, record_count
        )
        SELECT
            'reporting_without_client',
            NULL,
            client_name_norm,
            MAX(end_date),
            COUNT(*)
        FROM campaign_reporting_local
        WHERE end_date >= CURRENT_DATE - INTERVAL '30 days'
        AND client_name_norm NOT IN (
            SELECT client_code_norm FROM client_name_map_local
        )
        GROUP BY client_name_norm
    """
    local_db.execute_write(reporting_without_clients)

    unmatched_count = local_db.execute_read("SELECT COUNT(*) FROM unmatched_mappings_report")[0][0]
    logger.warning(f"Found {unmatched_count} unmatched mappings")


# ============================================================================
# MAIN ORCHESTRATION
# ============================================================================

def main():
    """Main ingestion workflow"""
    logger.info("=" * 60)
    logger.info("Client Health Dashboard v1 - Data Ingestion")
    logger.info("=" * 60)

    try:
        # Initialize connections
        logger.info("Initializing database connections...")

        clients_db = ReadOnlyConnection(
            os.getenv('CLIENTS_DB_URL'),
            "Clients DB"
        )
        clients_db.connect()

        reporting_db = ReadOnlyConnection(
            os.getenv('REPORTING_DB_URL'),
            "Reporting DB"
        )
        reporting_db.connect()

        local_db = LocalDatabase(os.getenv('LOCAL_DB_URL'))
        local_db.connect()

        # Execute ingestion pipeline
        ingest_clients(clients_db, local_db)
        ingest_campaign_reporting(
            reporting_db,
            local_db,
            days_back=int(os.getenv('INGEST_DAYS_BACK', 30))
        )
        build_client_mapping(local_db)
        compute_7d_rollups(local_db)
        compute_dashboard_dataset(local_db)
        track_unmatched_mappings(local_db)

        # Close connections
        clients_db.close()
        reporting_db.close()
        local_db.close()

        logger.info("=" * 60)
        logger.info("Ingestion completed successfully")
        logger.info("=" * 60)

    except Exception as e:
        logger.error(f"Ingestion failed: {e}", exc_info=True)
        raise


if __name__ == '__main__':
    main()
