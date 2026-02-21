/**
 * API route for fetching historical dashboard data
 *
 * Fetches client health data for one or more selected historical weeks.
 * Single week: Returns data as-is from that week
 * Multiple weeks: Aggregates data across selected weeks (sums numeric metrics, averages percentages)
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import type { ClientRow } from '@/lib/types';

/**
 * Extended client row with historical metadata
 */
interface HistoricalClientRow extends ClientRow {
  selected_weeks: number[];
  aggregation_days: number;
  period_start_date: string;
  period_end_date: string;
}

/**
 * Response format for historical data endpoint
 */
interface HistoricalDataResponse {
  data: HistoricalClientRow[];
  count: number;
  selected_weeks: number[];
  aggregation_info: {
    total_days: number;
    week_ranges: Array<{
      week_number: number;
      start_date: string;
      end_date: string;
    }>;
  };
}

/**
 * Validates and parses week numbers from query param
 * @param weeksParam - Comma-separated week numbers (e.g., "1,2,3")
 * @returns Array of valid week numbers (1-4)
 * @throws Error if invalid week numbers provided
 */
function parseAndValidateWeeks(weeksParam: string | null): number[] {
  if (!weeksParam || weeksParam.trim() === '') {
    throw new Error('Query parameter "weeks" is required. Example: ?weeks=1 or ?weeks=1,2,3');
  }

  const weekNumbers = weeksParam
    .split(',')
    .map(w => w.trim())
    .filter(w => w !== '')
    .map(w => {
      const num = parseInt(w, 10);
      if (isNaN(num)) {
        throw new Error(`Invalid week number: "${w}". Week numbers must be integers 1-4.`);
      }
      if (num < 1 || num > 4) {
        throw new Error(`Week number out of range: ${num}. Only weeks 1-4 are supported.`);
      }
      return num;
    });

  if (weekNumbers.length === 0) {
    throw new Error('At least one valid week number must be provided.');
  }

  // Remove duplicates and sort
  return [...new Set(weekNumbers)].sort((a, b) => a - b);
}

/**
 * Builds SQL query for single week (no aggregation needed)
 */
function buildSingleWeekQuery(weekNumber: number): string {
  return `
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
      not_contacted_leads,
      deliverability_flag, volume_flag, mmf_flag,
      data_missing_flag, data_stale_flag,
      rag_status, rag_reason,
      most_recent_reporting_end_date, computed_at,
      bonus_pool_monthly, weekend_sending_effective, monthly_booking_goal,
      period_start_date, period_end_date, week_number
    FROM client_health_dashboard_historical
    WHERE week_number = $1
    ORDER BY new_leads_reached_7d DESC NULLS LAST
  `;
}

/**
 * Builds SQL query for multiple weeks (with aggregation)
 */
function buildMultiWeekQuery(weekNumbers: number[]): string {
  const placeholders = weekNumbers.map((_, i) => `$${i + 1}`).join(', ');

  return `
    SELECT
      client_id,
      client_code,
      -- Sum all numeric metrics
      SUM(contacted_7d) as contacted_7d,
      SUM(replies_7d) as replies_7d,
      SUM(positives_7d) as positives_7d,
      SUM(bounces_7d) as bounces_7d,
      SUM(new_leads_reached_7d) as new_leads_reached_7d,
      SUM(not_contacted_leads) as not_contacted_leads,

      -- Average percentages
      AVG(reply_rate_7d) as reply_rate_7d,
      AVG(positive_reply_rate_7d) as positive_reply_rate_7d,
      AVG(bounce_pct_7d) as bounce_pct_7d,
      AVG(volume_attainment) as volume_attainment,
      AVG(pcpl_proxy_7d) as pcpl_proxy_7d,

      -- Sum targets
      SUM(weekly_target_int) as weekly_target_int,
      SUM(prorated_target) as prorated_target,

      -- Take latest values (most recent week)
      MAX(rag_status) as rag_status,
      MAX(rag_reason) as rag_reason,
      MAX(most_recent_reporting_end_date) as most_recent_reporting_end_date,
      MAX(computed_at) as computed_at,

      -- Keep non-aggregated fields
      ANY_VALUE(client_name) as client_name,
      ANY_VALUE(client_company_name) as client_company_name,
      ANY_VALUE(relationship_status) as relationship_status,
      ANY_VALUE(assigned_account_manager_name) as assigned_account_manager_name,
      ANY_VALUE(assigned_inbox_manager_name) as assigned_inbox_manager_name,
      ANY_VALUE(assigned_sdr_name) as assigned_sdr_name,
      ANY_VALUE(bonus_pool_monthly) as bonus_pool_monthly,
      ANY_VALUE(weekend_sending_effective) as weekend_sending_effective,
      ANY_VALUE(monthly_booking_goal) as monthly_booking_goal,
      ANY_VALUE(weekly_target_missing) as weekly_target_missing,
      ANY_VALUE(closelix) as closelix,

      -- For flags: set TRUE if ANY week has TRUE
      BOOL_OR(deliverability_flag) as deliverability_flag,
      BOOL_OR(volume_flag) as volume_flag,
      BOOL_OR(mmf_flag) as mmf_flag,
      BOOL_OR(data_missing_flag) as data_missing_flag,
      BOOL_OR(data_stale_flag) as data_stale_flag,

      -- Track aggregation metadata
      ARRAY_AGG(DISTINCT week_number ORDER BY week_number) as selected_weeks,
      COUNT(DISTINCT week_number) * 7 as aggregation_days,
      MIN(period_start_date) as period_start_date,
      MAX(period_end_date) as period_end_date

    FROM client_health_dashboard_historical
    WHERE week_number IN (${placeholders})
    GROUP BY client_id, client_code
    ORDER BY SUM(new_leads_reached_7d) DESC NULLS LAST
  `;
}

