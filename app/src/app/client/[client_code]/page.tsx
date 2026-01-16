/**
 * Client Detail Page
 */

'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import clsx from 'clsx';
import type { ClientDetail, CampaignRow } from '@/lib/types';

// ============================================================================
// TYPES
// ============================================================================

type CampaignSortField = 'campaign_name' | 'total_sent' | 'new_leads_reached_7d' | 'replies_count' | 'reply_rate' | 'bounce_pct_7d' | 'positive_reply' | 'positive_reply_rate';
type CampaignSortOrder = 'asc' | 'desc' | null;

// ============================================================================
// UTILITIES
// ============================================================================

function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

function formatPercentage(value: number, decimals: number = 1): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value * 100) + '%';
}

// ============================================================================
// ICONS
// ============================================================================

function SortAscIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className || "w-3 h-3"}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15 L12 8 L19 15" />
    </svg>
  );
}

function SortDescIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className || "w-3 h-3"}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 9 L12 16 L19 9" />
    </svg>
  );
}

function SortUnsortedIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className || "w-3 h-3"}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15 L12 8 L19 15 M5 9 L12 16 L19 9" />
    </svg>
  );
}

// ============================================================================
// COMPONENTS
// ============================================================================

// Tooltip component
function Tooltip({ content, children }: { content: string; children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-xs rounded shadow-lg whitespace-normal z-50 pointer-events-none max-w-xs text-center leading-tight"
          role="tooltip"
        >
          {content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900" />
        </div>
      )}
    </div>
  );
}

// Sortable Table Header for campaigns
function CampaignSortableHeader({
  field,
  label,
  sortField,
  sortOrder,
  onSort,
  align = 'left',
}: {
  field: CampaignSortField;
  label: string;
  sortField: CampaignSortField | null;
  sortOrder: CampaignSortOrder;
  onSort: (field: CampaignSortField) => void;
  align?: 'left' | 'center' | 'right';
}) {
  const isActive = sortField === field;

  return (
    <th
      className={clsx(
        'px-4 py-3 font-semibold text-xs uppercase tracking-wide border-b whitespace-nowrap bg-slate-50/50',
        align === 'center' && 'text-center',
        align === 'right' && 'text-right',
        align === 'left' && 'text-left',
        isActive ? 'border-blue-500 text-blue-700' : 'border-slate-200 text-slate-600'
      )}
      role="columnheader"
      aria-sort={
        isActive
          ? sortOrder === 'asc'
            ? 'ascending'
            : 'descending'
          : undefined
      }
    >
      <button
        onClick={() => onSort(field)}
        className={clsx(
          'flex items-center gap-2 transition-all',
          align === 'center' && 'justify-center',
          align === 'right' && 'justify-end',
          'focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 rounded',
          isActive && 'text-blue-700',
          !isActive && 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-2 py-1 -mx-2 rounded -my-1'
        )}
        aria-label={`Sort by ${label}${isActive ? (sortOrder === 'asc' ? ' (ascending)' : ' (descending)') : ''}`}
      >
        <span className="font-semibold">{label}</span>
        <span className="flex items-center" aria-hidden="true">
          {isActive && sortOrder ? (
            <span className="text-blue-600">
              {sortOrder === 'asc' ? <SortAscIcon /> : <SortDescIcon />}
            </span>
          ) : (
            <SortUnsortedIcon className="text-slate-300" />
          )}
        </span>
      </button>
    </th>
  );
}

// Status Badge
function StatusBadge({ status }: { status: string | null }) {
  if (!status) return <span className="text-slate-400 text-xs">—</span>;

  const statusLower = status.toLowerCase();
  const isActive = ['active', 'live', 'ongoing'].includes(statusLower);
  const configKey = isActive ? 'active' : statusLower === 'paused' ? 'paused' : 'default';

  const badgeClasses = {
    active: 'inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wide bg-emerald-50 text-emerald-700 border border-emerald-200',
    paused: 'inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wide bg-amber-50 text-amber-700 border border-amber-200',
    default: 'inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wide bg-slate-50 text-slate-600 border border-slate-200',
  };

  return <span className={badgeClasses[configKey]}>{status}</span>;
}

