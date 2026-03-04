#!/usr/bin/env python3
"""Quick sync: Just clients + dashboard computation"""
import sys
sys.path.insert(0, '/home/ubuntu/client-health-dashboard')

from ingest.ingest_main import (
    get_read_only_connection,
    LocalDatabase,
    ingest_clients,
    compute_7d_rollups,
    compute_dashboard_dataset
)

def main():
    print("Starting quick sync...")

    # Initialize connections
    clients_db = get_read_only_connection('clients')
    reporting_db = get_read_only_connection('reporting')
    local_db = LocalDatabase()

    try:
        # 1. Sync clients (includes monthly_booking_goal)
        print("\n1. Syncing clients from Supabase...")
        ingest_clients(clients_db, local_db)
        print("✓ Clients synced")

        # 2. Compute 7-day rollups
        print("\n2. Computing 7-day rollups...")
        days_in_period = compute_7d_rollups(local_db)
        print("✓ Rollups computed")

        # 3. Compute dashboard dataset
        print("\n3. Computing dashboard dataset...")
        compute_dashboard_dataset(local_db, days_in_period)
        print("✓ Dashboard computed")

        print("\n✅ Quick sync completed successfully!")
        print("Dashboard is ready with monthly_booking_goal data.")

    finally:
        clients_db.close()
        reporting_db.close()
        local_db.close()

if __name__ == "__main__":
    main()
