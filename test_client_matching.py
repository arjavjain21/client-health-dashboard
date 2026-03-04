#!/usr/bin/env python3
"""Test script to check client name matching between dashboard and SmartLead"""
import os
import sys
import psycopg2
import requests

# Dashboard connection
DB_URL = "postgresql://ubuntu:temp12345@localhost:5432/client_health_dashboard_v1"

# SmartLead API
API_KEY = os.environ.get('SMARTLEAD_API_KEY', '2fbf4f7d-44af-4ff1-8e25-5655f5483fd0_94zyakr')
BASE_URL = "https://server.smartlead.ai/api/v1"

def normalize_client_name(name):
    """Normalize client name for matching (from ingest_main.py)"""
    if not name:
        return ""
    return name.strip().upper()

print("="*80)
print("Client Name Matching Analysis")
print("="*80)

# 1. Get dashboard clients
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

    # Show sample
    print("\n   Sample dashboard clients:")
    for i, (client_id, client_code, client_name) in enumerate(dashboard_clients[:10]):
        normalized_name = normalize_client_name(client_name)
        normalized_code = normalize_client_name(client_code)
        print(f"     {client_code}: name='{client_name}' -> normalized='{normalized_name}', code='{normalized_code}'")

    cur.close()
    conn.close()

except Exception as e:
    print(f"   ✗ Error: {e}")
    sys.exit(1)

# 2. Get SmartLead clients
print("\n2. Fetching SmartLead clients...")
try:
    response = requests.get(
        f"{BASE_URL}/client/",
        params={"api_key": API_KEY},
        timeout=30
    )
    response.raise_for_status()
    data = response.json()

    if isinstance(data, dict):
        clients = data.get('data', [])
    else:
        clients = data

    print(f"   ✓ Fetched {len(clients)} SmartLead clients")

    # Create normalized map
    smartlead_map = {}
    for client in clients:
        client_id = client['id']
        name = client.get('name', 'Unknown')
        normalized = normalize_client_name(name)
        smartlead_map[normalized] = {
            'id': client_id,
            'name': name,
            'email': client.get('email', 'N/A')
        }

    # Show sample
    print("\n   Sample SmartLead clients:")
    for i, (norm_name, client_info) in enumerate(list(smartlead_map.items())[:10]):
        print(f"     {client_info['id']}: name='{client_info['name']}' -> normalized='{norm_name}'")

except Exception as e:
    print(f"   ✗ Error: {e}")
    smartlead_map = {}

# 3. Check matching
print("\n3. Checking matches...")
matched = 0
unmatched = []

for client_id, client_code, client_name in dashboard_clients:
    normalized_name = normalize_client_name(client_name)
    normalized_code = normalize_client_name(client_code)

    # Try to match
    if normalized_name in smartlead_map:
        matched += 1
    elif normalized_code in smartlead_map:
        matched += 1
    else:
        unmatched.append({
            'code': client_code,
            'name': client_name,
            'norm_name': normalized_name,
            'norm_code': normalized_code
        })

print(f"\n   Matched: {matched}/{len(dashboard_clients)} clients")
print(f"   Unmatched: {len(unmatched)}/{len(dashboard_clients)} clients")

if unmatched:
    print("\n   First 20 unmatched dashboard clients:")
    for i, client in enumerate(unmatched[:20]):
        print(f"     {client['code']}: name='{client['name']}' (norm='{client['norm_name']}', code='{client['norm_code']}')")

print("\n" + "="*80)