// Reply Rate Badge with threshold styling
function ReplyRateBadge({ value, replies, newLeads }: { value: number | null; replies: number; newLeads: number }) {
  if (value === null) return <span className="text-slate-400 text-xs">—</span>;

  const percentage = value * 100;

  let color = 'text-emerald-700';
  let bg = 'bg-emerald-50';
  let border = 'border-emerald-200';

  if (percentage < 1.5) {
    color = 'text-red-700';
    bg = 'bg-red-50';
    border = 'border-red-200';
  } else if (percentage < 2) {
    color = 'text-amber-700';
    bg = 'bg-amber-50';
    border = 'border-amber-200';
  }

  return (
    <div className="flex flex-col items-end gap-0.5">
      <Tooltip content={`Replies: ${formatNumber(replies)} / New Leads: ${formatNumber(newLeads)} • Target: 2% or higher. Current: ${percentage.toFixed(2)}%`}>
        <span
          className={clsx(
            'inline-flex items-center px-2.5 py-1 rounded-md',
            bg,
            color,
            border,
            'border font-semibold text-xs tabular-nums focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 rounded-md'
          )}
          aria-label={`${percentage.toFixed(2)}% reply rate`}
          tabIndex={0}
        >
          {formatPercentage(value, 1)}
        </span>
      </Tooltip>
      <span className="text-[10px] text-slate-500 tabular-nums">{formatNumber(replies)}</span>
    </div>
  );
}

// Bounce Rate Badge with threshold styling
function BounceRateBadge({ value, bounces, sent }: { value: number | null; bounces: number; sent: number }) {
  if (value === null || sent === 0) return <span className="text-slate-400 text-xs">—</span>;

  const percentage = value * 100;

  let color = 'text-emerald-700';
  let bg = 'bg-emerald-50';
  let border = 'border-emerald-200';

  if (percentage >= 4) {
    color = 'text-red-700';
    bg = 'bg-red-50';
    border = 'border-red-200';
  } else if (percentage >= 2) {
    color = 'text-amber-700';
    bg = 'bg-amber-50';
    border = 'border-amber-200';
  }

  return (
    <div className="flex flex-col items-end gap-0.5">
      <Tooltip content={`Bounces: ${formatNumber(bounces)} / Emails Sent: ${formatNumber(sent)} • Target: Below 2%. Current: ${percentage.toFixed(2)}%`}>
        <span
          className={clsx(
            'inline-flex items-center px-2.5 py-1 rounded-md',
            bg,
            color,
            border,
            'border font-semibold text-xs tabular-nums focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 rounded-md'
          )}
          aria-label={`${percentage.toFixed(2)}% bounce rate`}
          tabIndex={0}
        >
          {formatPercentage(value, 1)}
        </span>
      </Tooltip>
      <span className="text-[10px] text-slate-500 tabular-nums">{formatNumber(bounces)}</span>
    </div>
  );
}

// Positive Reply Rate Badge
function PositiveReplyRateBadge({ value, positives, replies }: { value: number | null; positives: number; replies: number }) {
  const positiveRate = replies > 0 ? positives / replies : null;
  const percentage = positiveRate !== null ? positiveRate * 100 : 0;

  let color = 'text-slate-700';
  let bg = 'bg-slate-50';
  let border = 'border-slate-200';

  if (positiveRate !== null) {
    if (percentage >= 8) {
      color = 'text-emerald-700';
      bg = 'bg-emerald-50';
      border = 'border-emerald-200';
    } else if (percentage >= 5) {
      color = 'text-amber-700';
      bg = 'bg-amber-50';
      border = 'border-amber-200';
    } else {
      color = 'text-red-700';
      bg = 'bg-red-50';
      border = 'border-red-200';
    }
  }

  return (
    <div className="flex flex-col items-end gap-0.5">
      <Tooltip content={`Positive Replies: ${formatNumber(positives)} / Replies: ${formatNumber(replies)} • Target: 8% or higher. Current: ${percentage.toFixed(2)}%`}>
        <span
          className={clsx(
            'inline-flex items-center px-2.5 py-1 rounded-md',
            bg,
            color,
            border,
            'border font-semibold text-xs tabular-nums focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 rounded-md'
          )}
          aria-label={`${percentage.toFixed(2)}% positive reply rate`}
          tabIndex={0}
        >
          {positiveRate !== null ? formatPercentage(positiveRate, 2) : 'N/A'}
        </span>
      </Tooltip>
      <span className="text-[10px] text-slate-500 tabular-nums">{formatNumber(positives)}</span>
    </div>
  );
}

