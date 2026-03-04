#!/usr/bin/env python3
"""Test matching between SmartLead data and dashboard"""
import os
import sys
import psycopg2

# Dashboard connection
DB_URL = "postgresql://ubuntu:temp12345@localhost:5432/client_health_dashboard_v1"

def normalize_client_name(name):
    """Normalize client name for matching (from ingest_main.py)"""
    if not name:
        return ''
    return name.strip().lower()

print("="*80)
print("Testing SmartLead-to-Dashboard Matching")
print("="*80)

# Simulated SmartLead data (from our test run)
smartlead_data = {
    'fd': 4995,
    'qda': 602,
    'alm': 3542,
    'prs': 7,
    'rdig': 2422,
    'msp': 1375,
    'eca': 312,
    'hyperke': 0,
    'sem': 329
}

print(f"\nSmartLead data ({len(smartlead_data)} clients):")
for client, count in sorted(smartlead_data.items()):
    print(f"  {client}: {count}")

# Get dashboard clients
print("\n1. Fetching dashboard clients...")
try:
    conn = psycopg2.connect(DB_URL)
    cur = conn.cursor()

    cur.execute("""
        SELECT client_id, client_code, client_name
        FROM client_health_dashboard_v1_local
        ORDER BY client_code
    """)

    dashboard_clients = cur.fetchall()
    print(f"   ✓ Fetched {len(dashboard_clients)} dashboard clients")

    cur.close()
    conn.close()

except Exception as e:
    print(f"   ✗ Error: {e}")
    sys.exit(1)

# Test matching
print("\n2. Testing matching logic...")
matched = {}
unmatched = []

for client_id, client_code, client_name in dashboard_clients:
    normalized_name = normalize_client_name(client_name)
    normalized_code = normalize_client_name(client_code)

    # Try to match (same logic as update_not_contacted_leads)
    not_contacted = smartlead_data.get(normalized_name)
    if not_contacted is None:
        not_contacted = smartlead_data.get(normalized_code)

    if not_contacted is not None:
        matched[client_code] = {
            'name': client_name,
            'norm_name': normalized_name,
            'norm_code': normalized_code,
            'matched_on': 'name' if smartlead_data.get(normalized_name) is not None else 'code',
            'value': not_contacted
        }
    else:
        unmatched.append({
            'code': client_code,
            'name': client_name,
            'norm_name': normalized_name,
            'norm_code': normalized_code
        })

print(f"\n   Matched: {len(matched)}/{len(dashboard_clients)} clients")
print(f"   Unmatched: {len(unmatched)}/{len(dashboard_clients)} clients")

if matched:
    print(f"\n   Matched clients with values:")
    for code, info in sorted(matched.items()):
        print(f"     {code}: name='{info['name']}' ({info['matched_on']}) -> {info['value']} not_contacted")

if unmatched:
    print(f"\n   First 10 unmatched clients:")
    for client in unmatched[:10]:
        print(f"     {client['code']}: name='{client['name']}' (norm_name='{client['norm_name']}', norm_code='{client['norm_code']}')")

print("\n" + "="*80)
