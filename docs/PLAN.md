# Client Health Dashboard v1 - Implementation Plan

## End-to-End Architecture

This dashboard implements a complete data pipeline and visualization system for monitoring client campaign performance.

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     SUPABASE (READ-ONLY)                     │
├──────────────────────────────┬──────────────────────────────┤
│  Clients DB                  │  Reporting DB                │
│  - public.clients            │  - public.campaign_reporting │
│  - client_code, owners,      │  - daily metrics             │
│    targets, status           │  - 7 day window              │
└──────────┬───────────────────┴──────────┬───────────────────┘
           │                              │
           │ READ-ONLY QUERIES            │
           │                              │
           └──────────┬───────────────────┘
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              INGESTION LAYER (Python)                       │
│  - Pulls from both Supabase DBs                            │
│  - Normalizes client names                                 │
│  - Builds mapping table                                    │
│  - Computes 7-day rollups                                  │
│  - Calculates RAG status                                   │
│  - Stores in local PostgreSQL                              │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│            LOCAL POSTGRESQL DATABASE                         │
│  - clients_local                                           │
│  - campaign_reporting_local                                │
│  - client_name_map_local                                   │
│  - client_7d_rollup_v1_local                               │
│  - client_health_dashboard_v1_local                        │
│  - unmatched_mappings_report                               │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│             NEXT.JS DASHBOARD (React)                       │
│  - API routes query local DB                               │
│  - Server components for rendering                         │
│  - Client components for interaction                       │
│  - Tables, filters, detail pages                           │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

1. **Ingestion** (Manual or cron):
   - Python script connects to Supabase databases in READ-ONLY mode
   - Pulls all clients from `public.clients`
   - Pulls last 30 days of campaign reporting
   - Normalizes client names (lowercase, trim)
   - Creates exact matches between `client_code` and `client_name`
   - Stores all data in local PostgreSQL database
   - Computes 7-day rollups and RAG status

2. **Dashboard Access** (On-demand):
   - User opens Next.js dashboard
   - Dashboard queries local PostgreSQL via API routes
   - Data is already processed and ready for display
   - Filters applied at database level for performance

## Sequence of Build Steps

### Phase 1: Database Layer (COMPLETED)
1. Created local PostgreSQL database `client_health_dashboard_v1`
2. Defined schema with 6 core tables and 3 views
3. Implemented triggers for updated_at timestamps
4. Created indexes for query performance

### Phase 2: Ingestion Layer (COMPLETED)
1. Created Python environment with virtual environment
2. Implemented ReadOnlyConnection class with safeguards
3. Built ingestion pipeline with 6 stages:
   - Ingest clients
   - Ingest campaign reporting
   - Build client mapping
   - Compute 7-day rollups
   - Compute dashboard dataset
   - Track unmatched mappings

### Phase 3: API Layer (COMPLETED)
1. Created Next.js app with TypeScript and Tailwind
2. Set up shadcn/ui component library
3. Installed PostgreSQL client (`pg`)
4. Created 4 API endpoints:
   - GET /api/dashboard - Main data with filters
   - GET /api/dashboard/[client_code] - Client details
   - GET /api/dashboard/unmatched - Unmatched mappings
   - GET /api/dashboard/filters - Filter options

### Phase 4: UI Layer (COMPLETED)
1. Main dashboard page with:
   - Data table with all required columns
   - Multi-select filters
   - RAG status badges
   - Sort order (Red > Yellow > Green)
2. Client detail page with:
   - Client header with RAG status
   - Metrics grid (target, contacted, attainment, reply rate)
   - Account team display
   - Campaign breakdown table
3. Unmatched mappings page with:
   - Table of unmatched clients and reporting rows
   - Clear type indicators
   - Last seen dates

### Phase 5: Documentation (IN PROGRESS)
1. PLAN.md (this file)
2. TOOL_SPEC.md - Exhaustive specification
3. README.md - User documentation

### Phase 6: Deployment & Testing (PENDING)
1. Configure PM2 for both ingestion and dashboard
2. Set up cron job for automatic ingestion
3. Test complete system end-to-end
4. Validate all requirements

## Assumptions Made

### Database Design
1. **Active Client Definition**: Used composite logic:
   - `relationship_status IN ('active', 'live', 'ongoing')` OR
   - `exit_date IS NULL AND relationship_status IS NOT NULL`
   - This is safe and defensive

