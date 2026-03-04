/**
 * API route for Month-to-Date (MTD) historical data
 *
 * Returns client health data from the first day of the current month through yesterday.
 * Uses its own aggregation query (no precomputed table).
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import type { ClientRow, DashboardFilters } from '@/lib/types';

function buildMTDFilterConditions(filters: DashboardFilters, startParamIndex: number): { conditions: string; params: any[] } {
  const conditions: string[] = [];
  const params: any[] = [];
  let i = startParamIndex;
  if (filters.assigned_account_manager_name) {
    conditions.push(`c.assigned_account_manager_name = $${i++}`);
    params.push(filters.assigned_account_manager_name);
  }
  if (filters.assigned_inbox_manager_name) {
    conditions.push(`c.assigned_inbox_manager_name = $${i++}`);
    params.push(filters.assigned_inbox_manager_name);
  }
  if (filters.assigned_sdr_name) {
    conditions.push(`c.assigned_sdr_name = $${i++}`);
    params.push(filters.assigned_sdr_name);
  }
  if (filters.client_code_search) {
    conditions.push(`c.client_code ILIKE $${i++}`);
    params.push(`%${filters.client_code_search}%`);
  }
  return { conditions: conditions.join(' AND '), params };
}

interface HistoricalClientRow extends ClientRow {
  selected_weeks: number[];
  aggregation_days: number;
  period_start_date: string;
  period_end_date: string;
}

function getMTDRange(): { start_date: string; end_date: string } {
  const today = new Date();
  const y = today.getFullYear();
  const m = today.getMonth();
  const first = new Date(Date.UTC(y, m, 1));
  const yesterday = new Date(Date.UTC(y, m, today.getDate() - 1));
  return {
    start_date: first.toISOString().slice(0, 10),
    end_date: yesterday.toISOString().slice(0, 10),
  };
}

/**
 * Count calendar days in range (for prorated target: weekend_sending=true uses 1/7 per day)
 * For weekend_sending=false we need weekdays only - done in SQL with date filtering.
 */
function daysInRange(start: string, end: string): number {
  const s = new Date(start);
  const e = new Date(end);
  return Math.max(0, Math.floor((e.getTime() - s.getTime()) / (24 * 60 * 60 * 1000)) + 1);
}

