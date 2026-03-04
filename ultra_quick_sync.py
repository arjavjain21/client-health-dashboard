#!/usr/bin/env python3
"""Ultra-quick sync: clients + dashboard only (no campaigns)"""
import os
import sys

# Set up Django-like environment for the ingest script
os.chdir('/home/ubuntu/client-health-dashboard')

# Import after changing directory
from ingest.database import ReadOnlyConnection, LocalDatabase
from ingest.ingest_main import ingest_clients, compute_7d_rollups, compute_dashboard_dataset

def get_read_only_connection(db_name):
    """Get read-only connection to Supabase database"""
    if db_name == 'clients':
        return ReadOnlyConnection(
            host=os.getenv('SUPABASE_DB_HOST'),
            port=5432,
            database='postgres',
            user='postgres',
            password=os.getenv('READ_ONLY_DB_PASSWORD')
        )
    elif db_name == 'reporting':
        return ReadOnlyConnection(
            host=os.getenv('SUPABASE_DB_HOST'),
            port=5432,
            database='postgres',
            user='postgres',
            password=os.getenv('READ_ONLY_DB_PASSWORD')
        )

def main():
    print("=" * 60)
    print("ULTRA-QUICK SYNC: Clients + Dashboard Only")
    print("=" * 60)
    print("(Skipping campaign ingestion to save time)")
    print()

    # Initialize connections
    print("1. Connecting to databases...")
    clients_db = get_read_only_connection('clients')
    local_db = LocalDatabase()
    print("   ✓ Connected")
    print()

    try:
        # 1. Sync clients only
        print("2. Syncing clients from Supabase (includes monthly_booking_goal)...")
        ingest_clients(clients_db, local_db)
        print()

        # 2. Compute rollups
        print("3. Computing 7-day rollups...")
        days_in_period = compute_7d_rollups(local_db)
        print()

        # 3. Compute dashboard
        print("4. Computing dashboard dataset...")
        compute_dashboard_dataset(local_db, days_in_period)
        print()

        print("=" * 60)
        print("✅ ULTRA-QUICK SYNC COMPLETED!")
        print("=" * 60)
        print()
        print("Dashboard now has monthly_booking_goal data available.")
        print("Refresh your browser to see the new column.")

    finally:
        clients_db.close()
        local_db.close()

if __name__ == "__main__":
    main()