2. **7-Day Window**: Uses `end_date` from campaign_reporting
   - Excludes today (last 7 COMPLETED days)
   - Updated daily around 7:30 AM IST

3. **Weekly Target Parsing**: Extracts first integer
   - Handles "50000", "50,000 emails", etc.
   - Sets to null if parsing fails

4. **Client Mapping**: Exact normalized match only
   - `LOWER(TRIM(client_code)) = LOWER(TRIM(client_name))`
   - No fuzzy matching in v1 (prevents false positives)

5. **Contacted Metric**: Uses `total_sent`
   - More accurate than `new_leads_reached`
   - Documented in TOOL_SPEC.md

### RAG Rules
1. **Red** (Critical):
   - Data missing (no contacted volume)
   - Deliverability risk (reply rate < 2% OR bounce rate >= 5%)
   - Volume critically low (attainment < 50%)

2. **Yellow** (Warning):
   - MMF risk (reply rate >= 2% BUT positive reply rate < 0.2%)
   - Volume below target (attainment < 80%)

3. **Green** (Healthy):
   - Everything else

### UI/UX Decisions
1. **Design System**:
   - Slate color palette (cool, technical)
   - Borders-only depth (0.5px solid)
   - Sharp border radius (4px, 6px)
   - Readability focus (generous spacing)
   - 14px base font size

2. **No Em Dashes**: Used commas, colons, or parentheses throughout

3. **Information Hierarchy**:
   - Primary: Client codes and metrics
   - Secondary: Status and owners
   - Tertiary: Dates and metadata

## Checklist to Validate Correctness

### Data Integrity
- [ ] Supabase connections are read-only (verified in code)
- [ ] Local DB stores all required data
- [ ] Client mapping does not silently drop rows (unmatched report)
- [ ] 7-day window excludes today
- [ ] All ratios are null-safe (no divide-by-zero)

### RAG System
- [ ] RAG is deterministic and documented
- [ ] rag_reason always present and cites metric
- [ ] Missing data results in Red
- [ ] Thresholds are configurable (documented in TOOL_SPEC)

### UI Requirements
- [ ] Main dashboard table has all required columns
- [ ] Filters work for all required dimensions
- [ ] Sort order is correct (Red > Yellow > Green, then positives asc)
- [ ] Client detail page shows all required info
- [ ] Unmatched mappings page works
- [ ] No Inter font defaults
- [ ] No em dashes in UI text
- [ ] Design principles applied consistently

### Technical Requirements
- [ ] Python virtual environment created
- [ ] All dependencies installed
- [ ] TypeScript types defined
- [ ] API routes follow REST conventions
- [ ] Error handling in place
- [ ] Database indexes for performance
- [ ] Environment variables configured

### Documentation
- [ ] README.md explains purpose, scope, and setup
- [ ] TOOL_SPEC.md has exhaustive specification
- [ ] PLAN.md documents architecture (this file)
- [ ] No em dashes in documentation

### Deployment
- [ ] PM2 ecosystem config created
- [ ] Dashboard service runs on port 3100
- [ ] Ingestion script can be run manually
- [ ] Cron instructions documented
- [ ] Logs are accessible

## Known Limitations (v1)

1. **No Bookings Data**: Bucket 3 not integrated yet
2. **No Qualification Metrics**: Not in scope for v1
3. **No Show-Rate Tracking**: Will be added in v2
4. **Exact Matching Only**: No fuzzy client name matching
5. **Manual Ingestion**: Requires cron job setup
6. **No Real-Time Updates**: Data refreshes on ingestion only
7. **Simple Trend Visualization**: No charts in v1 (table only)

## Future v2 (Bucket 3 Integration)

The architecture is designed to accommodate v2 without rework:

1. **Add New Tables**:
   - `bookings_local` from Bucket 3
   - `qualification_events_local`
   - `show_up_events_local`

2. **Extend Rollups**:
   - Add booking metrics to `client_7d_rollup_v2_local`
   - Compute booking rate, qualification rate, show-up rate

3. **Enhance RAG**:
   - Add booking-based flags (e.g., low booking rate)
   - Incorporate qualification metrics
   - Combine delivery AND performance RAG

4. **UI Enhancements**:
   - Add booking columns to dashboard
   - Show funnel metrics in client detail
   - Visualize conversion pipeline

The key design decision: **local database as source of truth** means we can add any new data sources without touching Supabase or existing queries. We'll simply create new parallel tables and views for v2.
