/**
 * API route for fetching filter options
 */

import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import type { FilterOptions } from '@/lib/types';

export async function GET() {
  try {
    const relationshipStatuses = await query<{ relationship_status: string }>(
      `SELECT DISTINCT relationship_status
       FROM client_health_dashboard_v1_local
       WHERE relationship_status IS NOT NULL
       ORDER BY relationship_status`
    );

    const accountManagers = await query<{ assigned_account_manager_name: string }>(
      `SELECT DISTINCT assigned_account_manager_name
       FROM client_health_dashboard_v1_local
       WHERE assigned_account_manager_name IS NOT NULL
       ORDER BY assigned_account_manager_name`
    );

    const inboxManagers = await query<{ assigned_inbox_manager_name: string }>(
      `SELECT DISTINCT assigned_inbox_manager_name
       FROM client_health_dashboard_v1_local
       WHERE assigned_inbox_manager_name IS NOT NULL
       ORDER BY assigned_inbox_manager_name`
    );

    const sdrs = await query<{ assigned_sdr_name: string }>(
      `SELECT DISTINCT assigned_sdr_name
       FROM client_health_dashboard_v1_local
       WHERE assigned_sdr_name IS NOT NULL
       ORDER BY assigned_sdr_name`
    );

    const options: FilterOptions = {
      relationship_statuses: relationshipStatuses.map(r => r.relationship_status),
      account_managers: accountManagers.map(am => am.assigned_account_manager_name),
      inbox_managers: inboxManagers.map(im => im.assigned_inbox_manager_name),
      sdrs: sdrs.map(s => s.assigned_sdr_name),
    };

    return NextResponse.json(options);
  } catch (error) {
    console.error('Filter options API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch filter options' },
      { status: 500 }
    );
  }
}
