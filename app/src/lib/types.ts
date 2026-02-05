/**
 * TypeScript types for Client Health Dashboard
 */

export interface ClientRow {
  client_id: number;
  client_code: string;
  client_name: string | null;
  client_company_name: string | null;
  relationship_status: string | null;
  assigned_account_manager_name: string | null;
  assigned_inbox_manager_name: string | null;
  assigned_sdr_name: string | null;
  weekly_target_int: number | null;
  weekly_target_missing: boolean;
  closelix: boolean;
  contacted_7d: number;
  replies_7d: number;
  positives_7d: number;
  bounces_7d: number;
  reply_rate_7d: number | null;
  positive_reply_rate_7d: number | null;
  bounce_pct_7d: number | null;
  new_leads_reached_7d: number;
  prorated_target: number | null;
  volume_attainment: number | null;
  pcpl_proxy_7d: number | null;
  not_contacted_leads: number;
  deliverability_flag: boolean;
  volume_flag: boolean;
  mmf_flag: boolean;
  data_missing_flag: boolean;
  data_stale_flag: boolean;
  rag_status: 'Red' | 'Yellow' | 'Green';
  rag_reason: string | null;
  most_recent_reporting_end_date: string | null;
  computed_at: string;
}

export interface ClientDetail {
  client: ClientRow;
  trendData: TrendDataPoint[];
  campaigns: CampaignRow[];
}

export interface TrendDataPoint {
  end_date: string;
  contacted: number;
  replies: number;
  positives: number;
  bounces: number;
  reply_rate: number;
  positive_reply_rate: number;
}

export interface CampaignRow {
  campaign_id: string;
  campaign_name: string;
  status: string;
  start_date: string;
  end_date: string;
  total_sent: number;
  new_leads_reached_7d: number; // Unique leads contacted
  replies_count: number;
  positive_reply: number;
  bounce_count: number;
  reply_rate: number;
  positive_reply_rate: number;
  bounce_pct_7d: number | null;
  weekly_target_int: number | null;
  volume_attainment: number | null;
}

export interface UnmatchedMapping {
  match_type: 'client_without_reporting' | 'reporting_without_client';
  client_code: string | null;
  client_name_norm: string;
  last_seen_date: string;
  record_count: number;
}

export interface DashboardFilters {
  relationship_status?: string;
  closelix?: boolean;
  assigned_account_manager_name?: string;
  assigned_inbox_manager_name?: string;
  assigned_sdr_name?: string;
  rag_status?: 'Red' | 'Yellow' | 'Green';
  deliverability_flag?: boolean;
  mmf_flag?: boolean;
  volume_flag?: boolean;
  data_missing_flag?: boolean;
  client_code_search?: string;
  pcpl_range?: string;
  reply_rate_range?: string;
  bounce_rate_range?: string;
  positive_reply_rate_range?: string;
  target_status?: 'below' | 'above';
}

export interface FilterOptions {
  relationship_statuses: string[];
  account_managers: string[];
  inbox_managers: string[];
  sdrs: string[];
}
