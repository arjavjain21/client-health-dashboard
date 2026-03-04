#!/usr/bin/env python3
"""Debug version of consolidate_leads_by_client.py with extra logging"""
import os
import sys
import time
from datetime import datetime
from typing import List, Dict, Optional
from dataclasses import dataclass, field
from concurrent.futures import ThreadPoolExecutor, as_completed, TimeoutError as FutureTimeoutError

try:
    import requests
    from requests.adapters import HTTPAdapter
    from urllib3.util.retry import Retry
except ImportError:
    print("ERROR: 'requests' library not installed.")
    sys.exit(1)

# Configuration
API_KEY = os.environ.get('SMARTLEAD_API_KEY', '2fbf4f7d-44af-4ff1-8e25-5655f5483fd0_94zyakr')
BASE_URL = "https://server.smartlead.ai/api/v1"
MAX_WORKERS = 10
BATCH_SIZE = 100
REQUEST_TIMEOUT = 30
MAX_RETRIES = 3
RETRY_BACKOFF = 1.0

# Data models
@dataclass
class ClientSummary:
    client_name: str
    total_leads: int = 0
    not_contacted: int = 0
    campaign_count: int = 0

@dataclass
class LeadCounts:
    total_leads: int = 0
    started: int = 0
    inprogress: int = 0
    completed: int = 0
    paused: int = 0
    stopped: int = 0
    blocked: int = 0

    @property
    def not_yet_contacted(self) -> int:
        return self.started

@dataclass
class CampaignData:
    campaign_id: int
    campaign_name: str
    client_name: str
    lead_counts: LeadCounts
    error: Optional[str] = None

def create_session():
    session = requests.Session()
    retry_strategy = Retry(
        total=MAX_RETRIES,
        backoff_factor=RETRY_BACKOFF,
        status_forcelist=[429, 500, 502, 503, 504],
        allowed_methods=["GET", "POST"]
    )
    adapter = HTTPAdapter(max_retries=retry_strategy)
    session.mount("http://", adapter)
    session.mount("https://", adapter)
    return session

def make_api_request(session, endpoint, params=None, method="GET"):
    url = f"{BASE_URL}{endpoint}"
    if params is None:
        params = {}
    params['api_key'] = API_KEY

    try:
        response = session.request(method=method, url=url, params=params, timeout=REQUEST_TIMEOUT)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"⚠ API error for {endpoint}: {e}")
        return None

def fetch_active_campaigns(session):
    print("Fetching campaigns...")
    campaigns = make_api_request(session, "/campaigns", params={"include_tags": "true"})
    if campaigns is None:
        return []
    if isinstance(campaigns, list):
        campaign_list = campaigns
    elif isinstance(campaigns, dict) and 'data' in campaigns:
        campaign_list = campaigns['data']
    else:
        return []
    active_campaigns = [c for c in campaign_list if c.get('status') == 'ACTIVE']
    print(f"✓ Fetched {len(active_campaigns)} active campaigns")
    return active_campaigns

def fetch_all_clients(session):
    print("Fetching clients...")
    clients = make_api_request(session, "/client/")
    if clients is None:
        return {}
    if isinstance(clients, list):
        client_list = clients
    elif isinstance(clients, dict) and 'data' in clients:
        client_list = clients['data']
    else:
        return {}
    client_map = {
        client['id']: {
            'name': client.get('name', 'Unknown'),
            'email': client.get('email', 'N/A')
        }
        for client in client_list
    }
    print(f"✓ Fetched {len(client_map)} clients")
    return client_map

def fetch_campaign_leads_paginated(session, campaign_id, status_filter=None):
    all_leads = []
    offset = 0
    params = {'limit': BATCH_SIZE, 'offset': offset}
    if status_filter:
        params['status'] = status_filter

    while True:
        params['offset'] = offset
        response = make_api_request(session, f"/campaigns/{campaign_id}/leads", params=params)
        if response is None:
            break
        leads = response.get('data', [])
        total_leads = int(response.get('total_leads', 0)) if response.get('total_leads') else 0
        if not leads:
            break
        all_leads.extend(leads)
        if len(all_leads) >= total_leads or len(leads) < BATCH_SIZE:
            break
        offset += BATCH_SIZE
        time.sleep(0.1)
    return all_leads

