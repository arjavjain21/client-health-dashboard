#!/usr/bin/env python3
"""
SmartLead Client Consolidator
=============================
Fetches all active campaigns, consolidates lead counts by client,
and outputs a simple summary to console.

Output format:
    Client: [Name] | Total: [X] | Not Contacted: [Y]

Author: Hyperke Automation Team
Version: 1.0.0
Date: February 5, 2026
"""

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
    print("Install it with: pip install requests")
    sys.exit(1)


# ============================================================================
# CONFIGURATION
# ============================================================================

# SmartLead API Configuration
API_KEY = os.environ.get('SMARTLEAD_API_KEY', '2fbf4f7d-44af-4ff1-8e25-5655f5483fd0_94zyakr')
BASE_URL = "https://server.smartlead.ai/api/v1"

# Performance settings
MAX_WORKERS = int(os.environ.get('MAX_WORKERS', '10'))
BATCH_SIZE = 100
REQUEST_TIMEOUT = int(os.environ.get('REQUEST_TIMEOUT', '30'))
MAX_RETRIES = 3
RETRY_BACKOFF = 1.0


# ============================================================================
# DATA MODELS
# ============================================================================

@dataclass
class ClientSummary:
    """Consolidated summary for a single client"""
    client_name: str
    total_leads: int = 0
    not_contacted: int = 0
    campaign_count: int = 0


@dataclass
class LeadCounts:
    """Lead status counts for a campaign"""
    total_leads: int = 0
    started: int = 0  # Not yet contacted
    inprogress: int = 0
    completed: int = 0
    paused: int = 0
    stopped: int = 0
    blocked: int = 0

    @property
    def not_yet_contacted(self) -> int:
        """Leads with STARTED status (haven't been contacted yet)"""
        return self.started


@dataclass
class CampaignData:
    """Campaign data with lead counts"""
    campaign_id: int
    campaign_name: str
    client_name: str
    lead_counts: LeadCounts
    error: Optional[str] = None


# ============================================================================
# HTTP SESSION WITH RETRY LOGIC
# ============================================================================

def create_session() -> requests.Session:
    """Create a requests session with retry logic"""
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


# ============================================================================
# API FUNCTIONS
# ============================================================================

def make_api_request(
    session: requests.Session,
    endpoint: str,
    params: Optional[Dict] = None,
    method: str = "GET"
) -> Optional[Dict]:
    """
    Make an API request with error handling

    Args:
        session: Requests session
        endpoint: API endpoint (without base URL)
        params: Query parameters
        method: HTTP method

    Returns:
        Response JSON or None if error
    """
    url = f"{BASE_URL}{endpoint}"

    if params is None:
        params = {}

    params['api_key'] = API_KEY

    try:
        response = session.request(
            method=method,
            url=url,
            params=params,
            timeout=REQUEST_TIMEOUT
        )
        response.raise_for_status()
        return response.json()

    except requests.exceptions.HTTPError as e:
        print(f"⚠ HTTP error for {endpoint}: {e}")
        return None
    except requests.exceptions.Timeout:
        print(f"⚠ Timeout for {endpoint}")
        return None
    except requests.exceptions.RequestException as e:
        print(f"⚠ Request error for {endpoint}: {e}")
        return None


def fetch_active_campaigns(session: requests.Session) -> List[Dict]:
    """Fetch all active campaigns"""
    print("Fetching campaigns...")

    campaigns = make_api_request(session, "/campaigns", params={"include_tags": "true"})

    if campaigns is None:
        print("✗ Failed to fetch campaigns")
        return []

    # Handle both list and dict responses
    if isinstance(campaigns, list):
        campaign_list = campaigns
    elif isinstance(campaigns, dict) and 'data' in campaigns:
        campaign_list = campaigns['data']
    else:
        print(f"✗ Unexpected campaigns response format: {type(campaigns)}")
        return []

    # Filter for ACTIVE campaigns only
    active_campaigns = [c for c in campaign_list if c.get('status') == 'ACTIVE']

    print(f"✓ Fetched {len(active_campaigns)} active campaigns (from {len(campaign_list)} total)")
    return active_campaigns


