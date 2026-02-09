#!/usr/bin/env python3
"""Quick script to update not_contacted_leads without full reingest"""

import os
import sys
from dotenv import load_dotenv
from ingest_main import fetch_not_contacted_leads_from_smartlead, update_not_contacted_leads, LocalDatabase

def main():
    load_dotenv()

    # Build connection URL
    conn_url = f"postgresql://{os.getenv('LOCAL_DB_USER', 'ubuntu')}:{os.getenv('LOCAL_DB_PASSWORD', 'temp12345')}@{os.getenv('LOCAL_DB_HOST', 'localhost')}:{os.getenv('LOCAL_DB_PORT', 5432)}/{os.getenv('LOCAL_DB_NAME', 'client_health_dashboard_v1')}"

    print('Connecting to local database...')
    local_db = LocalDatabase(conn_url)

    try:
        print('Fetching not contacted leads from SmartLead API...')
        not_contacted_map = fetch_not_contacted_leads_from_smartlead()
        print(f'Fetched data for {len(not_contacted_map)} clients')

        print('Updating dashboard with not_contacted_leads...')
        update_not_contacted_leads(local_db, not_contacted_map)
        print('Successfully updated not_contacted_leads')

        # Verify
        result = local_db.execute_read("""
            SELECT COUNT(*) as total,
                   SUM(CASE WHEN not_contacted_leads > 0 THEN 1 ELSE 0 END) as with_values,
                   AVG(not_contacted_leads) as avg_value
            FROM client_health_dashboard_v1_local
        """)
        if result:
            total, with_vals, avg_val = result[0]
            print(f'\nVerification:')
            print(f'  Total clients: {total}')
            print(f'  Clients with not_contacted > 0: {with_vals}')
            print(f'  Average not_contacted: {avg_val:.2f}')

    finally:
        local_db.close()

if __name__ == '__main__':
    main()