def count_leads_by_status(session, campaign_id):
    all_leads = fetch_campaign_leads_paginated(session, campaign_id)
    counts = LeadCounts(total_leads=len(all_leads))
    for lead in all_leads:
        status = lead.get('status', '').upper()
        if status == 'STARTED':
            counts.started += 1
        elif status == 'INPROGRESS':
            counts.inprogress += 1
        elif status == 'COMPLETED':
            counts.completed += 1
        elif status == 'PAUSED':
            counts.paused += 1
        elif status == 'STOPPED':
            counts.stopped += 1
        elif status == 'BLOCKED':
            counts.blocked += 1
    return counts

def process_single_campaign(session, campaign, client_map):
    campaign_id = campaign['id']
    client_id = campaign.get('client_id')
    client_info = client_map.get(client_id, {})
    client_name = campaign.get('client_name') or client_info.get('name', 'Unknown')

    # DEBUG: Print when client_name is resolved from map
    if campaign.get('client_name') in [None, ''] and client_info.get('name'):
        print(f"DEBUG: Campaign {campaign_id} - client_name from map: '{client_name}' (campaign had {campaign.get('client_name')})")

    try:
        lead_counts = count_leads_by_status(session, campaign_id)
        return CampaignData(
            campaign_id=campaign_id,
            campaign_name=campaign.get('name', 'Unknown'),
            client_name=client_name,
            lead_counts=lead_counts
        )
    except Exception as e:
        return CampaignData(
            campaign_id=campaign_id,
            campaign_name=campaign.get('name', 'Unknown'),
            client_name=client_name,
            lead_counts=LeadCounts(),
            error=str(e)
        )

def consolidate_by_client(campaign_data):
    clients = {}
    for data in campaign_data:
        client_name = data.client_name
        if client_name not in clients:
            clients[client_name] = ClientSummary(client_name=client_name)
        clients[client_name].total_leads += data.lead_counts.total_leads
        clients[client_name].not_contacted += data.lead_counts.not_yet_contacted
        clients[client_name].campaign_count += 1
    return sorted(clients.values(), key=lambda x: x.client_name)

def process_all_campaigns(campaigns, client_map, limit=20):
    """Process limited campaigns for testing"""
    results = []
    total = min(limit, len(campaigns))
    print(f"\nProcessing {total} campaigns (limited for testing) with {MAX_WORKERS} workers...")

    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        future_to_campaign = {
            executor.submit(process_single_campaign, create_session(), campaign, client_map): campaign['id']
            for campaign in campaigns[:total]
        }

        for future in as_completed(future_to_campaign):
            campaign_id = future_to_campaign[future]
            try:
                result = future.result(timeout=600)
                results.append(result)
            except Exception as e:
                print(f"⚠ Error processing campaign {campaign_id}: {e}")

    print(f"\n✓ Processed {len(results)} campaigns")
    return results

def main():
    print("="*80)
    print("SmartLead Consolidator - DEBUG VERSION")
    print("="*80)

    session = create_session()
    try:
        all_campaigns = fetch_active_campaigns(session)
        if not all_campaigns:
            return 0

        client_map = fetch_all_clients(session)
        campaign_data = process_all_campaigns(all_campaigns, client_map, limit=20)
        client_summaries = consolidate_by_client(campaign_data)

        print("\n" + "="*80)
        print("CONSOLIDATED CLIENT LEADS SUMMARY (First 20 campaigns only)")
        print("="*80 + "\n")

        for summary in client_summaries:
            print(f"Client: {summary.client_name} | "
                  f"Total: {summary.total_leads:,} | "
                  f"Not Contacted: {summary.not_contacted:,} | "
                  f"Campaigns: {summary.campaign_count}")

        print("\n" + "="*80)
        return 0
    except Exception as e:
        print(f"\n✗ Error: {e}")
        import traceback
        traceback.print_exc()
        return 1
    finally:
        session.close()

if __name__ == "__main__":
    sys.exit(main())
