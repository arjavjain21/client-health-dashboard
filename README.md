# Client Health Dashboard v1

Internal operations dashboard for monitoring client campaign performance, deliverability, and volume attainment.

**Production URL**: https://clienthealth.eagleinfoservice.com

## Purpose and Scope

**v1 Focus**: This dashboard monitors client campaign performance using only:
1. Client configuration and ownership data (Bucket 1)
2. Daily campaign performance metrics (Bucket 2)

**v1 Excludes**: Bookings, qualification, show-rate tracking. These will be added in v2.

## What This Dashboard Does

- Tracks 7-day rolling metrics for all active clients
- Monitors deliverability (reply rates, bounce rates)
- Tracks volume attainment against weekly targets
- Flags at-risk clients with Red/Yellow/Green (RAG) status
- Identifies unmatched clients and campaign reporting data
- Provides detailed campaign breakdowns per client

## Quick Start

### Prerequisites

- Ubuntu VPS with PostgreSQL
- Python 3.10+
- Node.js 18+
- PM2 (for process management)

### Installation

1. **Clone and navigate to project**:
   ```bash
   cd /home/ubuntu/client-health-dashboard
   ```

2. **Set up local database**:
   ```bash
   sudo /home/ubuntu/client-health-dashboard/db/init_db.sh
   ```

3. **Configure environment variables**:
   - `.env` is already configured with Supabase credentials
   - Do NOT commit `.env` to version control

4. **Install Python dependencies**:
   ```bash
   source venv/bin/activate
   pip install -r ingest/requirements.txt
   ```

5. **Install Node.js dependencies**:
   ```bash
   cd app
   npm install
   ```

6. **Run initial data ingestion**:
   ```bash
   cd /home/ubuntu/client-health-dashboard
   source venv/bin/activate
   python ingest/ingest_main.py
   ```

7. **Start the dashboard**:
   ```bash
   cd /home/ubuntu/client-health-dashboard/app
   npm run dev
   ```

8. **Access the dashboard**:
   - Open http://localhost:3100

## Usage

### Production Dashboard

The dashboard is deployed at: **https://clienthealth.eagleinfoservice.com**

Features:
- ✅ SSL/HTTPS encryption with Let's Encrypt
- ✅ HTTP/2 for improved performance
- ✅ Static asset caching
- ✅ Gzip compression
- ✅ Security headers (HSTS, XSS protection, etc.)

### Accessing the Dashboard

**Production**: https://clienthealth.eagleinfoservice.com
- Main dashboard: `/`
- Client details: `/client/[client_code]`
- Unmatched mappings: `/unmatched`
- API endpoints: `/api/dashboard/*`

**Local Development**:
```bash
cd /home/ubuntu/client-health-dashboard/app
npm run dev
```
Access at http://localhost:3100

### Running the Dashboard

### Running Data Ingestion

**Manual ingestion**:
```bash
cd /home/ubuntu/client-health-dashboard
source venv/bin/activate
python ingest/ingest_main.py
```

**Scheduled ingestion (cron)**:
```bash
# Run daily at 11:00 AM IST (after Supabase updates at 10:30 AM)
crontab -e

# Add this line:
0 11 * * * cd /home/ubuntu/client-health-dashboard && source venv/bin/activate && python ingest/ingest_main.py >> /home/ubuntu/client-health-dashboard/logs/ingest.log 2>&1
```

## Architecture

### Data Flow

```
Supabase (READ-ONLY) → Ingestion (Python) → Local PostgreSQL → Next.js Dashboard
```

1. **Supabase**: Two databases (clients + reporting) queried in READ-ONLY mode
2. **Ingestion**: Python script pulls data, normalizes, maps, and computes metrics
3. **Local DB**: PostgreSQL stores transformed data and computed rollups
4. **Dashboard**: Next.js queries local DB and displays metrics

### Key Design Decisions

