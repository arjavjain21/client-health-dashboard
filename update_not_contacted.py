#!/usr/bin/env python3
"""
Quick script to fetch not_contacted_leads from SmartLead and update database
"""
import sys
import os
from datetime import datetime

# Add ingest directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'ingest'))

from database import LocalDatabase
from ingest_main import fetch_not_contacted_leads_from_smartlead, update_not_contacted_leads

def main():
    print("="*80)
    print("Not Contacted Leads Update - Started")
    print(f"Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("="*80)

    # Load environment variables
    local_db_url = os.getenv('LOCAL_DB_URL', 'postgresql://ubuntu:temp12345@localhost:5432/client_health_dashboard_v1')

    try:
        # Connect to local database
        print("\n1. Connecting to local database...")
        local_db = LocalDatabase(local_db_url)
        local_db.connect()
        print("   ✓ Connected")

        # Fetch not contacted leads from SmartLead API
        print("\n2. Fetching not contacted leads from SmartLead API...")
        print("   (This may take 10-15 minutes for 450 campaigns...)")
        not_contacted_map = fetch_not_contacted_leads_from_smartlead()

        if not not_contacted_map:
            print("   ✗ No data returned from SmartLead API")
            print("   All clients will show 0 for not_contacted_leads")
            return 1

        print(f"   ✓ Fetched data for {len(not_contacted_map)} clients")

        # Update database
        print("\n3. Updating database...")
        update_not_contacted_leads(local_db, not_contacted_map)
        print("   ✓ Database updated")

        # Close connection
        local_db.close()

        print("\n" + "="*80)
        print("Not Contacted Leads Update - Completed Successfully")
        print(f"Completed at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("="*80)

        return 0

    except Exception as e:
        print(f"\n✗ ERROR: {e}")
        import traceback
        traceback.print_exc()
        return 1

if __name__ == '__main__':
    sys.exit(main())
