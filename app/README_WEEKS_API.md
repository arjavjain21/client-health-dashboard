# Weeks API Endpoint

## Overview
The `/api/weeks` endpoint provides a list of available historical weeks for the client health dashboard's historical week selector feature.

## Endpoint Details
- **Route**: `GET /api/weeks`
- **Authentication**: None (public endpoint, respects existing auth patterns if added later)
- **Response Format**: JSON

## Response Structure

### Success Response (200)
```json
{
  "weeks": [
    {
      "week_number": 1,
      "start_date": "2025-02-07",
      "end_date": "2025-02-13",
      "display_name": "Week 1 (Feb 7 - Feb 13)",
      "record_count": 150
    },
    {
      "week_number": 2,
      "start_date": "2025-01-31",
      "end_date": "2025-02-06",
      "display_name": "Week 2 (Jan 31 - Feb 6)",
      "record_count": 148
    }
  ]
}
```

### Empty Response (200)
When no historical data is available:
```json
{
  "weeks": []
}
```

### Error Response (500)
```json
{
  "error": "Failed to fetch available weeks"
}
```

## Fields
- **week_number**: Integer (1-4) - Week identifier where 1 is the most recent completed week
- **start_date**: ISO date string (YYYY-MM-DD) - Week start date (Friday)
- **end_date**: ISO date string (YYYY-MM-DD) - Week end date (Thursday)
- **display_name**: Human-readable string formatted as "Week X (Mon D - Mon D)"
- **record_count**: Integer - Number of clients with data for this week

## Database Query
The endpoint queries the `client_health_dashboard_historical` table:
```sql
SELECT
    week_number,
    period_start_date as start_date,
    period_end_date as end_date,
    COUNT(*) as record_count
FROM client_health_dashboard_historical
GROUP BY week_number, period_start_date, period_end_date
ORDER BY week_number
```

## Usage Examples

### Using fetch (JavaScript)
```javascript
const response = await fetch('/api/weeks');
const data = await response.json();
console.log(data.weeks); // Array of available weeks
```

### Using curl
```bash
curl http://localhost:3000/api/weeks
```

### Using curl with pretty-printing
```bash
curl -s http://localhost:3000/api/weeks | jq
```

## Testing
Run the provided test script:
```bash
./test_weeks_api.sh
```

## Implementation Notes
- Uses the existing database connection utility (`@/lib/db`)
- Follows Next.js App Router conventions (route.ts in weeks directory)
- TypeScript types defined in `@/lib/types` (HistoricalWeek, WeeksResponse)
- Handles edge cases: empty data, database connection errors
- Display names are dynamically formatted using JavaScript's `toLocaleDateString`
- No authentication required (matches pattern of other public API endpoints like `/api/dashboard/filters`)

## File Location
- **API Route**: `/app/src/app/api/weeks/route.ts`
- **Type Definitions**: `/app/src/lib/types.ts`
- **Database Utility**: `/app/src/lib/db.ts`