1. **READ-ONLY Supabase Access**: No writes to Supabase, ever. Local DB is the only writable store.

2. **Exact Client Matching**: Maps `client_code` to `client_name` using exact normalized match (lowercase, trimmed). No fuzzy matching in v1 to prevent false positives.

3. **7-Day Window**: Uses last 7 COMPLETED days (excludes today). Campaign reporting updates daily around 10:30 AM IST.

4. **RAG System**: Deterministic rules for Red/Yellow/Green status based on deliverability, volume, and data completeness.

5. **Null-Safe Metrics**: All ratios handle division by zero gracefully.

## Data Sources

### Supabase Database 1: Clients

- **Table**: `public.clients`
- **Access**: READ-ONLY
- **Fields Used**: client_id, client_code, owners, weekly_target, relationship_status, closelix, exit_date

### Supabase Database 2: Reporting

- **Table**: `public.campaign_reporting`
- **Access**: READ-ONLY
- **Fields Used**: campaign_id, client_name, status, dates, totals, replies, positives, bounces, rates

### Local Database: client_health_dashboard_v1

- **Tables**:
  - `clients_local` - Subset of clients
  - `campaign_reporting_local` - Subset of reporting (last 30 days)
  - `client_name_map_local` - Maps client_code to client_name
  - `client_7d_rollup_v1_local` - 7-day aggregated metrics
  - `client_health_dashboard_v1_local` - Final dataset with RAG
  - `unmatched_mappings_report` - Tracks unmatched data

## Client Matching Strategy

### The Problem

- `clients.client_code` is a short name like "SEM" or "HYPERKE"
- `campaign_reporting.client_name` is a text string
- `client_id` exists in clients but NOT in campaign_reporting
- Must join on string matching, not foreign key

### Solution (v1)

1. **Normalize both sides**:
   ```sql
   client_code_norm = LOWER(TRIM(client_code))
   client_name_norm = LOWER(TRIM(client_name))
   ```

2. **Exact match only**:
   ```sql
   WHERE client_code_norm = client_name_norm
   ```

3. **Track unmatched**:
   - Clients with no reporting data
   - Reporting data with no matching client
   - Visible in `/unmatched` page

### Why Exact Matching?

- Prevents false positives (e.g., "ACME" matching "ACME CORP")
- Transparent and predictable
- Ops team can resolve mismatches manually
- Fuzzy matching can be added in v2 if needed

## 7-Day Window Explanation

- **What**: Last 7 COMPLETED days, excluding today
- **Why**: Campaign reporting updates daily around 10:30 AM IST with previous day's data
- **How**: Uses `end_date >= CURRENT_DATE - INTERVAL '7 days'`
- **Example**: If today is Wednesday Jan 15, window is Jan 8-14 (Tuesday to Monday)

## RAG Status System

### Red (Critical Attention Required)

Triggers:
- Data missing (no contacted volume in last 7 days)
- Deliverability risk (reply rate < 2% OR bounce rate >= 5%)
- Volume critically low (attainment < 50%)

### Yellow (Warning)

Triggers:
- MMF risk (reply rate >= 2% BUT positive reply rate < 0.2%)
- Volume below target (attainment < 80%)

### Green (Healthy)

- Everything else

### RAG Reason

Always provides a one-sentence explanation citing the specific metric and value:
- "Deliverability risk: reply rate is 1.2%"
- "Volume critically low: attainment is 45.3%"
- "MMF risk: positive reply rate is 0.15%"

## API Endpoints

### GET /api/dashboard

Fetch main dashboard data with optional filters.

**Query Parameters**:
- `relationship_status` - Filter by status
- `assigned_account_manager_name` - Filter by AM
- `assigned_inbox_manager_name` - Filter by IM
- `assigned_sdr_name` - Filter by SDR
- `rag_status` - Filter by Red/Yellow/Green
- `deliverability_flag` - Boolean filter
- `mmf_flag` - Boolean filter
- `volume_flag` - Boolean filter
- `data_missing_flag` - Boolean filter

