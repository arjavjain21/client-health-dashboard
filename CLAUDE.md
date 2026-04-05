# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Client Health Dashboard - Internal operations dashboard for monitoring client campaign performance, deliverability, and volume attainment for email marketing.

**Production URL**: https://clienthealth.eagleinfoservice.com

## Architecture

```
Supabase (READ-ONLY) → Python Ingestion → Local PostgreSQL → Next.js Dashboard
```

- **Supabase**: Two read-only databases (clients + reporting)
- **Ingestion**: Python scripts pull data, normalize, map, and compute metrics
- **Local DB**: PostgreSQL stores transformed data and computed rollups
- **Dashboard**: Next.js queries local DB and displays metrics

### Key Design Decisions

1. **READ-ONLY Supabase Access**: No writes to Supabase, ever. Local DB is the only writable store.
2. **Exact Client Matching**: Maps `client_code` to `client_name` using exact normalized match (lowercase, trimmed).
3. **7-Day Window**: Uses last 7 COMPLETED days (excludes today).
4. **RAG System**: Red/Amber/Green status based on deliverability, volume, and data completeness.

## Common Commands

### Frontend (Next.js)

```bash
cd /home/ubuntu/client-health-dashboard/app

# Development
npm run dev

# Production (via PM2)
pm2 startOrRestart /home/ubuntu/client-health-dashboard/ecosystem.config.js

# Build
npm run build

# Lint
npm run lint
```

### Backend (Python Ingestion)

```bash
cd /home/ubuntu/client-health-dashboard

# Activate virtual environment
source ingest/venv/bin/activate

# Run ingestion
python ingest/ingest_main.py

# Run specific module
python -m ingest.consolidate_leads_by_client
```

### Process Management

```bash
# Check service status
pm2 list

# View logs
pm2 logs client-health-dashboard

# Restart service
pm2 restart client-health-dashboard
```

### Database

```bash
# Connect to local database
sudo -u postgres psql -d client_health_dashboard_v1

# Check record counts
psql postgresql://ubuntu@localhost:5432/client_health_dashboard_v1 -c "SELECT COUNT(*) FROM client_health_dashboard_v1_local;"

# Initialize database
sudo /home/ubuntu/client-health-dashboard/db/init_db.sh
```

## Directory Structure

```
/home/ubuntu/client-health-dashboard/
├── app/                      # Next.js frontend
│   ├── src/app/             # App Router pages and API routes
│   ├── src/components/      # React components
│   └── src/lib/             # Utilities (db.ts, types.ts)
├── ingest/                   # Python ingestion pipeline
│   ├── ingest_main.py      # Main orchestration script
│   ├── consolidate_leads_by_client.py  # SmartLead API integration
│   └── database.py          # Database connection classes
├── db/                       # Database schema and migrations
├── logs/                     # Application logs
└── ecosystem.config.js       # PM2 configuration
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/dashboard` | GET | Main dashboard data with filters |
| `/api/dashboard/[client_code]` | GET | Client details |
| `/api/dashboard/filters` | GET | Filter options |
| `/api/dashboard/unmatched` | GET | Unmatched mappings |
| `/api/dashboard/refresh` | POST | Trigger data re-ingestion |
| `/api/dashboard/historical` | GET | Historical week data |
| `/api/dashboard/historical/mtd` | GET | MTD bookings data |
| `/api/weeks` | GET | Available historical weeks |
| `/api/health` | GET | Service health check |

### Dashboard Filter Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `relationship_status` | string | Filter by status |
| `closelix` | boolean | Filter closelix clients |
| `assigned_account_manager_name` | string | Filter by AM |
| `assigned_inbox_manager_name` | string | Filter by IM |
| `assigned_sdr_name` | string | Filter by SDR |
| `rag_status` | Red/Yellow/Green | Filter by health status |
| `deliverability_flag` | boolean | Deliverability issues |
| `mmf_flag` | boolean | MMF risk flag |
| `volume_flag` | boolean | Volume attainment flag |
| `data_missing_flag` | boolean | Missing data flag |
| `client_code_search` | string | ILIKE search on client_code |

## Frontend Pages

| Page | Description |
|------|-------------|
| `/` | Main dashboard with client health table |
| `/client/[client_code]` | Individual client detail view |
| `/historical-weeks` | Historical week comparison |
| `/unmatched` | Unmatched client/reporting mappings |

## Environment Variables

Required in `.env`:
- `CLIENTS_DB_URL` - Supabase clients database connection
- `CLIENTS_DB_PASSWORD` - Supabase clients password
- `REPORTING_DB_URL` - Supabase reporting database connection
- `REPORTING_DB_PASSWORD` - Supabase reporting password
- `DATABASE_URL` - Local PostgreSQL connection

## Troubleshooting

### Dashboard shows no data
1. Run ingestion: `python ingest/ingest_main.py`
2. Check logs: `tail -f logs/ingest.log`
3. Verify database: `psql postgresql://ubuntu@localhost:5432/client_health_dashboard_v1 -c "SELECT COUNT(*) FROM client_health_dashboard_v1_local;"`

### Service down (502 Bad Gateway)
1. Check PM2 status: `pm2 list`
2. Restart if needed: `pm2 restart client-health-dashboard`
3. Check nginx logs: `tail /var/log/nginx/error.log`

### Ingestion fails
1. Check Supabase credentials in `.env`
2. Verify Supabase connections: `psql "$CLIENTS_DB_URL" -c "SELECT 1;"`
3. Check local database connectivity
4. Run with verbose output: `cd /home/ubuntu/client-health-dashboard && source venv/bin/activate && python ingest/ingest_main.py --skip-smartlead`