/**
 * Fetches metadata for the selected week numbers
 */
async function fetchWeekMetadata(weekNumbers: number[]): Promise<Array<{
  week_number: number;
  start_date: string;
  end_date: string;
}>> {
  const placeholders = weekNumbers.map((_, i) => `$${i + 1}`).join(', ');

  const queryText = `
    SELECT
      week_number,
      period_start_date as start_date,
      period_end_date as end_date
    FROM client_health_dashboard_historical
    WHERE week_number IN (${placeholders})
    GROUP BY week_number, period_start_date, period_end_date
    ORDER BY week_number
  `;

  const rows = await query<{
    week_number: number;
    start_date: string;
    end_date: string;
  }>(queryText, weekNumbers);

  return rows;
}

/**
 * Transforms database row to HistoricalClientRow format
 */
function transformToHistoricalRow(
  row: any,
  selectedWeeks: number[],
  aggregationDays: number
): HistoricalClientRow {
  return {
    client_id: row.client_id,
    client_code: row.client_code,
    client_name: row.client_name,
    client_company_name: row.client_company_name,
    relationship_status: row.relationship_status,
    assigned_account_manager_name: row.assigned_account_manager_name,
    assigned_inbox_manager_name: row.assigned_inbox_manager_name,
    assigned_sdr_name: row.assigned_sdr_name,
    weekly_target_int: row.weekly_target_int ? Number(row.weekly_target_int) : null,
    weekly_target_missing: row.weekly_target_missing ?? false,
    closelix: row.closelix ?? false,
    contacted_7d: Number(row.contacted_7d ?? 0),
    replies_7d: Number(row.replies_7d ?? 0),
    positives_7d: Number(row.positives_7d ?? 0),
    bounces_7d: Number(row.bounces_7d ?? 0),
    reply_rate_7d: row.reply_rate_7d ? parseFloat(row.reply_rate_7d) : null,
    positive_reply_rate_7d: row.positive_reply_rate_7d ? parseFloat(row.positive_reply_rate_7d) : null,
    bounce_pct_7d: row.bounce_pct_7d ? parseFloat(row.bounce_pct_7d) : null,
    new_leads_reached_7d: Number(row.new_leads_reached_7d ?? 0),
    prorated_target: row.prorated_target ? parseFloat(row.prorated_target) : null,
    volume_attainment: row.volume_attainment ? parseFloat(row.volume_attainment) : null,
    pcpl_proxy_7d: row.pcpl_proxy_7d ? parseFloat(row.pcpl_proxy_7d) : null,
    not_contacted_leads: Number(row.not_contacted_leads ?? 0),
    deliverability_flag: row.deliverability_flag ?? false,
    volume_flag: row.volume_flag ?? false,
    mmf_flag: row.mmf_flag ?? false,
    data_missing_flag: row.data_missing_flag ?? false,
    data_stale_flag: row.data_stale_flag ?? false,
    rag_status: row.rag_status ?? 'Yellow',
    rag_reason: row.rag_reason,
    most_recent_reporting_end_date: row.most_recent_reporting_end_date,
    bonus_pool_monthly: row.bonus_pool_monthly ? parseFloat(row.bonus_pool_monthly) : null,
    weekend_sending_effective: row.weekend_sending_effective ?? false,
    monthly_booking_goal: row.monthly_booking_goal ? parseFloat(row.monthly_booking_goal) : null,
    computed_at: row.computed_at,
    selected_weeks: selectedWeeks,
    aggregation_days: aggregationDays,
    period_start_date: row.period_start_date,
    period_end_date: row.period_end_date,
  };
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const weeksParam = searchParams.get('weeks');

    // Parse and validate week numbers
    let selectedWeeks: number[];
    try {
      selectedWeeks = parseAndValidateWeeks(weeksParam);
    } catch (error) {
      return NextResponse.json(
        {
          error: error instanceof Error ? error.message : 'Invalid week numbers',
        },
        { status: 400 }
      );
    }

    const aggregationDays = selectedWeeks.length * 7;

    // Build and execute query based on number of weeks selected
    let rows: any[];
    let queryText: string;
    let params: any[];

    if (selectedWeeks.length === 1) {
      // Single week: no aggregation
      queryText = buildSingleWeekQuery(selectedWeeks[0]);
      params = [selectedWeeks[0]];
      rows = await query<any>(queryText, params);

      // Add metadata fields for consistency
      rows = rows.map(row => ({
        ...row,
        selected_weeks: selectedWeeks,
        aggregation_days: aggregationDays,
      }));
    } else {
      // Multiple weeks: aggregate
      queryText = buildMultiWeekQuery(selectedWeeks);
      params = selectedWeeks;
      rows = await query<any>(queryText, params);
    }

    // Fetch week metadata for response
    const weekMetadata = await fetchWeekMetadata(selectedWeeks);

    // Transform rows to match response format
    const data: HistoricalClientRow[] = rows.map(row =>
      transformToHistoricalRow(row, selectedWeeks, aggregationDays)
    );

    const response: HistoricalDataResponse = {
      data,
      count: data.length,
      selected_weeks: selectedWeeks,
      aggregation_info: {
        total_days: aggregationDays,
        week_ranges: weekMetadata,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Historical dashboard API error:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Failed to fetch historical dashboard data';

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