**Response**:
```json
{
  "data": [
    {
      "client_id": 123,
      "client_code": "SEM",
      "client_name": "SEM Client",
      "contacted_7d": 50000,
      "reply_rate_7d": 0.0250,
      "rag_status": "Green",
      "rag_reason": "Performance within acceptable thresholds",
      ...
    }
  ],
  "count": 42
}
```

### GET /api/dashboard/[client_code]

Fetch detailed client information including trends and campaigns.

**Response**:
```json
{
  "client": { ... },
  "trendData": [
    {
      "end_date": "2026-01-14",
      "contacted": 7500,
      "replies": 180,
      ...
    }
  ],
  "campaigns": [ ... ]
}
```

### GET /api/dashboard/unmatched

Fetch unmatched client mappings.

**Response**:
```json
{
  "data": [
    {
      "match_type": "client_without_reporting",
      "client_code": "NEWCLIENT",
      "client_name_norm": "newclient",
      "last_seen_date": "2026-01-14",
      "record_count": 1
    }
  ],
  "count": 3
}
```

### GET /api/dashboard/filters

Fetch filter options for dropdowns.

**Response**:
```json
{
  "relationship_statuses": ["active", "paused"],
  "account_managers": ["Alice", "Bob"],
  "inbox_managers": ["Carol", "Dave"],
  "sdrs": ["Eve", "Frank"]
}
```

## Known Limitations

1. **No Bookings Data**: Bucket 3 integration planned for v2
2. **Manual Ingestion**: Requires cron setup or manual run
3. **Exact Matching Only**: No fuzzy client name matching
4. **Static Metrics**: No real-time updates
5. **Simple Visualization**: Tables only, no charts in v1

## What's Next (v2)

The architecture is designed for easy extension. v2 will add:

1. **Bucket 3 Integration**:
   - Bookings data
   - Qualification metrics
   - Show-up tracking
   - Full funnel metrics

2. **Enhanced RAG**:
   - Booking-based flags
   - Qualification rate monitoring
   - Combined delivery + performance RAG

3. **Better Visualizations**:
   - Trend charts
   - Funnel diagrams
   - Campaign comparison

4. **Automated Ingestion**:
   - Built-in scheduler
   - Incremental updates
   - Real-time notifications

## Troubleshooting

### Dashboard shows no data

1. Run ingestion: `python ingest/ingest_main.py`
2. Check logs: `tail -f logs/ingest.log`
3. Verify database: `sudo -u postgres psql -d client_health_dashboard_v1 -c "SELECT COUNT(*) FROM client_health_dashboard_v1_local;"`

### Ingestion fails

1. Check Supabase credentials in `.env`
2. Verify Supabase connections: `psql "$CLIENTS_DB_URL" -c "SELECT 1;"`
3. Check local database: `psql postgresql://ubuntu@localhost:5432/client_health_dashboard_v1 -c "SELECT 1;"`

### Unmatched mappings

1. Visit `/unmatched` page
2. Identify mismatch type
3. Fix in Supabase source systems:
   - For clients without reporting: Update `client_code` to match `client_name`
   - For reporting without clients: Add client to `public.clients`
4. Re-run ingestion

### Port 3100 already in use

1. Check what's using it: `ss -tlnp | grep :3100`
2. Kill the process or use a different port in `app/.env.local`

## Security

- Supabase credentials in `.env` (never committed)
- READ-ONLY database access enforced in code
- No sensitive data in URLs
- Local database behind firewall

## Support

For issues or questions:
1. Check `docs/TOOL_SPEC.md` for detailed specifications
2. Check `docs/PLAN.md` for architecture details
3. Review ingestion logs: `logs/ingest.log`
4. Check PM2 logs: `pm2 logs client-health-dashboard`

## License

Internal use only.
