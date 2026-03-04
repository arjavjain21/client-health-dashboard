#!/usr/bin/env python3
"""Check what client_name values SmartLead campaigns actually have"""
import os
import sys
import requests
from collections import defaultdict

API_KEY = os.environ.get('SMARTLEAD_API_KEY', '2fbf4f7d-44af-4ff1-8e25-5655f5483fd0_94zyakr')
BASE_URL = "https://server.smartlead.ai/api/v1"

print("="*80)
print("SmartLead Campaign Client Name Analysis")
print("="*80)

# Fetch campaigns and clients
try:
    # Fetch campaigns
    print("\n1. Fetching campaigns...")
    response = requests.get(
        f"{BASE_URL}/campaigns",
        params={"api_key": API_KEY, "include_tags": "true"},
        timeout=30
    )
    response.raise_for_status()
    data = response.json()

    if isinstance(data, dict):
        all_campaigns = data.get('data', [])
    else:
        all_campaigns = data

    active_campaigns = [c for c in all_campaigns if c.get('status') == 'ACTIVE']

    print(f"   ✓ Fetched {len(active_campaigns)} active campaigns")

    # Fetch clients
    print("\n2. Fetching clients...")
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

    client_map = {c['id']: c.get('name', 'Unknown') for c in clients}
    print(f"   ✓ Fetched {len(clients)} clients")

    # Analyze client_name in campaigns
    print("\n3. Analyzing campaign client_name values...")

    client_name_counts = defaultdict(int)
    client_id_missing = 0

    for campaign in active_campaigns:
        client_name = campaign.get('client_name')
        client_id = campaign.get('client_id')

        if not client_name:
            # Try to get from client_map
            client_name = client_map.get(client_id, 'MISSING_CLIENT_ID')
            if client_name == 'MISSING_CLIENT_ID':
                client_id_missing += 1

        client_name_counts[client_name] += 1

    print(f"\n   Campaign client_name distribution (top 30):")
    print(f"   {'Client Name':<30} {'Campaign Count':>15}")
    print(f"   {'-'*30} {'-'*15}")

    sorted_names = sorted(client_name_counts.items(), key=lambda x: x[1], reverse=True)
    for name, count in sorted_names[:30]:
        print(f"   {name:<30} {count:>15}")

    if len(sorted_names) > 30:
        print(f"   ... and {len(sorted_names) - 30} more")

    print(f"\n   Campaigns with missing/invalid client_id: {client_id_missing}")

    # Check specific campaign from earlier test
    print("\n4. Checking specific campaign from earlier test...")
    test_campaign = next((c for c in active_campaigns if c['id'] == 2920435), None)
    if test_campaign:
        print(f"   Campaign: {test_campaign.get('name')}")
        print(f"   client_id: {test_campaign.get('client_id')}")
        print(f"   client_name (from campaign): '{test_campaign.get('client_name')}'")
        print(f"   client_name (from client_map): '{client_map.get(test_campaign.get('client_id'), 'NOT_FOUND')}'")

    print("\n" + "="*80)

except Exception as e:
    print(f"\n✗ Error: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
