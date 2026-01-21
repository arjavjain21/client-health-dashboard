/**
 * API route for fetching client details including trends and campaigns
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import type { ClientDetail, TrendDataPoint, CampaignRow } from '@/lib/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ client_code: string }> }
) {
  try {
    const { client_code } = await params;

    // Fetch client details
    const clientQuery = `
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
      WHERE client_code = $1
    `;

    const clients = await query(clientQuery, [client_code]);

    if (!clients || clients.length === 0) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }

    const client = clients[0];

    // Fetch 14-day trend data
    const trendQuery = `
      SELECT
        end_date,
        SUM(total_sent) as contacted,
        SUM(replies_count) as replies,
        SUM(positive_reply) as positives,
        SUM(bounce_count) as bounces,
        CASE
          WHEN SUM(total_sent) > 0 THEN
            ROUND(SUM(replies_count)::numeric / SUM(total_sent), 4)
          ELSE NULL
        END as reply_rate,
        CASE
          WHEN SUM(total_sent) > 0 THEN
            ROUND(SUM(positive_reply)::numeric / SUM(total_sent), 4)
          ELSE NULL
        END as positive_reply_rate
      FROM campaign_reporting_local
      WHERE client_name_norm IN (
        SELECT DISTINCT client_name_norm
        FROM client_name_map_local
        WHERE client_code = $1
      )
      AND end_date >= CURRENT_DATE - INTERVAL '14 days'
      GROUP BY end_date
      ORDER BY end_date DESC
    `;

    const trendData = await query<TrendDataPoint>(trendQuery, [client_code]);

    // Fetch 7-day campaign breakdown with enhanced metrics - AGGREGATED BY CAMPAIGN
    const campaignQuery = `
      SELECT
        campaign_id,
        campaign_name,
        status,
        MIN(start_date) as start_date,
        MAX(end_date) as end_date,
        SUM(total_sent)::bigint as total_sent,
        SUM(COALESCE(new_leads_reached, 0))::bigint as new_leads_reached_7d,
        SUM(replies_count)::bigint as replies_count,
        SUM(positive_reply)::bigint as positive_reply,
        SUM(bounce_count)::bigint as bounce_count,
        CASE
          WHEN SUM(COALESCE(new_leads_reached, 0)) > 0 THEN
            ROUND((SUM(replies_count)::numeric / SUM(COALESCE(new_leads_reached, 0))), 4)
          ELSE NULL
        END as reply_rate,
        CASE
          WHEN SUM(replies_count) > 0 THEN
            ROUND((SUM(positive_reply)::numeric / SUM(replies_count)), 4)
          ELSE NULL
        END as positive_reply_rate,
        CASE
          WHEN SUM(total_sent) > 0 THEN
            ROUND((SUM(bounce_count)::numeric / SUM(total_sent)), 4)
          ELSE NULL
        END as bounce_pct_7d,
        NULL::int as weekly_target_int,
        NULL::numeric as volume_attainment
      FROM campaign_reporting_local
      WHERE client_name_norm IN (
        SELECT DISTINCT client_name_norm
        FROM client_name_map_local
        WHERE client_code = $1
      )
      AND end_date >= CURRENT_DATE - INTERVAL '7 days'
      GROUP BY campaign_id, campaign_name, status
      ORDER BY new_leads_reached_7d DESC, total_sent DESC
    `;

    const campaigns = await query<CampaignRow>(campaignQuery, [client_code]);

    const detail: ClientDetail = {
      client,
      trendData,
      campaigns,
    };

    return NextResponse.json(detail);
  } catch (error) {
    console.error('Client detail API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch client details' },
      { status: 500 }
    );
  }
}
