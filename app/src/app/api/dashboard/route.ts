/**
 * API route for fetching dashboard data
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import type { ClientRow, DashboardFilters } from '@/lib/types';

function buildWhereClause(filters: DashboardFilters): { where: string; params: any[] } {
  const conditions: string[] = [];
  const params: any[] = [];
  let paramIndex = 1;

  if (filters.relationship_status) {
    conditions.push(`relationship_status = $${paramIndex++}`);
    params.push(filters.relationship_status);
  }

  if (filters.closelix !== undefined) {
    conditions.push(`closelix = $${paramIndex++}`);
    params.push(filters.closelix);
  }

  if (filters.assigned_account_manager_name) {
    conditions.push(`assigned_account_manager_name = $${paramIndex++}`);
    params.push(filters.assigned_account_manager_name);
  }

  if (filters.assigned_inbox_manager_name) {
    conditions.push(`assigned_inbox_manager_name = $${paramIndex++}`);
    params.push(filters.assigned_inbox_manager_name);
  }

  if (filters.assigned_sdr_name) {
    conditions.push(`assigned_sdr_name = $${paramIndex++}`);
    params.push(filters.assigned_sdr_name);
  }

  if (filters.rag_status) {
    conditions.push(`rag_status = $${paramIndex++}`);
    params.push(filters.rag_status);
  }

  if (filters.deliverability_flag !== undefined) {
    conditions.push(`deliverability_flag = $${paramIndex++}`);
    params.push(filters.deliverability_flag);
  }

  if (filters.mmf_flag !== undefined) {
    conditions.push(`mmf_flag = $${paramIndex++}`);
    params.push(filters.mmf_flag);
  }

  if (filters.volume_flag !== undefined) {
    conditions.push(`volume_flag = $${paramIndex++}`);
    params.push(filters.volume_flag);
  }

  if (filters.data_missing_flag !== undefined) {
    conditions.push(`data_missing_flag = $${paramIndex++}`);
    params.push(filters.data_missing_flag);
  }

  if (filters.client_code_search) {
    conditions.push(`client_code ILIKE $${paramIndex++}`);
    params.push(`%${filters.client_code_search}%`);
  }

  return {
    where: conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '',
    params,
  };
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const filters: DashboardFilters = {};
    if (searchParams.get('relationship_status'))
      filters.relationship_status = searchParams.get('relationship_status')!;
    if (searchParams.get('closelix'))
      filters.closelix = searchParams.get('closelix') === 'true';
    if (searchParams.get('assigned_account_manager_name'))
      filters.assigned_account_manager_name = searchParams.get('assigned_account_manager_name')!;
    if (searchParams.get('assigned_inbox_manager_name'))
      filters.assigned_inbox_manager_name = searchParams.get('assigned_inbox_manager_name')!;
    if (searchParams.get('assigned_sdr_name'))
      filters.assigned_sdr_name = searchParams.get('assigned_sdr_name')!;
    if (searchParams.get('rag_status'))
      filters.rag_status = searchParams.get('rag_status')! as 'Red' | 'Yellow' | 'Green';
    if (searchParams.get('deliverability_flag') !== null)
      filters.deliverability_flag = searchParams.get('deliverability_flag') === 'true';
    if (searchParams.get('mmf_flag') !== null)
      filters.mmf_flag = searchParams.get('mmf_flag') === 'true';
    if (searchParams.get('volume_flag') !== null)
      filters.volume_flag = searchParams.get('volume_flag') === 'true';
    if (searchParams.get('data_missing_flag') !== null)
      filters.data_missing_flag = searchParams.get('data_missing_flag') === 'true';
    if (searchParams.get('client_code_search'))
      filters.client_code_search = searchParams.get('client_code_search')!;

    const { where, params } = buildWhereClause(filters);

    const queryText = `
      SELECT
        client_id, client_code, client_name, client_company_name,
        relationship_status, assigned_account_manager_name,
        assigned_inbox_manager_name, assigned_sdr_name,
        weekly_target_int, weekly_target_missing, closelix,
        contacted_7d, replies_7d, positives_7d, bounces_7d,
        reply_rate_7d, positive_reply_rate_7d, bounce_pct_7d,
        new_leads_reached_7d,
        prorated_target,
        volume_attainment, pcpl_proxy_7d,
        deliverability_flag, volume_flag, mmf_flag,
        data_missing_flag, data_stale_flag,
        rag_status, rag_reason,
        most_recent_reporting_end_date, computed_at
      FROM client_health_dashboard_v1_local
      ${where}
      ORDER BY new_leads_reached_7d DESC NULLS LAST
    `;

    const rows = await query<ClientRow>(queryText, params);

    return NextResponse.json({ data: rows, count: rows.length });
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