export async function GET(request: NextRequest) {
  try {
    const range = getMTDRange();
    const daysCount = daysInRange(range.start_date, range.end_date);

    const filters: DashboardFilters = {};
    const sp = request.nextUrl.searchParams;
    if (sp.get('assigned_account_manager_name')) filters.assigned_account_manager_name = sp.get('assigned_account_manager_name')!;
    if (sp.get('assigned_inbox_manager_name')) filters.assigned_inbox_manager_name = sp.get('assigned_inbox_manager_name')!;
    if (sp.get('assigned_sdr_name')) filters.assigned_sdr_name = sp.get('assigned_sdr_name')!;
    if (sp.get('client_code_search')) filters.client_code_search = sp.get('client_code_search')!;
    if (sp.get('rag_status')) filters.rag_status = sp.get('rag_status')! as 'Red' | 'Yellow' | 'Green';

    const { conditions: filterConditions, params: filterParams } = buildMTDFilterConditions(filters, 4);
    const rollupAnd = filterConditions ? ` AND ${filterConditions}` : '';
    const ragFilterParamIndex = 4 + filterParams.length;
    const ragWhere = filters.rag_status ? ` WHERE t.rag_status = $${ragFilterParamIndex}` : '';

    // Active clients: same as ingest
    const queryText = `
      WITH date_range AS (
        SELECT $1::date AS start_date, $2::date AS end_date
      ),
      rollup AS (
        SELECT
          m.client_id,
          c.client_code,
          c.client_name,
          c.client_company_name,
          c.relationship_status,
          c.assigned_account_manager_name,
          c.assigned_inbox_manager_name,
          c.assigned_sdr_name,
          c.weekly_target_int,
          c.weekly_target_missing,
          c.closelix,
          c.bonus_pool_monthly,
          c.weekend_sending_effective,
          c.monthly_booking_goal,
          COALESCE(SUM(cr.total_sent), 0)::integer AS contacted_7d,
          COALESCE(SUM(cr.replies_count), 0)::integer AS replies_7d,
          COALESCE(SUM(cr.positive_reply), 0)::integer AS positives_7d,
          COALESCE(SUM(cr.bounce_count), 0)::integer AS bounces_7d,
          COALESCE(SUM(cr.new_leads_reached), 0)::integer AS new_leads_reached_7d,
          CASE WHEN SUM(cr.new_leads_reached) > 0
            THEN ROUND(SUM(cr.replies_count)::numeric / SUM(cr.new_leads_reached), 4)
            ELSE NULL END AS reply_rate_7d,
          CASE WHEN SUM(cr.replies_count) > 0
            THEN ROUND(SUM(cr.positive_reply)::numeric / SUM(cr.replies_count), 4)
            ELSE NULL END AS positive_reply_rate_7d,
          CASE WHEN SUM(cr.total_sent) > 0
            THEN ROUND(SUM(cr.bounce_count)::numeric / SUM(cr.total_sent), 4)
            ELSE NULL END AS bounce_pct_7d,
          MAX(cr.end_date) AS most_recent_reporting_end_date
        FROM client_name_map_local m
        INNER JOIN clients_local c ON c.client_id = m.client_id
        LEFT JOIN campaign_reporting_local cr
          ON m.client_name_norm = cr.client_name_norm
          AND cr.end_date >= (SELECT start_date FROM date_range)
          AND cr.end_date <= (SELECT end_date FROM date_range)
        WHERE (
          UPPER(TRIM(c.relationship_status)) IN ('ACTIVE', 'LIVE', 'ONGOING')
          OR (c.exit_date IS NULL AND c.relationship_status IS NOT NULL)
        )${rollupAnd}
        GROUP BY m.client_id, c.client_code, c.client_name, c.client_company_name,
          c.relationship_status, c.assigned_account_manager_name,
          c.assigned_inbox_manager_name, c.assigned_sdr_name,
          c.weekly_target_int, c.weekly_target_missing, c.closelix,
          c.bonus_pool_monthly, c.weekend_sending_effective, c.monthly_booking_goal
      ),
      with_targets AS (
        SELECT
          r.*,
          CASE
            WHEN r.weekly_target_int IS NOT NULL AND r.weekly_target_int > 0 THEN
              ROUND(
                (r.weekly_target_int::numeric / 7.0) * $3::integer,
                2
              )
            ELSE NULL
          END AS prorated_target,
          CASE
            WHEN r.weekly_target_int IS NOT NULL AND r.weekly_target_int > 0 AND r.new_leads_reached_7d > 0 THEN
              ROUND(r.new_leads_reached_7d::numeric / r.weekly_target_int, 4)
            ELSE NULL
          END AS volume_attainment,
          CASE
            WHEN r.positives_7d > 0 THEN
              ROUND(r.new_leads_reached_7d::numeric / r.positives_7d, 4)
            ELSE NULL
          END AS pcpl_proxy_7d,
          (r.contacted_7d IS NULL OR r.contacted_7d = 0) AS data_missing_flag,
          (r.reply_rate_7d < 0.02 OR r.bounce_pct_7d >= 0.05) AS deliverability_flag,
          (r.weekly_target_int IS NOT NULL AND r.weekly_target_int > 0
            AND r.new_leads_reached_7d::numeric / r.weekly_target_int < 0.8) AS volume_flag,
          (r.reply_rate_7d >= 0.02 AND r.positive_reply_rate_7d < 0.002) AS mmf_flag
        FROM rollup r
      ),
      with_rag AS (
        SELECT
          *,
          CASE
            WHEN data_missing_flag THEN 'Red'
            WHEN deliverability_flag THEN 'Red'
            WHEN volume_attainment IS NOT NULL AND volume_attainment < 0.5 THEN 'Red'
            WHEN volume_flag THEN 'Yellow'
            WHEN mmf_flag THEN 'Yellow'
            ELSE 'Green'
          END AS rag_status,
          CASE
            WHEN data_missing_flag THEN 'Data missing: no contacted volume in period'
            WHEN deliverability_flag AND reply_rate_7d IS NOT NULL AND reply_rate_7d < 0.02 THEN
              'Deliverability risk: reply rate is ' || ROUND(reply_rate_7d::numeric * 100, 2) || '%'
            WHEN deliverability_flag AND bounce_pct_7d IS NOT NULL AND bounce_pct_7d >= 0.05 THEN
              'Deliverability risk: bounce rate is ' || ROUND(bounce_pct_7d::numeric * 100, 2) || '%'
            WHEN volume_attainment IS NOT NULL AND volume_attainment < 0.5 THEN
              'Volume critically low: attainment is ' || ROUND(volume_attainment::numeric * 100, 1) || '%'
            WHEN volume_flag THEN
              'Volume below target: attainment is ' || ROUND(volume_attainment::numeric * 100, 1) || '%'
            WHEN mmf_flag THEN
              'MMF risk: positive reply rate is ' || ROUND(positive_reply_rate_7d::numeric * 100, 2) || '%'
            ELSE 'Performance within acceptable thresholds'
          END AS rag_reason,
          FALSE AS data_stale_flag
        FROM with_targets
      )
      SELECT
        t.client_id, t.client_code, t.client_name, t.client_company_name,
        t.relationship_status, t.assigned_account_manager_name,
        t.assigned_inbox_manager_name, t.assigned_sdr_name,
        t.weekly_target_int, t.weekly_target_missing, t.closelix,
        t.contacted_7d, t.replies_7d, t.positives_7d, t.bounces_7d,
        t.reply_rate_7d, t.positive_reply_rate_7d, t.bounce_pct_7d,
        t.new_leads_reached_7d,
        t.prorated_target,
        t.volume_attainment, t.pcpl_proxy_7d,
        COALESCE(cur.not_contacted_leads, 0)::bigint AS not_contacted_leads,
        t.deliverability_flag, t.volume_flag, t.mmf_flag,
        t.data_missing_flag, t.data_stale_flag,
        t.rag_status, t.rag_reason,
        t.most_recent_reporting_end_date,
        t.bonus_pool_monthly,
        t.weekend_sending_effective,
        t.monthly_booking_goal,
        COALESCE(cur.qualified_7d, 0) AS qualified_7d,
        COALESCE(cur.showed_7d, 0) AS showed_7d,
        COALESCE(cur.total_booked_7d, 0) AS total_booked_7d,
        (SELECT start_date FROM date_range) AS period_start_date,
        (SELECT end_date FROM date_range) AS period_end_date
      FROM with_rag t
      LEFT JOIN client_health_dashboard_v1_local cur ON cur.client_id = t.client_id
      ${ragWhere}
      ORDER BY t.new_leads_reached_7d DESC NULLS LAST
    `;

    const mtdParams = [range.start_date, range.end_date, daysCount, ...filterParams];
    if (filters.rag_status) mtdParams.push(filters.rag_status);
    const rows = await query<any>(queryText, mtdParams);

    const data: HistoricalClientRow[] = rows.map((row: any) => ({
      client_id: row.client_id,
      client_code: row.client_code,
      client_name: row.client_name,
      client_company_name: row.client_company_name,
      relationship_status: row.relationship_status,
      assigned_account_manager_name: row.assigned_account_manager_name,
      assigned_inbox_manager_name: row.assigned_inbox_manager_name,
      assigned_sdr_name: row.assigned_sdr_name,
      weekly_target_int: row.weekly_target_int != null ? Number(row.weekly_target_int) : null,
      weekly_target_missing: row.weekly_target_missing ?? false,
      closelix: row.closelix ?? false,
      contacted_7d: Number(row.contacted_7d ?? 0),
      replies_7d: Number(row.replies_7d ?? 0),
      positives_7d: Number(row.positives_7d ?? 0),
      bounces_7d: Number(row.bounces_7d ?? 0),
      reply_rate_7d: row.reply_rate_7d != null ? parseFloat(row.reply_rate_7d) : null,
      positive_reply_rate_7d: row.positive_reply_rate_7d != null ? parseFloat(row.positive_reply_rate_7d) : null,
      bounce_pct_7d: row.bounce_pct_7d != null ? parseFloat(row.bounce_pct_7d) : null,
      new_leads_reached_7d: Number(row.new_leads_reached_7d ?? 0),
      prorated_target: row.prorated_target != null ? parseFloat(row.prorated_target) : null,
      volume_attainment: row.volume_attainment != null ? parseFloat(row.volume_attainment) : null,
      pcpl_proxy_7d: row.pcpl_proxy_7d != null ? parseFloat(row.pcpl_proxy_7d) : null,
      not_contacted_leads: Number(row.not_contacted_leads ?? 0),
      deliverability_flag: row.deliverability_flag ?? false,
      volume_flag: row.volume_flag ?? false,
      mmf_flag: row.mmf_flag ?? false,
      data_missing_flag: row.data_missing_flag ?? false,
      data_stale_flag: row.data_stale_flag ?? false,
      rag_status: (row.rag_status ?? 'Yellow') as 'Red' | 'Yellow' | 'Green',
      rag_reason: row.rag_reason,
      most_recent_reporting_end_date: row.most_recent_reporting_end_date,
      bonus_pool_monthly: row.bonus_pool_monthly != null ? parseFloat(row.bonus_pool_monthly) : null,
      weekend_sending_effective: row.weekend_sending_effective ?? false,
      monthly_booking_goal: row.monthly_booking_goal != null ? parseFloat(row.monthly_booking_goal) : null,
      qualified_7d: Number(row.qualified_7d ?? 0),
      showed_7d: Number(row.showed_7d ?? 0),
      total_booked_7d: Number(row.total_booked_7d ?? 0),
      computed_at: row.computed_at,
      selected_weeks: [],
      aggregation_days: daysCount,
      period_start_date: row.period_start_date,
      period_end_date: row.period_end_date,
    }));

    return NextResponse.json({
      data,
      count: data.length,
      selected_weeks: [] as number[],
      aggregation_info: {
        total_days: daysCount,
        week_ranges: [],
        period_label: 'Month to date',
        period_start_date: range.start_date,
        period_end_date: range.end_date,
      },
    });
  } catch (error) {
    console.error('MTD historical API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch MTD data' },
      { status: 500 }
    );
  }
}