## Key Files

| File | Purpose |
|------|---------|
| `app/src/app/page.tsx` | Main dashboard page |
| `app/src/app/DashboardClient.tsx` | Main dashboard component (table, filters, KPIs) |
| `app/src/app/historical-weeks/HistoricalDashboardClient.tsx` | Historical week comparison |
| `app/src/app/api/dashboard/route.ts` | Dashboard API endpoint |
| `app/src/lib/db.ts` | PostgreSQL connection pool |
| `app/src/lib/types.ts` | TypeScript interfaces |
| `ingest/ingest_main.py` | Main ingestion orchestration |
| `ingest/consolidate_leads_by_client.py` | SmartLead API for not_contacted leads |
| `ingest/database.py` | Database connection classes |
| `ingest/ingest_wrapper.sh` | Robust wrapper script for cron |
| `db/schema.sql` | Database schema definition |

## RAG Status Thresholds

- **Red**: Reply rate < 2%, bounce rate >= 5%, or volume attainment < 50%
- **Yellow**: Positive reply rate < 0.2% (MMF risk) or volume attainment < 80%
- **Green**: All metrics within acceptable thresholds

## Extended Dashboard Fields (beyond v1)

The dashboard has evolved beyond the original v1 scope:

| Field | Description |
|-------|-------------|
| `not_contacted_leads` | Leads from SmartLead API not yet contacted |
| `qualified_7d` | Qualified meetings in last 7 days |
| `showed_7d` | Meetings that showed up |
| `total_booked_7d` | Total bookings in last 7 days |
| `monthly_booking_goal` | Monthly target for bookings |
| `bonus_pool_monthly` | Bonus pool allocation |
| `weekend_sending_effective` | Whether weekend sending is active |
| `weekend_sending_mode` | Filter for weekend sending clients |

## Cron Schedule

The dashboard runs automated ingestion daily:
- **Dashboard ingestion**: `0 3 * * *` via `/home/ubuntu/client-health-dashboard/ingest/ingest_wrapper.sh`
- **SmartLead API**: `0 6 * * *` for not-contacted leads tracking
- View full crontab: `crontab -l`

## Q/S/TB (Qualified/Showed/Total Booked) Data

### Data Flow
```
hyperke_dashboard.interested_leads (source) → ingest_main.py → client_7d_rollup_v1_local → Dashboard
```

### Booking Definitions
- `qualified_7d`: COUNT WHERE call_feedback = 'QUALIFIED'
- `showed_7d`: COUNT WHERE call_feedback IN ('QUALIFIED', 'UNQUALIFIED')
- `total_booked_7d`: COUNT of all records with meeting_date in range

### Sorting
- All Q/S/TB columns are sortable in both main dashboard and historical dashboard
- Sorting is by `total_booked_7d` (click the Q/S/TB column header)

### Known Data Gaps
| Client | Status | Reason |
|--------|--------|--------|
| STRN | 0 bookings | No records in hyperke_dashboard.interested_leads |
| HHK | 0 bookings | No records in hyperke_dashboard.interested_leads |

**Note**: These clients show 0 bookings because no data exists in the source `interested_leads` table. This is a data availability issue, not a code bug. The ingestion pipeline correctly fetches from SmartLead API for these accounts.

## External SmartLead Accounts

The ingestion pipeline supports multiple SmartLead accounts:

### Configuration
```python
EXTERNAL_ACCOUNTS = {
    'HHK': {'api_key': os.environ.get('SMARTLEAD_API_KEY_HHK', '...')},
    'STRN': {'api_key': os.environ.get('SMARTLEAD_API_KEY_STRN', '...')}
}
```

### Environment Variables
- `SMARTLEAD_API_KEY_HHK` - HHK account API key
- `SMARTLEAD_API_KEY_STRN` - STRN account API key

<!-- code-review-graph MCP tools -->
## MCP Tools: code-review-graph

**IMPORTANT: This project has a knowledge graph. ALWAYS use the
code-review-graph MCP tools BEFORE using Grep/Glob/Read to explore
the codebase.** The graph is faster, cheaper (fewer tokens), and gives
you structural context (callers, dependents, test coverage) that file
scanning cannot.

### When to use graph tools FIRST

- **Exploring code**: `semantic_search_nodes` or `query_graph` instead of Grep
- **Understanding impact**: `get_impact_radius` instead of manually tracing imports
- **Code review**: `detect_changes` + `get_review_context` instead of reading entire files
- **Finding relationships**: `query_graph` with callers_of/callees_of/imports_of/tests_for
- **Architecture questions**: `get_architecture_overview` + `list_communities`

Fall back to Grep/Glob/Read **only** when the graph doesn't cover what you need.

### Key Tools

| Tool | Use when |
|------|----------|
| `detect_changes` | Reviewing code changes — gives risk-scored analysis |
| `get_review_context` | Need source snippets for review — token-efficient |
| `get_impact_radius` | Understanding blast radius of a change |
| `get_affected_flows` | Finding which execution paths are impacted |
| `query_graph` | Tracing callers, callees, imports, tests, dependencies |
| `semantic_search_nodes` | Finding functions/classes by name or keyword |
| `get_architecture_overview` | Understanding high-level codebase structure |
| `refactor_tool` | Planning renames, finding dead code |

### Workflow

1. The graph auto-updates on file changes (via hooks).
2. Use `detect_changes` for code review.
3. Use `get_affected_flows` to understand impact.
4. Use `query_graph` pattern="tests_for" to check coverage.
