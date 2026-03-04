#!/usr/bin/env python3
"""Quick test to check what SmartLead API returns for not contacted leads"""
import os
import sys
import requests

# Test with one campaign to see what data structure looks like
API_KEY = os.environ.get('SMARTLEAD_API_KEY', '2fbf4f7d-44af-4ff1-8e25-5655f5483fd0_94zyakr')
BASE_URL = "https://server.smartlead.ai/api/v1"

print("Testing SmartLead API...")
print(f"API Key: {API_KEY[:20]}...")

# Fetch active campaigns
try:
    response = requests.get(
        f"{BASE_URL}/campaigns",
        params={"api_key": API_KEY},
        timeout=30
    )
    response.raise_for_status()
    data = response.json()

    # Handle both list and dict responses
    if isinstance(data, dict):
        campaigns = data.get('data', [])
    else:
        campaigns = data

    active_campaigns = [c for c in campaigns if c.get('status') == 'ACTIVE']

    print(f"\n✓ Fetched {len(active_campaigns)} active campaigns")

    if active_campaigns:
        # Test with first campaign
        first_campaign = active_campaigns[0]
        campaign_id = first_campaign['id']
        campaign_name = first_campaign.get('name', 'Unknown')
        client_name = first_campaign.get('client_name', 'Unknown')

        print(f"\nTesting with campaign: {campaign_name}")
        print(f"  Campaign ID: {campaign_id}")
        print(f"  Client: {client_name}")

        # Fetch leads for this campaign
        response = requests.get(
            f"{BASE_URL}/campaigns/{campaign_id}/leads",
            params={
                "api_key": API_KEY,
                "limit": 100,
                "offset": 0
            },
            timeout=30
        )
        response.raise_for_status()
        leads_data = response.json()

        leads = leads_data.get('data', [])
        total_leads = leads_data.get('total_leads', 0)

        print(f"\n  Total leads in campaign: {total_leads}")
        print(f"  Leads fetched in first batch: {len(leads)}")

        # Count by status
        status_counts = {}
        for lead in leads:
            status = lead.get('status', 'UNKNOWN').upper()
            status_counts[status] = status_counts.get(status, 0) + 1

        print(f"\n  Lead status breakdown:")
        for status, count in sorted(status_counts.items()):
            print(f"    {status}: {count}")

        print(f"\n  NOT_CONTACTED (STARTED): {status_counts.get('STARTED', 0)}")

    else:
        print("\n✗ No active campaigns found!")

except Exception as e:
    print(f"\n✗ Error: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
