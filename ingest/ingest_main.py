#!/usr/bin/env python3
"""
Client Health Dashboard v1 - Main Ingestion Script

This script orchestrates the entire data ingestion pipeline.

Usage:
    python ingest_main.py              # Full ingestion (includes SmartLead API)
    python ingest_main.py --skip-smartlead  # Quick refresh (skips SmartLead API)
"""
import os
import re
import logging
import argparse
from datetime import datetime, timedelta, date
from dotenv import load_dotenv
from database import ReadOnlyConnection, LocalDatabase

# Import SmartLead API functions for not_contacted leads
import sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'ingest'))
from consolidate_leads_by_client import (
    create_session,
    fetch_active_campaigns,
    fetch_all_clients,
    process_all_campaigns,
    consolidate_by_client
)

# Load environment variables
load_dotenv()

# Parse command-line arguments
parser = argparse.ArgumentParser(description='Client Health Dashboard Ingestion')
parser.add_argument(
    '--skip-smartlead',
    action='store_true',
    help='Skip SmartLead API call for not_contacted_leads (use for quick manual refresh)'
)
args = parser.parse_args()

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
# SMARTLEAD NOT CONTACTED LEADS INTEGRATION
# ============================================================================

def fetch_not_contacted_leads_from_smartlead():
    """
    Fetch not contacted lead counts from SmartLead API.

    Returns:
        dict: Maps normalized client_name to not_contacted count
              {client_name: not_contacted_count}
    """
    logger.info("Fetching not contacted leads from SmartLead API...")

    try:
        # Create API session
        session = create_session()

        # Fetch campaigns and process
        campaigns = fetch_active_campaigns(session)
        if not campaigns:
            logger.warning("No active campaigns found in SmartLead API")
            return {}

        client_map = fetch_all_clients(session)

        # Process campaigns (this may take 10-15 minutes)
        logger.info(f"Processing {len(campaigns)} campaigns for not contacted leads...")
        campaign_data = process_all_campaigns(campaigns, client_map)

        # Consolidate by client
        client_summaries = consolidate_by_client(campaign_data)

        # Convert to dict: normalized client_name -> not_contacted count
        not_contacted_map = {}
        for summary in client_summaries:
            normalized_name = normalize_client_name(summary.client_name)
            not_contacted_map[normalized_name] = summary.not_contacted

        session.close()

        logger.info(f"Fetched not contacted data for {len(not_contacted_map)} clients")
        return not_contacted_map

    except Exception as e:
        logger.error(f"Failed to fetch not contacted leads from SmartLead: {e}", exc_info=True)
        # Return empty dict on failure - dashboard will show 0 for all clients
        return {}