def fetch_all_clients(session: requests.Session) -> Dict[int, Dict]:
    """Fetch all clients and return as a dictionary keyed by client_id"""
    print("Fetching clients...")

    clients = make_api_request(session, "/client/")

    if clients is None:
        print("⚠ Failed to fetch clients, will use campaign data only")
        return {}

    # Handle both list and dict responses
    if isinstance(clients, list):
        client_list = clients
    elif isinstance(clients, dict) and 'data' in clients:
        client_list = clients['data']
    else:
        print(f"⚠ Unexpected clients response format: {type(clients)}")
        return {}

    client_map = {
        client['id']: {
            'name': client.get('name', 'Unknown'),
            'email': client.get('email', 'N/A'),
            'company_name': client.get('company_name', 'N/A')
        }
        for client in client_list
    }

    print(f"✓ Fetched {len(client_map)} clients")
    return client_map


def fetch_campaign_leads_paginated(
    session: requests.Session,
    campaign_id: int,
    status_filter: Optional[str] = None
) -> List[Dict]:
    """
    Fetch all leads for a campaign with pagination

    Args:
        session: Requests session
        campaign_id: Campaign ID
        status_filter: Optional status filter (STARTED, INPROGRESS, etc.)

    Returns:
        List of all leads
    """
    all_leads = []
    offset = 0

    params = {
        'limit': BATCH_SIZE,
        'offset': offset
    }

    if status_filter:
        params['status'] = status_filter

    while True:
        params['offset'] = offset

        response = make_api_request(
            session,
            f"/campaigns/{campaign_id}/leads",
            params=params
        )

        if response is None:
            break

        # Extract leads from response
        leads = response.get('data', [])
        total_leads = int(response.get('total_leads', 0)) if response.get('total_leads') else 0

        if not leads:
            break

        all_leads.extend(leads)

        # Check if we've fetched all leads
        if len(all_leads) >= total_leads or len(leads) < BATCH_SIZE:
            break

        offset += BATCH_SIZE

        # Small delay to avoid rate limiting
        time.sleep(0.1)

    return all_leads


def count_leads_by_status(
    session: requests.Session,
    campaign_id: int
) -> LeadCounts:
    """
    Count leads by status for a campaign

    Strategy: Fetch all leads once and count by status locally

    Args:
        session: Requests session
        campaign_id: Campaign ID

    Returns:
        LeadCounts object with all counts
    """
    # Fetch all leads for this campaign
    all_leads = fetch_campaign_leads_paginated(session, campaign_id)

    counts = LeadCounts(total_leads=len(all_leads))

    # Count by status
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


def process_single_campaign(
    session: requests.Session,
    campaign: Dict,
    client_map: Dict[int, Dict]
) -> CampaignData:
    """
    Process a single campaign to get lead counts

    Args:
        session: Requests session
        campaign: Campaign dict
        client_map: Client information map

    Returns:
        CampaignData object
    """
    campaign_id = campaign['id']
    client_id = campaign.get('client_id')

    # Get client info
    client_info = client_map.get(client_id, {})
    client_name = campaign.get('client_name') or client_info.get('name', 'Unknown')

    try:
        # Count leads by status
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


# ============================================================================
# CONSOLIDATION
# ============================================================================

def consolidate_by_client(campaign_data: List[CampaignData]) -> List[ClientSummary]:
    """
    Consolidate campaign data by client

    Args:
        campaign_data: List of CampaignData objects

    Returns:
        List of ClientSummary objects, sorted by client name
    """
    clients = {}

    for data in campaign_data:
        client_name = data.client_name

        if client_name not in clients:
            clients[client_name] = ClientSummary(
                client_name=client_name
            )

        clients[client_name].total_leads += data.lead_counts.total_leads
        clients[client_name].not_contacted += data.lead_counts.not_yet_contacted
        clients[client_name].campaign_count += 1

    # Convert to list and sort by client name
    return sorted(clients.values(), key=lambda x: x.client_name)


# ============================================================================
# PROCESSING
# ============================================================================

