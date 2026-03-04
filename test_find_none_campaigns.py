#!/usr/bin/env python3
"""Find campaigns with 'None' as client_name"""
import os
import sys
import requests

API_KEY = os.environ.get('SMARTLEAD_API_KEY', '2fbf4f7d-44af-4ff1-8e25-5655f5483fd0_94zyakr')
BASE_URL = "https://server.smartlead.ai/api/v1"

print("="*80)
print("Finding Campaigns with 'None' client_name")
print("="*80)

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

    # Find campaigns with 'None' client_name
    print("\n3. Finding campaigns with 'None' or empty client_name...")
    none_campaigns = []
    for campaign in active_campaigns:
        client_name = campaign.get('client_name')
        if client_name in [None, '', 'None']:
            none_campaigns.append({
                'id': campaign['id'],
                'name': campaign.get('name', 'Unknown'),
                'client_id': campaign.get('client_id'),
                'client_name': client_name,
                'client_name_from_map': client_map.get(campaign.get('client_id'), 'NOT_FOUND')
            })

    print(f"   Found {len(none_campaigns)} campaigns with 'None'/empty client_name")
    print(f"   Percentage: {len(none_campaigns)/len(active_campaigns)*100:.1f}%")

    if none_campaigns:
        print("\n   First 20 campaigns with 'None'/empty client_name:")
        print(f"   {'Campaign ID':<12} {'Client ID':<12} {'client_name (obj)':<20} {'client_name (map)':<20} {'Campaign Name'}")
        print("   " + "-"*100)
        for c in none_campaigns[:20]:
            print(f"   {c['id']:<12} {c['client_id']:<12} {repr(c['client_name']):<20} {c['client_name_from_map']:<20} {c['name'][:40]}")

    print("\n" + "="*80)

except Exception as e:
    print(f"\n✗ Error: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
