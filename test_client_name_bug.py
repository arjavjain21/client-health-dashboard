#!/usr/bin/env python3
"""Test to verify the client_name bug"""
import os
import sys
import requests

API_KEY = os.environ.get('SMARTLEAD_API_KEY', '2fbf4f7d-44af-4ff1-8e25-5655f5483fd0_94zyakr')
BASE_URL = "https://server.smartlead.ai/api/v1"

print("="*80)
print("Testing Client Name Bug")
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

    # Test the bug
    print("\n3. Testing CURRENT (buggy) logic:")
    print("   Logic: client_name = campaign.get('client_name') or client_info.get('name', 'Unknown')")

    current_logic_names = set()
    for campaign in active_campaigns[:50]:  # Test first 50
        client_id = campaign.get('client_id')
        client_info = {'name': client_map.get(client_id, 'Unknown')}

        # CURRENT (buggy) logic
        client_name = campaign.get('client_name') or client_info.get('name', 'Unknown')
        current_logic_names.add(client_name)

    print(f"   Unique client names (first 50 campaigns): {sorted(current_logic_names)}")

    # Test the fix
    print("\n4. Testing PROPOSED FIX:")
    print("   Logic: client_name = campaign.get('client_name') or client_info.get('name') if campaign.get('client_name') in [None, ''] else client_info.get('name')")

    fixed_logic_names = set()
    for campaign in active_campaigns[:50]:
        client_id = campaign.get('client_id')
        client_info = {'name': client_map.get(client_id, 'Unknown')}

        # PROPOSED FIX logic
        campaign_client_name = campaign.get('client_name')
        if campaign_client_name in [None, '']:
            client_name = client_info.get('name', 'Unknown')
        else:
            client_name = campaign_client_name
        fixed_logic_names.add(client_name)

    print(f"   Unique client names (first 50 campaigns): {sorted(fixed_logic_names)}")

    # Compare
    print("\n5. Comparison:")
    print(f"   Current logic has 'None': {('None' in current_logic_names)}")
    print(f"   Fixed logic has 'None': {('None' in fixed_logic_names)}")
    print(f"   Current logic has actual client names: {len([n for n in current_logic_names if n not in ['None', 'Unknown', '']])}")
    print(f"   Fixed logic has actual client names: {len([n for n in fixed_logic_names if n not in ['None', 'Unknown', '']])}")

    print("\n" + "="*80)

except Exception as e:
    print(f"\n✗ Error: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