def process_all_campaigns(
    campaigns: List[Dict],
    client_map: Dict[int, Dict]
) -> List[CampaignData]:
    """
    Process all campaigns in parallel to get lead counts

    Args:
        campaigns: List of campaign dicts
        client_map: Client information map

    Returns:
        List of CampaignData objects
    """
    results = []
    total = len(campaigns)
    process_start_time = time.time()

    print(f"\nProcessing {total} campaigns with {MAX_WORKERS} workers...")

    # Create a session for each worker
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        # Submit all campaigns for processing
        future_to_campaign = {
            executor.submit(
                process_single_campaign,
                create_session(),
                campaign,
                client_map
            ): campaign['id']
            for campaign in campaigns
        }

        # Process completed futures
        completed = 0
        last_progress_time = process_start_time

        for future in as_completed(future_to_campaign):
            campaign_id = future_to_campaign[future]

            try:
                # Use timeout to prevent hanging on stuck campaigns
                result = future.result(timeout=600)  # 10 minute timeout
                results.append(result)
                completed += 1

                # Progress reporting
                elapsed_time = time.time() - process_start_time
                current_time = time.time()
                time_since_last_progress = current_time - last_progress_time

                # Report every 10 campaigns, or every 30 seconds, or when complete
                if (completed % 10 == 0) or (completed == total) or (time_since_last_progress >= 30):
                    avg_time = elapsed_time / completed if completed > 0 else 0
                    remaining = total - completed
                    est_remaining = avg_time * remaining

                    print(f"  Progress: {completed}/{total} campaigns processed "
                          f"({completed/total*100:.1f}%) | "
                          f"Est. remaining: {est_remaining/60:.1f}min")

                    last_progress_time = current_time

            except FutureTimeoutError:
                print(f"⚠ Timeout processing campaign {campaign_id}")
                completed += 1
            except Exception as e:
                print(f"⚠ Error processing campaign {campaign_id}: {e}")
                completed += 1

    total_time = time.time() - process_start_time
    print(f"\n✓ Processed {len(results)} campaigns in {total_time:.1f} seconds ({total_time/60:.2f} minutes)")

    return results


# ============================================================================
# OUTPUT
# ============================================================================

def print_results(client_summaries: List[ClientSummary]) -> None:
    """
    Print consolidated results to console

    Args:
        client_summaries: List of ClientSummary objects
    """
    total_clients = len(client_summaries)
    total_leads = sum(s.total_leads for s in client_summaries)
    total_not_contacted = sum(s.not_contacted for s in client_summaries)

    # Print individual client results
    print("\n" + "="*80)
    print("CONSOLIDATED CLIENT LEADS SUMMARY")
    print("="*80 + "\n")

    for summary in client_summaries:
        print(f"Client: {summary.client_name} | "
              f"Total: {summary.total_leads:,} | "
              f"Not Contacted: {summary.not_contacted:,}")

    # Print summary footer
    print("\n" + "─"*80)
    print(f"Total Clients: {total_clients}")
    print(f"Total Leads: {total_leads:,}")

    if total_leads > 0:
        percentage = (total_not_contacted / total_leads) * 100
        print(f"Total Not Contacted: {total_not_contacted:,} ({percentage:.1f}%)")
    else:
        print(f"Total Not Contacted: {total_not_contacted:,}")

    print("="*80 + "\n")


# ============================================================================
# MAIN EXECUTION
# ============================================================================

def main():
    """Main execution function"""
    start_time = time.time()

    print("="*80)
    print("SmartLead Client Consolidator - Starting")
    print(f"Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("="*80 + "\n")

    # Validate API key
    if not API_KEY or API_KEY == 'your_api_key_here':
        print("✗ SMARTLEAD_API_KEY not configured!")
        print("Set it with: export SMARTLEAD_API_KEY='your_key_here'")
        return 1

    # Create session
    session = create_session()

    try:
        # Step 1: Fetch all campaigns
        all_campaigns = fetch_active_campaigns(session)
        if not all_campaigns:
            print("✗ No active campaigns found. Exiting.")
            return 0

        # Step 2: Fetch all clients
        client_map = fetch_all_clients(session)

        # Step 3: Process all active campaigns in parallel
        campaign_data = process_all_campaigns(all_campaigns, client_map)

        # Step 4: Consolidate by client
        client_summaries = consolidate_by_client(campaign_data)

        # Step 5: Print results
        print_results(client_summaries)

        # Print execution time
        total_time = time.time() - start_time
        print(f"Total execution time: {total_time:.2f} seconds ({total_time/60:.2f} minutes)\n")

        return 0

    except KeyboardInterrupt:
        print("\n⚠ Process interrupted by user")
        return 130
    except Exception as e:
        print(f"\n✗ Unexpected error: {e}")
        import traceback
        traceback.print_exc()
        return 1
    finally:
        session.close()


if __name__ == "__main__":
    sys.exit(main())
