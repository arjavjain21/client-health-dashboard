#!/usr/bin/env python3
"""Quick sync monthly_booking_goal only"""
import psycopg2
from psycopg2.extras import RealDictCursor
import os

# Connection parameters
SUPABASE_HOST = os.getenv('SUPABASE_DB_HOST')
LOCAL_DB = "client_health_dashboard_v1"
READ_ONLY_PASSWORD = os.getenv('READ_ONLY_DB_PASSWORD')

def main():
    print("Quick sync: Fetching monthly_booking_goal from Supabase...")

    # Connect to Supabase (READ-ONLY)
    supabase_conn = psycopg2.connect(
        host=SUPABASE_HOST,
        port=5432,
        database='postgres',
        user='postgres',
        password=READ_ONLY_PASSWORD,
        cursor_factory=RealDictCursor
    )

    # Connect to local database
    local_conn = psycopg2.connect(
        host='/var/run/postgresql',
        database=LOCAL_DB,
        user='ubuntu'
    )

    try:
        # Fetch monthly_booking_goal from Supabase
        supabase_cur = supabase_conn.cursor()
        supabase_cur.execute("""
            SELECT client_id, monthly_booking_goal
            FROM public.clients
            WHERE monthly_booking_goal IS NOT NULL
        """)

        rows = supabase_cur.fetchall()
        print(f"Fetched {len(rows)} clients with monthly_booking_goal")

        # Update local database
        local_cur = local_conn.cursor()

        for row in rows:
            local_cur.execute("""
                UPDATE clients_local
                SET monthly_booking_goal = %s
                WHERE client_id = %s
            """, (row['monthly_booking_goal'], row['client_id']))

        local_conn.commit()
        print(f"✓ Updated {len(rows)} clients with monthly_booking_goal")

        # Verify
        local_cur.execute("""
            SELECT COUNT(*) as total,
                   COUNT(monthly_booking_goal) as with_goal
            FROM clients_local
        """)
        result = local_cur.fetchone()
        print(f"\nVerification:")
        print(f"  Total clients: {result[0]}")
        print(f"  With monthly_booking_goal: {result[1]}")

        print("\n✅ Quick sync completed!")
        print("Now restart PM2 to apply changes...")

    finally:
        supabase_conn.close()
        local_conn.close()

if __name__ == "__main__":
    main()