def update_not_contacted_leads(local_db: LocalDatabase, not_contacted_map: dict):
    """
    Update not_contacted_leads column in dashboard table.

    Args:
        local_db: Local database connection
        not_contacted_map: Dict of {normalized_client_name: not_contacted_count}
    """
    logger.info("Updating not_contacted_leads in dashboard...")

    try:
        # Get all clients from dashboard
        query = """
            SELECT client_id, client_code, client_name
            FROM client_health_dashboard_v1_local
        """
        clients = local_db.execute_read(query)

        updated_count = 0
        for client in clients:
            client_id = client[0]  # client_id (tuple index 0)
            client_code = client[1]  # client_code (tuple index 1)
            client_name = client[2] or client_code  # client_name (tuple index 2)

            # Try both normalized client_name and client_code for matching
            normalized_name = normalize_client_name(client_name)
            normalized_code = normalize_client_name(client_code)

            # Find not_contacted count (try client_name first, then client_code)
            not_contacted = not_contacted_map.get(normalized_name)
            if not_contacted is None:
                not_contacted = not_contacted_map.get(normalized_code, 0)

            # Update this client
            update_query = """
                UPDATE client_health_dashboard_v1_local
                SET not_contacted_leads = %s
                WHERE client_id = %s
            """
            local_db.execute_write(update_query, (not_contacted, client_id))
            updated_count += 1

        logger.info(f"Updated not_contacted_leads for {updated_count} clients")

    except Exception as e:
        logger.error(f"Failed to update not_contacted_leads: {e}", exc_info=True)
        raise


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
            weekly_target, closelix, onboarding_activated, onboarding_date, exit_date,
            bonus_pool_monthly
        FROM public.clients
    """

    rows = supabase_clients.execute_read(query)
    logger.info(f"Fetched {len(rows)} clients from Supabase")

    # Parse weekly_target and prepare data
    processed_rows = []
    for row in rows:
        weekly_target_int, weekly_target_missing = parse_weekly_target(row[17])
        # row[22] is bonus_pool_monthly (newly added)
        bonus_pool_monthly = row[22] if len(row) > 22 else None
        processed_rows.append(row[:22] + (weekly_target_int, weekly_target_missing, bonus_pool_monthly))

    # Upsert into local database
    upsert_query = """
        INSERT INTO clients_local (
            client_id, client_code, client_name, client_company_name, client_email,
            client_website, relationship_status, relationship_type,
            assigned_account_manager_id, assigned_account_manager_name, assigned_account_manager_email,
            assigned_inbox_manager_id, assigned_inbox_manager_name, assigned_inbox_manager_email,
            assigned_sdr_id, assigned_sdr_name, assigned_sdr_email,
            weekly_target, closelix, onboarding_activated, onboarding_date, exit_date,
            weekly_target_int, weekly_target_missing, bonus_pool_monthly
        ) VALUES (
            %s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s
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
            bonus_pool_monthly = EXCLUDED.bonus_pool_monthly,
            updated_at = NOW()
    """

    rowcount = local_db.execute_write_many(upsert_query, processed_rows)
    logger.info(f"Upserted {rowcount} clients into local database")
    
    # Fix missing SDR names by looking up from SDR IDs
    logger.info("Fixing missing SDR names from SDR IDs...")
    fix_sdr_names_query = """
        UPDATE clients_local c1
        SET assigned_sdr_name = (
            SELECT c2.assigned_sdr_name
            FROM clients_local c2
            WHERE c2.assigned_sdr_id = c1.assigned_sdr_id
              AND c2.assigned_sdr_name IS NOT NULL
              AND c2.assigned_sdr_name != ''
            LIMIT 1
        )
        WHERE c1.assigned_sdr_id IS NOT NULL
          AND (c1.assigned_sdr_name IS NULL OR c1.assigned_sdr_name = '')
    """
    fixed_count = local_db.execute_write(fix_sdr_names_query)
    if fixed_count > 0:
        logger.info(f"Fixed {fixed_count} missing SDR names")
    
    # Fix missing Account Manager names by looking up from AM IDs
    logger.info("Fixing missing Account Manager names from AM IDs...")
    fix_am_names_query = """
        UPDATE clients_local c1
        SET assigned_account_manager_name = (
            SELECT c2.assigned_account_manager_name
            FROM clients_local c2
            WHERE c2.assigned_account_manager_id = c1.assigned_account_manager_id
              AND c2.assigned_account_manager_name IS NOT NULL
              AND c2.assigned_account_manager_name != ''
            LIMIT 1
        )
        WHERE c1.assigned_account_manager_id IS NOT NULL
          AND (c1.assigned_account_manager_name IS NULL OR c1.assigned_account_manager_name = '')
    """
    fixed_am_count = local_db.execute_write(fix_am_names_query)
    if fixed_am_count > 0:
        logger.info(f"Fixed {fixed_am_count} missing Account Manager names")
    
    # Fix missing Inbox Manager names by looking up from IM IDs
    logger.info("Fixing missing Inbox Manager names from IM IDs...")
    fix_im_names_query = """
        UPDATE clients_local c1
        SET assigned_inbox_manager_name = (
            SELECT c2.assigned_inbox_manager_name
            FROM clients_local c2
            WHERE c2.assigned_inbox_manager_id = c1.assigned_inbox_manager_id
              AND c2.assigned_inbox_manager_name IS NOT NULL
              AND c2.assigned_inbox_manager_name != ''
            LIMIT 1
        )
        WHERE c1.assigned_inbox_manager_id IS NOT NULL
          AND (c1.assigned_inbox_manager_name IS NULL OR c1.assigned_inbox_manager_name = '')
    """
    fixed_im_count = local_db.execute_write(fix_im_names_query)
    if fixed_im_count > 0:
        logger.info(f"Fixed {fixed_im_count} missing Inbox Manager names")


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
    # Calculate days in period for pro-rated target calculations
    start_dt = datetime.strptime(start_date, '%Y-%m-%d').date()
    end_dt = datetime.strptime(end_date, '%Y-%m-%d').date()
    days_in_period = (end_dt - start_dt).days + 1
    logger.info(f"Date range: {start_date} to {end_date} ({days_in_period} days)")

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
    
    # Return days_in_period for pro-rated target calculations
    return days_in_period


def compute_dashboard_dataset(local_db: LocalDatabase, days_in_period: int):
    """Build final dashboard dataset with all metrics, flags, and RAG status"""
    logger.info("Computing dashboard dataset...")

    # Clear old dashboard data
    local_db.execute_write("DELETE FROM client_health_dashboard_v1_local")

    # Compute dashboard dataset with hybrid RAG voting system
    dashboard_query = """
        WITH metric_rags AS (
            SELECT
                c.client_id,
                c.client_code,
                c.client_name,
                c.client_company_name,
                c.relationship_status,
                c.assigned_account_manager_name,
                c.assigned_inbox_manager_name,
                c.assigned_sdr_name,
                c.weekly_target_int,
                c.weekly_target_missing,
                c.closelix,
                c.bonus_pool_monthly,
                COALESCE(r.contacted_7d, 0) as contacted_7d,
                COALESCE(r.replies_7d, 0) as replies_7d,
                COALESCE(r.positives_7d, 0) as positives_7d,
                COALESCE(r.bounces_7d, 0) as bounces_7d,
                r.reply_rate_7d, r.positive_reply_rate_7d, r.bounce_pct_7d,
                COALESCE(r.new_leads_reached_7d, 0) as new_leads_reached_7d,
                -- Calculate pro-rated target based on days in reporting period
                CASE
                    WHEN c.weekly_target_int IS NOT NULL AND c.weekly_target_int > 0 THEN
                        ROUND(c.weekly_target_int::numeric * %s / 7.0, 2)
                    ELSE NULL
                END as prorated_target,
                -- Volume attainment using pro-rated target
                CASE
                    WHEN c.weekly_target_int IS NOT NULL AND c.weekly_target_int > 0 THEN
                        ROUND(COALESCE(r.new_leads_reached_7d, 0)::numeric / (c.weekly_target_int::numeric * %s / 7.0), 4)
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
                        AND COALESCE(r.new_leads_reached_7d, 0)::numeric / (c.weekly_target_int::numeric * %s / 7.0) < 0.8 THEN TRUE
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
                r.most_recent_reporting_end_date,
                -- Individual RAG calculations for each metric
                -- Reply Rate RAG
                CASE
                    WHEN r.reply_rate_7d IS NULL THEN NULL
                    WHEN r.reply_rate_7d < 0.015 THEN 'Red'
                    WHEN r.reply_rate_7d < 0.02 THEN 'Amber'
                    ELSE 'Green'
                END as rr_rag,
                -- Positive Reply Rate RAG (calculated as positives/replies)
                CASE
                    WHEN r.replies_7d IS NULL OR r.replies_7d = 0 THEN NULL
                    WHEN r.positives_7d IS NULL OR r.positives_7d = 0 THEN
                        CASE WHEN r.reply_rate_7d >= 0.02 THEN 'Red' ELSE NULL END
                    WHEN (r.positives_7d::numeric / r.replies_7d) < 0.05 THEN 'Red'
                    WHEN (r.positives_7d::numeric / r.replies_7d) < 0.08 THEN 'Amber'
                    ELSE 'Green'
                END as prr_rag,
                -- PCPL RAG
                CASE
                    WHEN r.positives_7d IS NULL OR r.positives_7d = 0 THEN NULL
                    WHEN COALESCE(r.new_leads_reached_7d, 0)::numeric / r.positives_7d > 800 THEN 'Red'
                    WHEN COALESCE(r.new_leads_reached_7d, 0)::numeric / r.positives_7d > 500 THEN 'Amber'
                    ELSE 'Green'
                END as pcpl_rag,
                -- Bounce Rate RAG
                CASE
                    WHEN r.bounce_pct_7d IS NULL THEN NULL
                    WHEN r.bounce_pct_7d >= 0.04 THEN 'Red'
                    WHEN r.bounce_pct_7d >= 0.02 THEN 'Amber'
                    ELSE 'Green'
                END as br_rag,
                -- Volume/Target RAG (using pro-rated target)
                CASE
                    WHEN c.weekly_target_int IS NULL OR c.weekly_target_int = 0 THEN NULL
                    WHEN COALESCE(r.new_leads_reached_7d, 0)::numeric / (c.weekly_target_int::numeric * %s / 7.0) < 0.5 THEN 'Red'
                    WHEN COALESCE(r.new_leads_reached_7d, 0)::numeric / (c.weekly_target_int::numeric * %s / 7.0) < 0.8 THEN 'Amber'
                    ELSE 'Green'
                END as volume_rag
            FROM active_clients_v1 c
            LEFT JOIN client_7d_rollup_v1_local r USING (client_id)
        )
        INSERT INTO client_health_dashboard_v1_local (
            client_id, client_code, client_name, client_company_name,
            relationship_status, assigned_account_manager_name,
            assigned_inbox_manager_name, assigned_sdr_name,
            weekly_target_int, weekly_target_missing, closelix,
            bonus_pool_monthly,
            contacted_7d, replies_7d, positives_7d, bounces_7d,
            reply_rate_7d, positive_reply_rate_7d, bounce_pct_7d,
            new_leads_reached_7d,
            prorated_target,
            volume_attainment, pcpl_proxy_7d,
            deliverability_flag, volume_flag, mmf_flag,
            data_missing_flag, data_stale_flag,
            rag_status, rag_reason,
            most_recent_reporting_end_date
        )
        SELECT
            m.client_id, m.client_code, m.client_name, m.client_company_name,
            m.relationship_status, m.assigned_account_manager_name,
            m.assigned_inbox_manager_name, m.assigned_sdr_name,
            m.weekly_target_int, m.weekly_target_missing, m.closelix,
            m.bonus_pool_monthly,
            m.contacted_7d, m.replies_7d, m.positives_7d, m.bounces_7d,
            m.reply_rate_7d, m.positive_reply_rate_7d, m.bounce_pct_7d,
            m.new_leads_reached_7d,
            m.prorated_target,
            m.volume_attainment, m.pcpl_proxy_7d,
            m.deliverability_flag, m.volume_flag, m.mmf_flag,
            m.data_missing_flag, m.data_stale_flag,
            -- Hybrid RAG Status: Individual metric RAGs + Majority Voting with Critical Overrides
            CASE
                -- CRITICAL OVERRIDES: Any of these = Red regardless of votes
                WHEN m.contacted_7d = 0 THEN 'Red'
                WHEN m.reply_rate_7d < 0.015 OR m.bounce_pct_7d >= 0.04 THEN 'Red'
                WHEN m.weekly_target_int IS NOT NULL AND m.weekly_target_int > 0
                    AND (m.new_leads_reached_7d::numeric / (m.weekly_target_int::numeric * %s / 7.0)) < 0.5 THEN 'Red'
                
                -- Count votes from individual RAGs
                WHEN (
                    (CASE WHEN m.rr_rag = 'Red' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.prr_rag = 'Red' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.pcpl_rag = 'Red' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.br_rag = 'Red' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.volume_rag = 'Red' THEN 1 ELSE 0 END)
                ) >= 3 THEN 'Red'
                
                -- 2+ Red = Red
                WHEN (
                    (CASE WHEN m.rr_rag = 'Red' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.prr_rag = 'Red' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.pcpl_rag = 'Red' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.br_rag = 'Red' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.volume_rag = 'Red' THEN 1 ELSE 0 END)
                ) >= 2 AND (
                    (CASE WHEN m.rr_rag = 'Amber' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.prr_rag = 'Amber' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.pcpl_rag = 'Amber' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.br_rag = 'Amber' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.volume_rag = 'Amber' THEN 1 ELSE 0 END)
                ) >= 1 THEN 'Red'
                
                -- 3+ Amber = Amber
                WHEN (
                    (CASE WHEN m.rr_rag = 'Amber' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.prr_rag = 'Amber' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.pcpl_rag = 'Amber' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.br_rag = 'Amber' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.volume_rag = 'Amber' THEN 1 ELSE 0 END)
                ) >= 3 THEN 'Yellow'
                
                -- 4+ Green = Green
                WHEN (
                    (CASE WHEN m.rr_rag = 'Green' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.prr_rag = 'Green' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.pcpl_rag = 'Green' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.br_rag = 'Green' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.volume_rag = 'Green' THEN 1 ELSE 0 END)
                ) >= 4 THEN 'Green'
                
                -- 3 Green + 2 Amber = Amber
                WHEN (
                    (CASE WHEN m.rr_rag = 'Green' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.prr_rag = 'Green' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.pcpl_rag = 'Green' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.br_rag = 'Green' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.volume_rag = 'Green' THEN 1 ELSE 0 END)
                ) = 3 AND (
                    (CASE WHEN m.rr_rag = 'Amber' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.prr_rag = 'Amber' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.pcpl_rag = 'Amber' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.br_rag = 'Amber' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.volume_rag = 'Amber' THEN 1 ELSE 0 END)
                ) = 2 THEN 'Yellow'
                
                -- 3 Green + (1 Red OR 1 Amber) = Amber
                WHEN (
                    (CASE WHEN m.rr_rag = 'Green' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.prr_rag = 'Green' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.pcpl_rag = 'Green' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.br_rag = 'Green' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.volume_rag = 'Green' THEN 1 ELSE 0 END)
                ) = 3 AND (
                    (CASE WHEN m.rr_rag = 'Red' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.prr_rag = 'Red' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.pcpl_rag = 'Red' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.br_rag = 'Red' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.volume_rag = 'Red' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.rr_rag = 'Amber' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.prr_rag = 'Amber' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.pcpl_rag = 'Amber' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.br_rag = 'Amber' THEN 1 ELSE 0 END) +
                    (CASE WHEN m.volume_rag = 'Amber' THEN 1 ELSE 0 END)
                ) >= 1 THEN 'Yellow'
                
                -- Default conservative: Amber
                ELSE 'Yellow'
            END as rag_status,
            NULL as rag_reason,
            m.most_recent_reporting_end_date
        FROM metric_rags m
    """

    # Execute query with days_in_period parameter (used 5 times in the query)
    rowcount = local_db.execute_write(dashboard_query, (days_in_period, days_in_period, days_in_period, days_in_period, days_in_period, days_in_period))
    logger.info(f"Computed {rowcount} dashboard rows with pro-rated targets (period: {days_in_period} days)")

    # Update rag_reason based on hybrid voting system
    update_reasons_query = """
        UPDATE client_health_dashboard_v1_local
        SET rag_reason = CASE
            WHEN data_missing_flag THEN
                'Data missing: no contacted volume in last 7 days'
            WHEN reply_rate_7d < 0.015 THEN
                'Critical: reply rate is ' || ROUND((reply_rate_7d * 100)::numeric, 2) || '% (below 1.5%)'
            WHEN bounce_pct_7d >= 0.04 THEN
                'Critical: bounce rate is ' || ROUND((bounce_pct_7d * 100)::numeric, 2) || '% (4% or higher)'
            WHEN weekly_target_int IS NOT NULL AND weekly_target_int > 0
                AND volume_attainment < 0.5 THEN
                'Critical: volume attainment is ' || ROUND((volume_attainment * 100)::numeric, 1) || '% (below 50%)'
            WHEN reply_rate_7d IS NOT NULL AND reply_rate_7d < 0.02
                AND replies_7d > 0 AND positives_7d > 0
                AND (positives_7d::numeric / replies_7d) < 0.05 THEN
                'Multiple issues: reply rate ' || ROUND((reply_rate_7d * 100)::numeric, 2) || '%, positive rate ' || ROUND(((positives_7d::numeric / replies_7d) * 100)::numeric, 2) || '%'
            WHEN volume_flag AND deliverability_flag THEN
                'Multiple issues: volume and deliverability concerns'
            WHEN volume_flag THEN
                'Volume below target: attainment is ' || ROUND((volume_attainment * 100)::numeric, 1) || '%'
            WHEN deliverability_flag THEN
                CASE
                    WHEN reply_rate_7d < 0.02 THEN
                        'Deliverability risk: reply rate is ' || ROUND((reply_rate_7d * 100)::numeric, 2) || '%'
                    WHEN bounce_pct_7d >= 0.05 THEN
                        'Deliverability risk: bounce rate is ' || ROUND((bounce_pct_7d * 100)::numeric, 2) || '%'
                    ELSE 'Deliverability risk: check reply and bounce rates'
                END
            WHEN replies_7d > 0 AND positives_7d > 0
                AND (positives_7d::numeric / replies_7d) < 0.05 THEN
                'MMF risk: positive reply rate is ' || ROUND(((positives_7d::numeric / replies_7d) * 100)::numeric, 2) || '%'
            WHEN positives_7d > 0
                AND (new_leads_reached_7d::numeric / positives_7d) > 800 THEN
                'PCPL high: ' || ROUND((new_leads_reached_7d::numeric / positives_7d), 1) || ' leads per positive reply'
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
        days_in_period = compute_7d_rollups(local_db)
        compute_dashboard_dataset(local_db, days_in_period)

        # Fetch and update not contacted leads from SmartLead API
        # Only run during scheduled cron jobs, not on manual refresh
        if args.skip_smartlead:
            logger.info("Skipping SmartLead API call (manual refresh mode)")
            logger.info("Existing not_contacted_leads values will be preserved")
        else:
            logger.info("Starting SmartLead not contacted leads integration...")
            not_contacted_map = fetch_not_contacted_leads_from_smartlead()
            if not_contacted_map:
                update_not_contacted_leads(local_db, not_contacted_map)
            else:
                logger.warning("No not_contacted data fetched from SmartLead, all clients will show 0")

        track_unmatched_mappings(local_db)

        # Close connections
        clients_db.close()
        reporting_db.close()
        local_db.close()

        logger.info("=" * 60)
        if args.skip_smartlead:
            logger.info("Quick refresh completed successfully (SmartLead skipped)")
        else:
            logger.info("Full ingestion completed successfully (including SmartLead)")
        logger.info("=" * 60)

    except Exception as e:
        logger.error(f"Ingestion failed: {e}", exc_info=True)
        raise


if __name__ == '__main__':
    main()