export default function ClientDetailPage() {
  const params = useParams();
  const client_code = params.client_code as string;
  const [detail, setDetail] = useState<ClientDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // Campaign sorting state
  const [campaignSortField, setCampaignSortField] = useState<CampaignSortField>('total_sent');
  const [campaignSortOrder, setCampaignSortOrder] = useState<CampaignSortOrder>('desc');

  // Campaign filter: hide campaigns with 0 new leads
  const [hideZeroLeads, setHideZeroLeads] = useState(true);

  // Campaign sort handler
  const handleCampaignSort = useCallback((field: CampaignSortField) => {
    console.log('Campaign sort clicked:', field, 'current:', campaignSortField, campaignSortOrder);

    if (campaignSortField === field) {
      if (campaignSortOrder === 'asc') {
        console.log('Setting to desc');
        setCampaignSortOrder('desc');
      } else if (campaignSortOrder === 'desc') {
        console.log('Setting to asc');
        setCampaignSortOrder('asc');
      } else {
        console.log('Setting to asc (from null)');
        setCampaignSortOrder('asc');
      }
    } else {
      console.log('New field, setting to desc');
      setCampaignSortField(field);
      setCampaignSortOrder('desc');
    }
  }, [campaignSortField, campaignSortOrder]);

  useEffect(() => {
    fetch(`/api/dashboard/${client_code}`)
      .then(res => {
        if (!res.ok) throw new Error('Client not found');
        return res.json();
      })
      .then(data => {
        setDetail(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch client details:', err);
        setLoading(false);
      });
  }, [client_code]);

  // Sorted and filtered campaigns
  const sortedCampaigns = useMemo(() => {
    if (!detail) return [];

    let campaigns = [...detail.campaigns];

    // Filter out campaigns with 0 new leads if toggle is enabled
    if (hideZeroLeads) {
      campaigns = campaigns.filter(c => c.new_leads_reached_7d > 0);
    }

    console.log('Sorting campaigns:', campaigns.length, 'by', campaignSortField, campaignSortOrder);

    // Sort campaigns
    const sorted = campaigns.sort((a, b) => {
      let aVal = a[campaignSortField as keyof CampaignRow];
      let bVal = b[campaignSortField as keyof CampaignRow];

      console.log('Comparing:', a.campaign_name, typeof aVal, aVal, 'vs', b.campaign_name, typeof bVal, bVal);

      if (aVal === null && bVal === null) return 0;
      if (aVal === null) return 1;
      if (bVal === null) return -1;

      // Convert to number if it's a string that looks like a number
      if (typeof aVal === 'string' && !isNaN(Number(aVal))) {
        aVal = Number(aVal);
      }
      if (typeof bVal === 'string' && !isNaN(Number(bVal))) {
        bVal = Number(bVal);
      }

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return campaignSortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return campaignSortOrder === 'asc' ? aVal - bVal : bVal - aVal;
      }

      return 0;
    });

    console.log('First 3 campaigns after sort:',
      sorted[0]?.campaign_name, sorted[0]?.[campaignSortField as keyof CampaignRow],
      sorted[1]?.campaign_name, sorted[1]?.[campaignSortField as keyof CampaignRow],
      sorted[2]?.campaign_name, sorted[2]?.[campaignSortField as keyof CampaignRow]
    );

    return sorted;
  }, [detail, campaignSortField, campaignSortOrder, hideZeroLeads]);

  if (loading) {
    return <div className="p-8 text-slate-600">Loading client details...</div>;
  }

  if (!detail) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="max-w-[1800px] mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-slate-900 mb-4">Client Not Found</h1>
            <Link href="/" className="text-blue-600 hover:text-blue-700">Return to Dashboard</Link>
          </div>
        </div>
      </main>
    );
  }

  const { client, trendData } = detail;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 mb-4"
          >
            ← Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">{client.client_code}</h1>
              <p className="text-sm text-slate-600 mt-1">{client.client_company_name || client.client_name}</p>
            </div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
              client.rag_status === 'Red' ? 'bg-red-100 text-red-900' :
              client.rag_status === 'Yellow' ? 'bg-amber-100 text-amber-900' :
              'bg-green-100 text-green-900'
            }`}>
              {client.rag_status}
            </span>
          </div>
          {client.rag_reason && (
            <p className="text-sm text-slate-700 mt-2 bg-slate-50 px-3 py-2 rounded-lg inline-block">
              {client.rag_reason}
            </p>
          )}
        </div>
      </header>

      <div className="max-w-[1800px] mx-auto px-6 py-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          <MetricCard label="Weekly Target" value={client.weekly_target_int ? client.weekly_target_int.toLocaleString() : 'N/A'} />
          <MetricCard label="Contacted (7d)" value={client.contacted_7d?.toLocaleString() || 0} />
          <MetricCard label="Volume Attainment" value={client.volume_attainment ? `${(client.volume_attainment * 100).toFixed(1)}%` : 'N/A'} />
          <MetricCard label="Reply Rate" value={client.reply_rate_7d ? `${(client.reply_rate_7d * 100).toFixed(2)}%` : 'N/A'} />
          <MetricCard label="Bounce Rate" value={client.bounce_pct_7d ? `${(client.bounce_pct_7d * 100).toFixed(2)}%` : 'N/A'} />
        </div>

        {/* Owners */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-3">Account Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-slate-600">Account Manager:</span>
              <span className="ml-2 text-slate-900 font-medium">{client.assigned_account_manager_name || 'Unassigned'}</span>
            </div>
            <div>
              <span className="text-slate-600">Inbox Manager:</span>
              <span className="ml-2 text-slate-900 font-medium">{client.assigned_inbox_manager_name || 'Unassigned'}</span>
            </div>
            <div>
              <span className="text-slate-600">SDR:</span>
              <span className="ml-2 text-slate-900 font-medium">{client.assigned_sdr_name || 'Unassigned'}</span>
            </div>
          </div>
        </div>

        {/* Campaign Breakdown */}
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Campaign Breakdown (Last 7 Days)</h2>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={hideZeroLeads}
                onChange={(e) => setHideZeroLeads(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span className="text-sm text-slate-700 font-medium">
                Hide campaigns with 0 unique leads
              </span>
              {hideZeroLeads && (
                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  {sortedCampaigns.length} shown
                </span>
              )}
            </label>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <CampaignSortableHeader
                    field="campaign_name"
                    label="Campaign"
                    sortField={campaignSortField}
                    sortOrder={campaignSortOrder}
                    onSort={handleCampaignSort}
                    align="left"
                  />
                  <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide border-b-2 border-slate-200 text-slate-600 bg-slate-50/50">
                    Status
                  </th>
                  <CampaignSortableHeader
                    field="total_sent"
                    label="Emails Sent"
                    sortField={campaignSortField}
                    sortOrder={campaignSortOrder}
                    onSort={handleCampaignSort}
                    align="right"
                  />
                  <CampaignSortableHeader
                    field="new_leads_reached_7d"
                    label="New Leads"
                    sortField={campaignSortField}
                    sortOrder={campaignSortOrder}
                    onSort={handleCampaignSort}
                    align="right"
                  />
                  <CampaignSortableHeader
                    field="replies_count"
                    label="Replies"
                    sortField={campaignSortField}
                    sortOrder={campaignSortOrder}
                    onSort={handleCampaignSort}
                    align="right"
                  />
                  <CampaignSortableHeader
                    field="reply_rate"
                    label="Reply Rate"
                    sortField={campaignSortField}
                    sortOrder={campaignSortOrder}
                    onSort={handleCampaignSort}
                    align="right"
                  />
                  <CampaignSortableHeader
                    field="bounce_pct_7d"
                    label="Bounce Rate"
                    sortField={campaignSortField}
                    sortOrder={campaignSortOrder}
                    onSort={handleCampaignSort}
                    align="right"
                  />
                  <CampaignSortableHeader
                    field="positive_reply"
                    label="Positives"
                    sortField={campaignSortField}
                    sortOrder={campaignSortOrder}
                    onSort={handleCampaignSort}
                    align="right"
                  />
                  <CampaignSortableHeader
                    field="positive_reply_rate"
                    label="Positive Rate"
                    sortField={campaignSortField}
                    sortOrder={campaignSortOrder}
                    onSort={handleCampaignSort}
                    align="right"
                  />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {sortedCampaigns.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-slate-600">No campaigns in last 7 days</td>
                  </tr>
                ) : (
                  sortedCampaigns.map((campaign, index) => (
                    <tr
                      key={`${campaign.campaign_id}-${campaignSortField}-${campaignSortOrder}-${index}`}
                      className="hover:bg-slate-50"
                    >
                      <td className="px-4 py-3 text-slate-900 font-medium">{campaign.campaign_name}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={campaign.status} />
                      </td>
                      <td className="px-4 py-3 text-right text-slate-900 tabular-nums">{formatNumber(campaign.total_sent)}</td>
                      <td className="px-4 py-3 text-right text-slate-900 tabular-nums">{formatNumber(campaign.new_leads_reached_7d)}</td>
                      <td className="px-4 py-3 text-right text-slate-900 tabular-nums">{formatNumber(campaign.replies_count)}</td>
                      <td className="px-4 py-3 text-right">
                        <ReplyRateBadge
                          value={campaign.reply_rate}
                          replies={campaign.replies_count}
                          newLeads={campaign.new_leads_reached_7d}
                        />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <BounceRateBadge
                          value={campaign.bounce_pct_7d}
                          bounces={campaign.bounce_count}
                          sent={campaign.total_sent}
                        />
                      </td>
                      <td className="px-4 py-3 text-right text-slate-900 tabular-nums">{formatNumber(campaign.positive_reply)}</td>
                      <td className="px-4 py-3 text-right">
                        <PositiveReplyRateBadge
                          value={campaign.positive_reply_rate}
                          positives={campaign.positive_reply}
                          replies={campaign.replies_count}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

function MetricCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4">
      <div className="text-xs text-slate-600 mb-1">{label}</div>
      <div className="text-2xl font-semibold text-slate-900">{value}</div>
    </div>
  );
}
