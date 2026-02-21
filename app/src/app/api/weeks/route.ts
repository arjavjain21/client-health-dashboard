/**
 * API route for fetching available historical weeks
 *
 * Returns a list of available historical weeks (last 4 completed Friday-Thursday weeks)
 * with metadata for the frontend week selector dropdown.
 */

import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import type { HistoricalWeek, WeeksResponse } from '@/lib/types';

/**
 * Formats a date string for display
 * Example: "Feb 7" or "Feb 7 - Feb 13"
 */
function formatDisplayDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/**
 * Creates a display name for a week
 * Example: "Week 1 (Feb 7 - Feb 13)"
 */
function createDisplayName(weekNumber: number, startDate: string, endDate: string): string {
  return `Week ${weekNumber} (${formatDisplayDate(startDate)} - ${formatDisplayDate(endDate)})`;
}

export async function GET() {
  try {
    // Query the historical table to get distinct weeks with counts
    const queryText = `
      SELECT
        week_number,
        period_start_date as start_date,
        period_end_date as end_date,
        COUNT(*) as record_count
      FROM client_health_dashboard_historical
      GROUP BY week_number, period_start_date, period_end_date
      ORDER BY week_number
    `;

    const rows = await query<{
      week_number: number;
      start_date: string;
      end_date: string;
      record_count: number;
    }>(queryText);

    // Handle case where no historical data is available yet
    if (!rows || rows.length === 0) {
      return NextResponse.json<WeeksResponse>({ weeks: [] });
    }

    // Transform the results to include display names
    const weeks: HistoricalWeek[] = rows.map(row => ({
      week_number: row.week_number,
      start_date: row.start_date,
      end_date: row.end_date,
      display_name: createDisplayName(row.week_number, row.start_date, row.end_date),
      record_count: row.record_count,
    }));

    return NextResponse.json<WeeksResponse>({ weeks });
  } catch (error) {
    console.error('Available weeks API error:', error);

    // Return a more specific error message for database connection issues
    const errorMessage =
      error instanceof Error && error.message.includes('connect')
        ? 'Database connection failed. Please try again later.'
        : 'Failed to fetch available weeks';

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
