#!/usr/bin/env python3
"""Test script to verify RAG status distribution"""
import sys
import os
sys.path.insert(0, 'ingest')
from database import LocalDatabase
from dotenv import load_dotenv

load_dotenv()

# Get connection URL from environment
conn_url = os.getenv('LOCAL_DB_URL')
if not conn_url:
    print("ERROR: LOCAL_DB_URL not set")
    sys.exit(1)

db = LocalDatabase(conn_url)
db.connect()

# Check RAG distribution
results = db.execute_read("""
    SELECT rag_status, COUNT(*) as count 
    FROM client_health_dashboard_v1_local 
    WHERE relationship_status = 'ACTIVE' 
    GROUP BY rag_status 
    ORDER BY rag_status
""")
print('=' * 60)
print('RAG Status Distribution (Active Clients):')
print('=' * 60)
for row in results:
    print(f'  {row[0]}: {row[1]}')

# Sample Red/Yellow clients with metrics
results = db.execute_read("""
    SELECT 
        client_code, 
        rag_status, 
        rag_reason,
        ROUND((reply_rate_7d * 100)::numeric, 2) as rr_pct,
        ROUND((bounce_pct_7d * 100)::numeric, 2) as br_pct,
        ROUND(COALESCE(volume_attainment::numeric * 100, 0), 1) as vol_pct
    FROM client_health_dashboard_v1_local 
    WHERE relationship_status = 'ACTIVE' AND rag_status IN ('Red', 'Yellow')
    ORDER BY rag_status, client_code 
    LIMIT 10
""")
print('\n' + '=' * 60)
print('Sample Red/Yellow Clients:')
print('=' * 60)
for row in results:
    rr = row[3] if row[3] is not None else 'N/A'
    br = row[4] if row[4] is not None else 'N/A'
    vol = row[5] if row[5] is not None else 'N/A'
    reason = row[2][:60] if row[2] else "No reason"
    print(f'  {row[0]}: {row[1]} | RR:{rr}% BR:{br}% Vol:{vol}% | {reason}')

# Check a few Green clients
results = db.execute_read("""
    SELECT 
        client_code, 
        rag_status, 
        rag_reason
    FROM client_health_dashboard_v1_local 
    WHERE relationship_status = 'ACTIVE' AND rag_status = 'Green'
    ORDER BY client_code 
    LIMIT 5
""")
print('\n' + '=' * 60)
print('Sample Green Clients:')
print('=' * 60)
for row in results:
    reason = row[2][:60] if row[2] else "No reason"
    print(f'  {row[0]}: {row[1]} - {reason}')

# Check for inconsistencies: Green status but critical volume
results = db.execute_read("""
    SELECT 
        client_code, 
        rag_status,
        weekly_target_int,
        new_leads_reached_7d,
        ROUND(COALESCE(volume_attainment::numeric * 100, 0), 1) as vol_pct,
        rag_reason
    FROM client_health_dashboard_v1_local 
    WHERE relationship_status = 'ACTIVE' 
        AND rag_status = 'Green'
        AND weekly_target_int IS NOT NULL 
        AND weekly_target_int > 0
        AND (new_leads_reached_7d::numeric / weekly_target_int) < 0.5
    ORDER BY client_code
""")
if results:
    print('\n' + '=' * 60)
    print('⚠️  INCONSISTENCY: Green clients with volume < 50%:')
    print('=' * 60)
    for row in results:
        print(f'  {row[0]}: Vol={row[4]}% | {row[5]}')

# Verify pro-rated target calculations
results = db.execute_read("""
    SELECT 
        client_code,
        weekly_target_int,
        new_leads_reached_7d,
        ROUND(volume_attainment::numeric * 100, 1) as attainment_pct,
        ROUND(weekly_target_int::numeric * 5.0 / 7.0, 0) as expected_prorated_target,
        ROUND(new_leads_reached_7d::numeric / (weekly_target_int::numeric * 5.0 / 7.0) * 100, 1) as expected_attainment
    FROM client_health_dashboard_v1_local 
    WHERE relationship_status = 'ACTIVE' 
        AND weekly_target_int IS NOT NULL 
        AND weekly_target_int > 0
        AND new_leads_reached_7d > 0
    ORDER BY weekly_target_int DESC
    LIMIT 5
""")

print('\n' + '=' * 80)
print('Pro-Rated Target Verification (5-day period = 71.43% of weekly target)')
print('=' * 80)
for row in results:
    client, weekly, leads, actual_att, expected_target, expected_att = row
    match = "✓" if abs(actual_att - expected_att) < 0.1 else "✗"
    print(f"  {client}: Weekly={weekly}, Leads={leads}, Attainment={actual_att}% (Expected={expected_att}%) {match}")

db.close()
