/**
 * API route for fetching unmatched mappings
 */

import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import type { UnmatchedMapping } from '@/lib/types';

export async function GET() {
  try {
    const queryText = `
      SELECT
        match_type,
        client_code,
        client_name_norm,
        last_seen_date,
        record_count
      FROM unmatched_mappings_report
      ORDER BY match_type, last_seen_date DESC
    `;

    const rows = await query<UnmatchedMapping>(queryText);

    return NextResponse.json({ data: rows, count: rows.length });
  } catch (error) {
    console.error('Unmatched mappings API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch unmatched mappings' },
      { status: 500 }
    );
  }
}
