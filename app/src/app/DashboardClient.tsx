'use client';

/**
 * Client Health Dashboard - Premium Modern Design
 * Enterprise/Finance personality: Sophistication & Trust
 * Foundation: Cool (slate), Depth: Layered shadows, Spacing: 4px grid
 */

import { useEffect, useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import clsx from 'clsx';
import type { ClientRow, FilterOptions } from '@/lib/types';
import { ColumnSelector, type ColumnDefinition } from '@/components/ColumnSelector';

// ============================================================================
// DESIGN TOKENS
// ============================================================================

const tokens = {
  // Spacing: 4px grid
  spacing: {
    1: '4px',   // Micro gaps
    2: '8px',   // Tight, within components
    3: '12px',  // Standard
    4: '16px',  // Comfortable
    6: '24px',  // Generous
    8: '32px',  // Section gaps
    16: '64px', // Major separation
  },

  // Contrast hierarchy
  colors: {
    foreground: 'text-slate-900',   // Primary text
    secondary: 'text-slate-600',    // Supporting text
    muted: 'text-slate-400',        // Labels, metadata
    faint: 'text-slate-200',        // Very subtle
    border: 'border-slate-200',     // Borders, dividers
    background: 'bg-slate-50',      // Page background
    surface: 'bg-white',            // Card surface
  },

  // Layered shadows for depth
  shadows: {
    card: '0 0 0 0.5px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.03), 0 4px 8px rgba(0, 0, 0, 0.02)',
    subtle: '0 1px 3px rgba(0, 0, 0, 0.08)',
  },

  // Sharp system for technical/enterprise feel
  radius: {
    sm: '4px',
    md: '6px',
    lg: '8px',
  },

  // Smooth transitions
  transition: '150ms cubic-bezier(0.16, 1, 0.3, 1)',
};

// ============================================================================
// COLUMN DEFINITIONS
// ============================================================================

/**
 * Column definitions for the client health dashboard table
 * Used for column visibility toggle functionality
 */
const COLUMN_DEFINITIONS: ColumnDefinition[] = [
  // Health & Status
  {
    id: 'rag_status',
    label: 'Health (RAG)',
    category: 'Health & Status',
    defaultVisible: true,
  },
  {
    id: 'contacted_7d',
    label: 'Emails Sent (7d)',
    category: 'Health & Status',
    defaultVisible: false,
  },
  {
    id: 'new_leads_reached_7d',
    label: 'New Leads (7d)',
    category: 'Health & Status',
    defaultVisible: true,
  },

  // Performance Metrics
  {
    id: 'prorated_target',
    label: 'Target (Expected)',
    category: 'Performance Metrics',
    defaultVisible: true,
  },
  {
    id: 'replies_7d',
    label: 'Replies (7d)',
    category: 'Performance Metrics',
    defaultVisible: true,
  },
  {
    id: 'reply_rate_7d',
    label: 'Reply Rate',
    category: 'Performance Metrics',
    defaultVisible: true,
  },
  {
    id: 'bounce_pct_7d',
    label: 'Bounce Rate',
    category: 'Performance Metrics',
    defaultVisible: true,
  },
  {
    id: 'positives_7d',
    label: 'Positive Replies (7d)',
    category: 'Performance Metrics',
    defaultVisible: true,
  },
  {
    id: 'positive_reply_rate_7d',
    label: 'Positive Reply Rate',
    category: 'Performance Metrics',
    defaultVisible: true,
  },
  {
    id: 'pcpl',
    label: 'PCPL',
    category: 'Performance Metrics',
    defaultVisible: true,
  },

  // Target & Attainment
  {
    id: 'volume_attainment',
    label: 'Target (Attainment)',
    category: 'Target & Attainment',
    defaultVisible: true,
  },
  {
    id: 'not_contacted_leads',
    label: 'Not Contacted',
    category: 'Target & Attainment',
    defaultVisible: true,
  },

  // Financial
  {
    id: 'bonus_pool_monthly',
    label: 'Bonus Pool',
    category: 'Financial',
    defaultVisible: true,  // Now visible with data from Supabase
  },
];

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Format numbers with thousands separators, no abbreviations
 * Uses Intl.NumberFormat for consistent, locale-aware formatting
 */
function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

/**
 * Format percentages with controlled decimals
 */
function formatPercentage(value: number, decimals: number = 1): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value * 100) + '%';
}

// ============================================================================
// ICONS
// ============================================================================

// Simple sorting arrows
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7-7" />
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7M5 9l7 7-7-7" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className || "w-4 h-4"}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className || "w-4 h-4"}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.932-3.006l-.496-2.378C19.163 6.163 18.163 5 17 5H7c-1.163 0-2.163.163-2.502 1.625l-.496 2.378C3.667 9.837 4.667 11 6 11h12c1.333 0 2.333-1.163 1.972-2.625l-.496-2.378z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01" />
    </svg>
  );
}

function TrendingDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className || "w-4 h-4"}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
    </svg>
  );
}

function MessageIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className || "w-4 h-4"}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className || "w-4 h-4"}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

function RefreshIcon({ className, spinning }: { className?: string; spinning?: boolean }) {
  return (
    <svg
      className={className || "w-4 h-4"}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
      style={spinning ? { animation: 'spin 1s linear infinite' } : undefined}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );
}

function FilterIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className || "w-4 h-4"}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  );
}

// ============================================================================
// COMPONENTS
// ============================================================================

// Date range utility - Previous Friday to Yesterday (inclusive)
// Always shows from previous Friday to yesterday, no special cases
function getDateRangeInfo(): { start: string; end: string; display: string } {
  const today = new Date();
  const now = new Date(today.getTime());

  // Get current day of week in UTC (0=Sunday, 1=Monday, ..., 5=Friday, 6=Saturday)
  const currentDay = now.getUTCDay();

  // End date: Always yesterday at midnight UTC
  const endDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1));
  const endStr = endDate.toISOString().split('T')[0];

  // Start date: Always go back to previous Friday
  // Calculate days to go back:
  // Sunday (0): go back 2 days (Sun->Sat->Fri) = 2 days
  // Monday (1): go back 3 days (Mon->Sun->Sat->Fri) = 3 days
  // Tuesday (2): go back 4 days (Tue->Mon->Sun->Sat->Fri) = 4 days
  // Wednesday (3): go back 5 days = 5 days
  // Thursday (4): go back 6 days = 6 days
  // Friday (5): go back 7 days to previous Friday = 7 days
  // Saturday (6): go back 1 day (Sat->Fri) = 1 day
  let daysToSubtract: number;
  if (currentDay === 0) {  // Sunday
    daysToSubtract = 2;
  } else if (currentDay === 6) {  // Saturday
    daysToSubtract = 1;
  } else {  // Monday through Friday
    daysToSubtract = currentDay + 2;
  }

  const startDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - daysToSubtract));
  const startStr = startDate.toISOString().split('T')[0];

  // Format for display
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', timeZone: 'UTC' };
  const startDisplay = startDate.toLocaleDateString('en-US', options);
  const endDisplay = endDate.toLocaleDateString('en-US', options);

  return {
    start: startStr,
    end: endStr,
    display: `${startDisplay} - ${endDisplay} (UTC)`
  };
}

// Status Chip for data freshness (compact)
function StatusChip({ isStale }: { isStale: boolean }) {
  return (
    <div
      className={clsx(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-md border font-semibold text-xs',
        isStale
          ? 'bg-amber-50 text-amber-700 border-amber-200'
          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
      )}
    >
      {isStale ? (
        <>
          <AlertIcon className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Data needs refresh</span>
        </>
      ) : (
        <>
          <CheckIcon className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Data current</span>
        </>
      )}
    </div>
  );
}

// KPI Pill Component (for Red/Amber/Green counts)
function KpiPill({ status, count, color }: { status: string; count: number; color: 'red' | 'amber' | 'green' }) {
  const styles = {
    red: 'bg-red-50 text-red-700 border-red-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };

  const dotColors = {
    red: 'bg-red-500',
    amber: 'bg-amber-500',
    green: 'bg-emerald-500',
  };

  return (
    <div
      className={clsx(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-md border font-medium text-xs whitespace-nowrap',
        styles[color]
      )}
    >
      <span className={clsx('w-2 h-2 rounded-full', dotColors[color])} aria-hidden="true" />
      <span>{status} {formatNumber(count)}</span>
    </div>
  );
}

// KPI Tile Component (individual metric)
function KpiTile({
  label,
  value,
  align = 'left'
}: {
  label: string;
  value: string | number;
  align?: 'left' | 'center' | 'right';
}) {
  return (
    <div className={clsx(
      'flex flex-col justify-center min-w-[120px] px-4 py-3',
      align === 'center' && 'text-center',
      align === 'right' && 'items-end text-right'
    )}>
      {/* Label - single line, non-wrapping */}
      <div className="text-xs font-medium text-slate-500 uppercase tracking-wide whitespace-nowrap overflow-hidden text-ellipsis">
        {label}
      </div>
      {/* Value - large, bold, tabular */}
      <div className="text-2xl font-semibold text-slate-900 tabular-nums mt-1">
        {value}
      </div>
    </div>
  );
}

// Compact KPI Tile (for horizontal layout)
function KpiTileCompact({
  label,
  value
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex flex-col justify-center min-w-[90px] px-3 py-2">
      {/* Label - smaller, single line */}
      <div className="text-[10px] font-medium text-slate-500 uppercase tracking-wide whitespace-nowrap overflow-hidden text-ellipsis">
        {label}
      </div>
      {/* Value - medium size, bold, tabular */}
      <div className="text-lg font-semibold text-slate-900 tabular-nums mt-0.5">
        {value}
      </div>
    </div>
  );
}

// Tooltip component with proper background
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
          style={{ transition: tokens.transition }}
          role="tooltip"
        >
          {content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900" />
        </div>
      )}
    </div>
  );
}

// Sortable Table Header with arrow icons
function SortableHeader({
  field,
  label,
  sortField,
  sortOrder,
  onSort,
  align = 'left',
  sticky = false,
}: {
  field: SortField;
  label: string;
  sortField: SortField | null;
  sortOrder: 'asc' | 'desc' | null;
  onSort: (field: SortField) => void;
  align?: 'left' | 'center' | 'right';
  sticky?: boolean;
}) {
  const isActive = sortField === field;

  return (
    <th
      className={clsx(
        'px-4 py-3.5 font-semibold text-xs uppercase tracking-wide border-b-2 whitespace-nowrap bg-slate-50/50',
        align === 'center' && 'text-center',
        align === 'right' && 'text-right',
        align === 'left' && 'text-left',
        isActive ? 'border-blue-500 text-blue-700' : 'border-slate-200 text-slate-600',
        sticky && 'left-0 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]'
      )}
      style={sticky ? { position: 'sticky', left: '0' } as React.CSSProperties : undefined}
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
        style={{ transition: tokens.transition }}
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

// RAG Status with visual indicators
function RAGStatus({ status }: { status: 'Red' | 'Yellow' | 'Green' }) {
  const config = {
    Red: {
      bg: 'bg-red-50',
      text: 'text-red-700',
      dot: 'bg-red-500',
      border: 'border-red-200',
      description: 'Critical: needs immediate attention',
      display: 'Red'
    },
    Yellow: {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      dot: 'bg-amber-500',
      border: 'border-amber-200',
      description: 'Warning: monitor closely',
      display: 'Amber'
    },
    Green: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      dot: 'bg-emerald-500',
      border: 'border-emerald-200',
      description: 'Healthy: within acceptable thresholds',
      display: 'Green'
    },
  };

  const { bg, text, dot, border, description, display } = config[status];

  return (
    <Tooltip content={description}>
      <div
        className={clsx(
          bg,
          text,
          border,
          'inline-flex items-center gap-2 px-3 py-1.5 rounded-md border font-semibold text-[11px] uppercase tracking-wide cursor-pointer transition-colors hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2'
        )}
        style={{ transition: tokens.transition }}
        role="status"
        aria-label={"RAG status: " + display}
        tabIndex={0}
      >
        <span className={clsx('w-2 h-2 rounded-full', dot)} aria-hidden="true"></span>
        {display}
      </div>
    </Tooltip>
  );
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

// Bounce Rate Badge with threshold styling (higher is worse)
function BounceRateBadge({ value, bounces, contacted }: { value: number | null; bounces: number; contacted: number }) {
  if (value === null || contacted === 0) return <span className="text-slate-400 text-xs">—</span>;

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
      <Tooltip content={`Bounces: ${formatNumber(bounces)} / Emails Sent: ${formatNumber(contacted)} • Target: Below 2%. Current: ${percentage.toFixed(2)}%`}>
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

// Positive Reply Rate Badge with threshold styling (higher is better)
function PositiveReplyRateBadge({ value, positives, replies }: { value: number | null; positives: number; replies: number }) {
  // Calculate PRR as positives / replies (not positives / new leads)
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

// Target Status Badge - Binary Red/Green based on new_leads vs prorated_target
function TargetStatusBadge({ proratedTarget, newLeads }: { proratedTarget: number | null; newLeads: number }) {
  if (proratedTarget === null || proratedTarget === 0) {
    return <span className="text-slate-400 text-xs">—</span>;
  }

  const isAboveTarget = newLeads >= proratedTarget;
  
  let color = isAboveTarget ? 'text-emerald-700' : 'text-red-700';
  let bg = isAboveTarget ? 'bg-emerald-50' : 'bg-red-50';
  let border = isAboveTarget ? 'border-emerald-200' : 'border-red-200';

  return (
    <div className="flex flex-col items-end gap-0.5">
      <Tooltip content={`New Leads: ${formatNumber(newLeads)} / Target (Expected): ${formatNumber(Math.round(proratedTarget))} • ${isAboveTarget ? 'At or above target' : 'Below target'}`}>
        <span
          className={clsx(
            'inline-flex items-center px-2.5 py-1 rounded-md',
            bg,
            color,
            border,
            'border font-semibold text-xs tabular-nums focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 rounded-md'
          )}
          aria-label={`Target status: ${isAboveTarget ? 'At/Above target' : 'Below target'}`}
          tabIndex={0}
        >
          {formatNumber(Math.round(proratedTarget))}
        </span>
      </Tooltip>
      <span className="text-[10px] text-slate-500 tabular-nums">{formatNumber(newLeads)}</span>
    </div>
  );
}

// Attainment Badge with progress bar - NOW COMPARING NEW LEADS TO TARGET
function AttainmentBadge({ value, weeklyTarget, newLeads }: { value: number | null; weeklyTarget: number | null; newLeads: number }) {
  if (weeklyTarget === null) {
    return (
      <Tooltip content="Weekly target not set">
        <span className="text-slate-400 text-xs">Target missing</span>
      </Tooltip>
    );
  }

  // Calculate attainment based on NEW LEADS, not emails sent
  const attainment = weeklyTarget > 0 ? newLeads / weeklyTarget : null;
  const percentage = attainment !== null ? attainment * 100 : 0;

  let color = 'text-emerald-700';
  let bgColor = 'bg-emerald-500';

  if (percentage < 50) {
    color = 'text-red-700 font-semibold';
    bgColor = 'bg-red-500';
  } else if (percentage < 90) {
    color = 'text-amber-700 font-semibold';
    bgColor = 'bg-amber-500';
  }
  // 90% and above is green (default)

  return (
    <Tooltip content={`${percentage.toFixed(1)}% of weekly target • New Leads: ${formatNumber(newLeads)} / Target: ${formatNumber(weeklyTarget)}`}>
      <div className="flex flex-col items-end gap-1">
        <div className="flex items-center gap-2">
          <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              className={clsx('h-full transition-all', bgColor)}
              style={{ width: `${Math.min(percentage, 100)}%`, transition: tokens.transition }}
              aria-hidden="true"
            />
          </div>
          <span className={clsx('text-xs font-semibold tabular-nums', color)} aria-label={`${percentage.toFixed(1)}% attainment`}>
            {formatPercentage(attainment || 0, 1)}
          </span>
        </div>
        <span className="text-[10px] text-slate-500 tabular-nums">/ {formatNumber(weeklyTarget)}</span>
      </div>
    </Tooltip>
  );
}

// PCPL Badge (Prospects Contacted Per Lead)
function PCPLBadge({ newLeads, positives }: { newLeads: number; positives: number }) {
  // PCPL = new leads / positive replies (lower is better - how many leads needed per positive reply)
  const pcpl = positives > 0 ? newLeads / positives : null;
  const displayValue = pcpl !== null ? pcpl.toFixed(1) : 'N/A';

  // Color coding: lower is better (green), higher is worse (red/amber)
  // Thresholds: 0-500 green, 501-800 amber, 800+ red
  let colorClass = 'text-slate-700';
  if (pcpl !== null) {
    if (pcpl <= 500) {
      colorClass = 'text-emerald-700'; // Great: 0-500 leads per positive
    } else if (pcpl <= 800) {
      colorClass = 'text-amber-700'; // Okay: 501-800 leads per positive
    } else {
      colorClass = 'text-red-700'; // Poor: more than 800 leads per positive
    }
  }

  return (
    <div className="flex flex-col items-end gap-0.5">
      <Tooltip content={`PCPL: Leads Contacted Per Positive Reply (lower is better) • ${formatNumber(newLeads)} leads / ${formatNumber(positives)} positives = ${displayValue} leads per positive reply`}>
        <span
          className={clsx(
            'inline-flex items-center px-2.5 py-1 rounded-md',
            'bg-slate-50 border border-slate-200',
            colorClass,
            'border font-semibold text-xs tabular-nums focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 rounded-md'
          )}
          aria-label={`PCPL: ${displayValue} leads per positive reply. Lower is better.`}
          tabIndex={0}
        >
          {displayValue}
        </span>
      </Tooltip>
      <span className="text-[10px] text-slate-500 tabular-nums">PCPL</span>
    </div>
  );
}

// Issues Flags with consistent icon styling
function IssuesFlags({ client }: { client: ClientRow }) {
  const flags = [];

  if (client.deliverability_flag) {
    flags.push(
      <Tooltip key="deliv" content={`Deliverability risk: Reply rate below 2% or bounce rate 5% or higher`}>
        <TrendingDownIcon className="w-4 h-4 text-red-600" aria-label="Deliverability risk" />
      </Tooltip>
    );
  }

  if (client.volume_flag && client.weekly_target_int) {
    flags.push(
      <Tooltip key="vol" content="Volume risk: New Leads below 80% of weekly target">
        <AlertIcon className="w-4 h-4 text-amber-600" aria-label="Volume risk" />
      </Tooltip>
    );
  }

  if (client.mmf_flag) {
    flags.push(
      <Tooltip key="mmf" content="MMF risk: Positive reply rate below 0.2%">
        <MessageIcon className="w-4 h-4 text-amber-600" aria-label="MMF risk" />
      </Tooltip>
    );
  }

  if (client.data_missing_flag) {
    flags.push(
      <Tooltip key="miss" content="No data: No contacted volume in last 7 days">
        <span
          className="inline-flex items-center justify-center w-5 h-5 rounded bg-slate-100 text-slate-600 text-[11px] font-semibold border border-slate-200"
          aria-label="No data"
        >
          !
        </span>
      </Tooltip>
    );
  }

  if (flags.length === 0) {
    return (
      <Tooltip content="All metrics within acceptable thresholds">
        <CheckIcon className="w-4 h-4 text-emerald-600" aria-label="No issues" />
      </Tooltip>
    );
  }

  return <div className="flex gap-1.5">{flags}</div>;
}

// ============================================================================
// MAIN DASHBOARD COMPONENT
// ============================================================================

// Added all sortable fields
type SortField = 'client_code' | 'rag_status' | 'new_leads_reached_7d' | 'prorated_target' | 'contacted_7d' | 'replies_7d' | 'reply_rate_7d' | 'bounce_pct_7d' | 'positives_7d' | 'positive_reply_rate_7d' | 'pcpl' | 'volume_attainment' | 'not_contacted_leads' | 'bonus_pool_monthly';
type SortOrder = 'asc' | 'desc' | null;

export default function DashboardClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [clients, setClients] = useState<ClientRow[]>([]);
  // Default to showing only active clients (note: database uses UPPERCASE)
  const [filters, setFilters] = useState<Record<string, any>>({ relationship_status: 'ACTIVE' });
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  const [loading, setLoading] = useState(true);
  const [staleData, setStaleData] = useState(false);
  const [sortField, setSortField] = useState<SortField>('new_leads_reached_7d');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedClients, setSelectedClients] = useState<Set<number>>(new Set());
  const [refreshing, setRefreshing] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState<string | null>(null);
  // Local search input state for immediate feedback
  const [searchInputValue, setSearchInputValue] = useState<string>('');

  // Column visibility state - initialize from localStorage or defaults
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('client_dashboard_visible_columns');
      if (saved) {
        try {
          return new Set(JSON.parse(saved));
        } catch (e) {
          console.error('Failed to parse saved column visibility:', e);
        }
      }
    }
    // Default to columns marked as defaultVisible
    return new Set(COLUMN_DEFINITIONS.filter(col => col.defaultVisible).map(col => col.id));
  });

  // ==========================================================================
  // URL STATE MANAGEMENT
  // ==========================================================================

  // Handle search submission - updates filter only on Enter or blur
  const handleSearchSubmit = useCallback((value: string) => {
    setFilters(prev => ({ ...prev, client_code_search: value.trim() || undefined }));
  }, []);

  // Initialize state from URL on mount
  useEffect(() => {
    if (!searchParams) return;

    const urlFilters: Record<string, any> = {};

    // Parse filter params from URL
    const relationshipStatus = searchParams.get('relationship_status');
    if (relationshipStatus) urlFilters.relationship_status = relationshipStatus;

    const closelix = searchParams.get('closelix');
    if (closelix !== null) urlFilters.closelix = closelix === 'true';

    const accountManager = searchParams.get('assigned_account_manager_name');
    if (accountManager) urlFilters.assigned_account_manager_name = accountManager;

    const inboxManager = searchParams.get('assigned_inbox_manager_name');
    if (inboxManager) urlFilters.assigned_inbox_manager_name = inboxManager;

    const sdrName = searchParams.get('assigned_sdr_name');
    if (sdrName) urlFilters.assigned_sdr_name = sdrName;

    const ragStatus = searchParams.get('rag_status');
    if (ragStatus) urlFilters.rag_status = ragStatus;

    const deliverability = searchParams.get('deliverability_flag');
    if (deliverability !== null) urlFilters.deliverability_flag = deliverability === 'true';

    const mmf = searchParams.get('mmf_flag');
    if (mmf !== null) urlFilters.mmf_flag = mmf === 'true';

    const volume = searchParams.get('volume_flag');
    if (volume !== null) urlFilters.volume_flag = volume === 'true';

    const dataMissing = searchParams.get('data_missing_flag');
    if (dataMissing !== null) urlFilters.data_missing_flag = dataMissing === 'true';

    const clientSearch = searchParams.get('client_code_search');
    if (clientSearch) {
      urlFilters.client_code_search = clientSearch;
      setSearchInputValue(clientSearch);
    }

    const pcplRange = searchParams.get('pcpl_range');
    if (pcplRange) urlFilters.pcpl_range = pcplRange;

    const replyRateRange = searchParams.get('reply_rate_range');
    if (replyRateRange) urlFilters.reply_rate_range = replyRateRange;

    const bounceRateRange = searchParams.get('bounce_rate_range');
    if (bounceRateRange) urlFilters.bounce_rate_range = bounceRateRange;

    const positiveReplyRateRange = searchParams.get('positive_reply_rate_range');
    if (positiveReplyRateRange) urlFilters.positive_reply_rate_range = positiveReplyRateRange;

    const targetStatus = searchParams.get('target_status');
    if (targetStatus) urlFilters.target_status = targetStatus as 'below' | 'above';

    // Update filters from URL if any exist
    if (Object.keys(urlFilters).length > 0) {
      setFilters(prev => ({ ...prev, ...urlFilters }));
    }

    // Parse sort params from URL
    const sort = searchParams.get('sort') as SortField | null;
    const order = searchParams.get('order') as SortOrder | null;

    if (sort) setSortField(sort);
    if (order) setSortOrder(order);
  }, [searchParams]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    // Add filters to URL
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        // Skip default relationship_status if it's the only filter
        if (key === 'relationship_status' && value === 'ACTIVE' && Object.keys(filters).length === 1) {
          return;
        }
        params.append(key, String(value));
      }
    });

    // Add sort to URL
    if (sortField) params.append('sort', sortField);
    if (sortOrder) params.append('order', sortOrder);

    // Update URL without page reload
    const queryString = params.toString();
    const newPath = queryString ? `/?${queryString}` : '/';

    router.push(newPath, { scroll: false });
  }, [filters, sortField, sortOrder, router]);

  // Save column visibility to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('client_dashboard_visible_columns', JSON.stringify(Array.from(visibleColumns)));
    }
  }, [visibleColumns]);

  // ==========================================================================
  // DATA REFRESH HANDLER
  // ==========================================================================

  const handleRefresh = async () => {
    setRefreshing(true);
    setRefreshMessage(null);

    try {
      const response = await fetch('/api/dashboard/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setRefreshMessage(`✓ Refreshed in ${data.duration}! (Not contacted leads: updated daily at 3:00 AM UTC)`);

        // Auto-refresh the page data after 2 seconds
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else if (response.status === 207) {
        // Partial success (207 Multi-Status)
        setRefreshMessage(`⚠ Refreshed with warnings in ${data.duration}. Check console for details.`);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        setRefreshMessage('✗ Failed to refresh. Please try again or contact tech team.');
        setTimeout(() => setRefreshMessage(null), 5000);
      }
    } catch (error) {
      console.error('Refresh error:', error);
      setRefreshMessage('✗ Failed to refresh. Please try again.');
      setTimeout(() => setRefreshMessage(null), 5000);
    } finally {
      setRefreshing(false);
    }
  };

  // ==========================================================================
  // COLUMN VISIBILITY HANDLERS
  // ==========================================================================

  const handleColumnToggle = useCallback((columnId: string) => {
    setVisibleColumns(prev => {
      const newSet = new Set(prev);
      if (newSet.has(columnId)) {
        newSet.delete(columnId);
      } else {
        newSet.add(columnId);
      }
      return newSet;
    });
  }, []);

  const handleShowAllColumns = useCallback(() => {
    setVisibleColumns(new Set(COLUMN_DEFINITIONS.map(col => col.id)));
  }, []);

  const handleHideAllColumns = useCallback(() => {
    // Don't allow hiding all columns - keep at least one essential column
    setVisibleColumns(new Set(['rag_status', 'new_leads_reached_7d']));
  }, []);

  useEffect(() => {
    fetch('/api/dashboard/filters')
      .then(res => res.json())
      .then(data => setFilterOptions(data))
      .catch(err => console.error('Failed to fetch filters:', err));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      // Skip calculated field filters for API (will be filtered client-side)
      const calculatedFields = ['pcpl_range', 'reply_rate_range', 'bounce_rate_range', 'positive_reply_rate_range', 'target_status'];
      if (!calculatedFields.includes(key) && value !== undefined && value !== null && value !== '') {
        params.append(key, String(value));
      }
    });

    fetch(`/api/dashboard?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        let filteredData = data.data || [];

        // Apply PCPL filter client-side
        if (filters.pcpl_range) {
          filteredData = filteredData.filter((c: ClientRow) => {
            const newLeads = c.new_leads_reached_7d || 0;
            const positives = c.positives_7d || 0;
            const pcpl = positives > 0 ? newLeads / positives : null;

            if (pcpl === null) return false;

            switch (filters.pcpl_range) {
              case '0-500':
                return pcpl <= 500;
              case '501-800':
                return pcpl > 500 && pcpl <= 800;
              case '800+':
                return pcpl > 800;
              default:
                return true;
            }
          });
        }

        // Apply Reply Rate filter client-side
        if (filters.reply_rate_range) {
          filteredData = filteredData.filter((c: ClientRow) => {
            if (c.reply_rate_7d === null) return false;
            const percentage = c.reply_rate_7d * 100;

            switch (filters.reply_rate_range) {
              case '0-1.5':
                return percentage < 1.5;
              case '1.5-2':
                return percentage >= 1.5 && percentage < 2;
              case '2+':
                return percentage >= 2;
              default:
                return true;
            }
          });
        }

        // Apply Bounce Rate filter client-side
        if (filters.bounce_rate_range) {
          filteredData = filteredData.filter((c: ClientRow) => {
            if (c.bounce_pct_7d === null) return false;
            const percentage = c.bounce_pct_7d * 100;

            switch (filters.bounce_rate_range) {
              case '0-2':
                return percentage < 2;
              case '2-4':
                return percentage >= 2 && percentage < 4;
              case '4+':
                return percentage >= 4;
              default:
                return true;
            }
          });
        }

        // Apply Positive Reply Rate filter client-side
        // Calculate as positives / replies (same as badge) for consistency
        if (filters.positive_reply_rate_range) {
          filteredData = filteredData.filter((c: ClientRow) => {
            const replies = c.replies_7d || 0;
            const positives = c.positives_7d || 0;
            const positiveRate = replies > 0 ? positives / replies : null;
            
            if (positiveRate === null) return false;
            const percentage = positiveRate * 100;

            switch (filters.positive_reply_rate_range) {
              case '0-5':
                return percentage < 5;
              case '5-8':
                return percentage >= 5 && percentage < 8;
              case '8+':
                return percentage >= 8;
              default:
                return true;
            }
          });
        }

        // Apply Target Status filter client-side (based on prorated_target comparison)
        if (filters.target_status) {
          filteredData = filteredData.filter((c: ClientRow) => {
            if (c.prorated_target === null || c.prorated_target === 0) return false;
            
            const newLeads = c.new_leads_reached_7d || 0;
            const isAboveTarget = newLeads >= c.prorated_target;

            switch (filters.target_status) {
              case 'below':
                return !isAboveTarget; // Below target (Red)
              case 'above':
                return isAboveTarget; // At/Above target (Green)
              default:
                return true;
            }
          });
        }

        setClients(filteredData);
        setStaleData(filteredData.some((c: ClientRow) => c.data_stale_flag) || false);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch dashboard data:', err);
        setLoading(false);
      });
  }, [filters]);

  const redCount = clients.filter(c => c.rag_status === 'Red').length;
  const yellowCount = clients.filter(c => c.rag_status === 'Yellow').length;
  const greenCount = clients.filter(c => c.rag_status === 'Green').length;
  const totalClients = clients.length;
  const totalContacted = clients.reduce((sum, c) => sum + c.contacted_7d, 0);
  const totalPositives = clients.reduce((sum, c) => sum + c.positives_7d, 0);

  const handleSort = useCallback((field: SortField) => {
    if (sortField === field) {
      if (sortOrder === 'asc') setSortOrder('desc');
      else if (sortOrder === 'desc') setSortOrder(null);
      else setSortOrder('asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  }, [sortField, sortOrder]);

  const sortedClients = useMemo(() => {
    if (!sortOrder) return clients;

    return [...clients].sort((a, b) => {
      // Handle PCPL calculation specially
      let aVal: number | string | null;
      let bVal: number | string | null;

      if (sortField === 'pcpl') {
        aVal = a.positives_7d > 0 ? a.new_leads_reached_7d / a.positives_7d : null;
        bVal = b.positives_7d > 0 ? b.new_leads_reached_7d / b.positives_7d : null;
      } else if (sortField === 'prorated_target') {
        // Ensure numeric conversion for proper sorting
        aVal = a.prorated_target !== null ? Number(a.prorated_target) : null;
        bVal = b.prorated_target !== null ? Number(b.prorated_target) : null;
      } else {
        aVal = a[sortField];
        bVal = b[sortField];
      }

      if (aVal === null && bVal === null) return 0;
      if (aVal === null) return 1;
      if (bVal === null) return -1;

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }

      // Handle numeric comparison (including converted strings)
      const aNum = typeof aVal === 'number' ? aVal : Number(aVal);
      const bNum = typeof bVal === 'number' ? bVal : Number(bVal);
      
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return sortOrder === 'asc' ? aNum - bNum : bNum - aNum;
      }

      return 0;
    });
  }, [clients, sortField, sortOrder]);

  const removeFilter = (key: string) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    // Keep relationship_status as 'ACTIVE' even when clearing filters (uppercase matches database)
    setFilters({ relationship_status: 'ACTIVE' });
  };

  const exportToCSV = () => {
    const dataToExport = selectedClients.size > 0
      ? sortedClients.filter(c => selectedClients.has(c.client_id))
      : sortedClients;

    const headers = [
      'Client Code',
      'Client Company',
      'Status',
      'RAG Status',
      'New Leads (7d)',
      'Emails Sent (7d)',
      'Replies (7d)',
      'Reply Rate (7d)',
      'Positive Replies (7d)',
      'Positive Rate (7d)',
      'Positives (7d)',
      'PCPL',
      'Target',
      'Volume Attainment',
      'Not Contacted',
      'Issues'
    ];

    const rows = dataToExport.map(c => {
      const newLeads = c.new_leads_reached_7d || 0;
      const positives = c.positives_7d || 0;
      const replies = c.replies_7d || 0;
      const pcpl = positives > 0 ? (newLeads / positives).toFixed(1) : 'N/A';
      const positiveRate = replies > 0 ? (positives / replies * 100).toFixed(2) + '%' : 'N/A';

      return [
        c.client_code,
        c.client_company_name || c.client_name || '',
        c.relationship_status || '',
        c.rag_status,
        newLeads,
        c.contacted_7d || 0,
        c.replies_7d || 0,
        c.reply_rate_7d ? (c.reply_rate_7d * 100).toFixed(1) + '%' : 'N/A',
        positives,
        positiveRate,
        positives,
        pcpl,
        c.weekly_target_int || 'N/A',
        c.weekly_target_int ? ((c.new_leads_reached_7d || 0) / c.weekly_target_int * 100).toFixed(1) + '%' : 'N/A',
        c.not_contacted_leads || 0,
        [c.deliverability_flag ? 'Deliverability' : null,
         c.volume_flag ? 'Volume' : null,
         c.mmf_flag ? 'MMF' : null,
         c.data_missing_flag ? 'No Data' : null
        ].filter(Boolean).join('; ')
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `client-health-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const activeFilterCount = Object.keys(filters).length;

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin mb-3" />
          <p className="text-sm text-slate-600">Loading dashboard...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* PAGE HEADER */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-[1800px] mx-auto px-6 py-5">
          {/* Top Row - Title and Actions */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Client Health Dashboard</h1>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-sm text-slate-500">Weekly metrics (Previous Fri to Yesterday) • {totalClients} clients</p>
                <span className="text-slate-300">•</span>
                <p className="text-sm text-slate-500 font-medium">{getDateRangeInfo().display}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {refreshMessage && (
                <div className="text-xs font-medium px-3 py-1.5 rounded-md border bg-slate-50">
                  <span className={refreshMessage.startsWith('✓') ? 'text-emerald-700' : 'text-red-700'}>
                    {refreshMessage}
                  </span>
                </div>
              )}
              {selectedClients.size > 0 && (
                <span className="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 rounded-md border border-slate-200">
                  {selectedClients.size} selected
                </span>
              )}
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className={clsx(
                  'inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold',
                  'bg-white hover:bg-slate-50 rounded-md border border-slate-300',
                  'transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2',
                  refreshing && 'opacity-50 cursor-not-allowed'
                )}
                style={{ transition: tokens.transition }}
                aria-label="Refresh data"
              >
                <RefreshIcon spinning={refreshing} />
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </button>
              <button
                onClick={exportToCSV}
                className={clsx(
                  'inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700',
                  'bg-white hover:bg-slate-50 rounded-md border border-slate-300',
                  'transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2'
                )}
                style={{ transition: tokens.transition }}
                aria-label="Export to CSV"
              >
                <DownloadIcon />
                Export
              </button>
              <ColumnSelector
                columns={COLUMN_DEFINITIONS}
                visibleColumns={visibleColumns}
                onColumnToggle={handleColumnToggle}
                onShowAll={handleShowAllColumns}
                onHideAll={handleHideAllColumns}
              />
              <Link
                href="/unmatched"
                className={clsx(
                  'inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700',
                  'bg-white hover:bg-slate-50 rounded-md border border-slate-300',
                  'transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2'
                )}
                style={{ transition: tokens.transition }}
              >
                Data Quality
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* KPI CARD - Single Row 40:60 Split Design */}
      <div className="max-w-[1800px] mx-auto px-6 py-6">
        <div
          className={clsx(
            'bg-white rounded-lg border border-slate-200',
            'p-5' // Card padding
          )}
          style={{ boxShadow: tokens.shadows.card }}
        >
          {/* Single Row Grid: Left (40%) Pills, Right (60%) KPIs */}
          <div className="grid grid-cols-[40%_60%] gap-6">
            {/* Left Side: Health Status Pills (40%) */}
            <div className="flex flex-col justify-center gap-3">
              <div className="flex items-center gap-3 flex-wrap">
                <KpiPill status="Red" count={redCount} color="red" />
                <KpiPill status="Amber" count={yellowCount} color="amber" />
                <KpiPill status="Green" count={greenCount} color="green" />
              </div>

              <div className="mt-1">
                <StatusChip isStale={staleData} />
              </div>
            </div>

            {/* Right Side: Compact KPI Tiles (60%) */}
            <div className="flex items-center gap-0 overflow-x-auto pl-4 border-l border-slate-100">
              {/* Compact metrics with subtle dividers */}
              <KpiTileCompact
                label="New Leads"
                value={formatNumber(clients.reduce((sum, c) => sum + c.new_leads_reached_7d, 0))}
              />
              <div className="w-px h-8 bg-slate-100 mx-2"></div>
              <KpiTileCompact
                label="Replies"
                value={formatNumber(clients.reduce((sum, c) => sum + c.replies_7d, 0))}
              />
              <div className="w-px h-8 bg-slate-100 mx-2"></div>
              <KpiTileCompact
                label="Reply Rate"
                value={(() => {
                  const totalReplies = clients.reduce((sum, c) => sum + c.replies_7d, 0);
                  const totalNewLeads = clients.reduce((sum, c) => sum + c.new_leads_reached_7d, 0);
                  return totalNewLeads > 0 ? formatPercentage(totalReplies / totalNewLeads, 1) : 'N/A';
                })()}
              />
              <div className="w-px h-8 bg-slate-100 mx-2"></div>
              <KpiTileCompact
                label="Positives"
                value={formatNumber(totalPositives)}
              />
              <div className="w-px h-8 bg-slate-100 mx-2"></div>
              <KpiTileCompact
                label="Positive Rate"
                value={(() => {
                  const totalReplies = clients.reduce((sum, c) => sum + c.replies_7d, 0);
                  const totalPos = clients.reduce((sum, c) => sum + c.positives_7d, 0);
                  return totalReplies > 0 ? formatPercentage(totalPos / totalReplies, 2) : 'N/A';
                })()}
              />
              <div className="w-px h-8 bg-slate-100 mx-2"></div>
              <KpiTileCompact
                label="PCPL"
                value={(() => {
                  const totalNewLeads = clients.reduce((sum, c) => sum + c.new_leads_reached_7d, 0);
                  const totalPos = clients.reduce((sum, c) => sum + c.positives_7d, 0);
                  return totalPos > 0 ? (totalNewLeads / totalPos).toFixed(1) : 'N/A';
                })()}
              />
            </div>
          </div>
        </div>
      </div>

      {/* STICKY FILTER TOOLBAR CARD */}
      <div className="max-w-[1800px] mx-auto px-6 pb-6">
        <div
          className="sticky top-0 z-40 bg-white rounded-lg border border-slate-200 shadow-sm"
          style={{ boxShadow: tokens.shadows.card, top: '6px' }}
        >
          <div className="p-4">
            <div className="flex items-center gap-4 flex-wrap">
              {/* NON-INTERACTIVE Filters Label */}
              <div className="inline-flex items-center gap-2 px-4 py-2">
                <FilterIcon />
                <span className="text-xs font-semibold text-slate-900">Filters</span>
                {activeFilterCount > 0 && (
                  <span className="inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold bg-slate-900 text-white rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </div>

              {/* Filter Controls */}
              {filterOptions && (
                <div className="flex items-center gap-4 flex-wrap flex-1">
                  {/* Search by Client Code */}
                  <div className="flex items-center gap-2 pr-4 border-r border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Search</span>
                    <input
                      type="text"
                      placeholder="Search client codes..."
                      className={clsx(
                        'px-4 py-2.5 w-64 text-xs font-medium text-slate-700',
                        'bg-white border border-slate-300 rounded-md',
                        'focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:border-slate-400',
                        'placeholder:text-slate-400'
                      )}
                      style={{ transition: tokens.transition }}
                      value={searchInputValue}
                      onChange={(e) => {
                        // Only update local state for immediate UI feedback
                        setSearchInputValue(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        // Trigger search on Enter key
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleSearchSubmit(searchInputValue);
                          // Blur the input to remove focus
                          e.currentTarget.blur();
                        }
                      }}
                      onBlur={() => {
                        // Trigger search when user clicks outside (blur)
                        handleSearchSubmit(searchInputValue);
                      }}
                      aria-label="Search by client code"
                    />
                  </div>

                  {/* Ownership Filters */}
                  <div className="flex items-center gap-2 pr-4 border-r border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ownership</span>
                    <select
                      className={clsx(
                        'px-4 py-2.5 text-xs font-medium text-slate-700',
                        'bg-white border border-slate-300 rounded-md',
                        'focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:border-slate-400',
                        'cursor-pointer'
                      )}
                      style={{ transition: tokens.transition }}
                      value={filters.assigned_account_manager_name || ''}
                      onChange={(e) => setFilters({ ...filters, assigned_account_manager_name: e.target.value || undefined })}
                      aria-label="Filter by account manager"
                    >
                      <option value="">All AMs</option>
                      {filterOptions.account_managers.map(am => (
                        <option key={am} value={am}>{am}</option>
                      ))}
                    </select>

                    <select
                      className={clsx(
                        'px-4 py-2.5 text-xs font-medium text-slate-700',
                        'bg-white border border-slate-300 rounded-md',
                        'focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:border-slate-400',
                        'cursor-pointer'
                      )}
                      style={{ transition: tokens.transition }}
                      value={filters.assigned_inbox_manager_name || ''}
                      onChange={(e) => setFilters({ ...filters, assigned_inbox_manager_name: e.target.value || undefined })}
                      aria-label="Filter by inbox manager"
                    >
                      <option value="">All IMs</option>
                      {filterOptions.inbox_managers.map(im => (
                        <option key={im} value={im}>{im}</option>
                      ))}
                    </select>

                    <select
                      className={clsx(
                        'px-4 py-2.5 text-xs font-medium text-slate-700',
                        'bg-white border border-slate-300 rounded-md',
                        'focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:border-slate-400',
                        'cursor-pointer'
                      )}
                      style={{ transition: tokens.transition }}
                      value={filters.assigned_sdr_name || ''}
                      onChange={(e) => setFilters({ ...filters, assigned_sdr_name: e.target.value || undefined })}
                      aria-label="Filter by SDR"
                    >
                      <option value="">All SDRs</option>
                      {filterOptions.sdrs.map(sdr => (
                        <option key={sdr} value={sdr}>{sdr}</option>
                      ))}
                    </select>
                  </div>

                  {/* Status Filters */}
                  <div className="flex items-center gap-2 pr-4 border-r border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</span>
                    <select
                      className={clsx(
                        'px-4 py-2.5 text-xs font-medium text-slate-700',
                        'bg-white border border-slate-300 rounded-md',
                        'focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:border-slate-400',
                        'cursor-pointer'
                      )}
                      style={{ transition: tokens.transition }}
                      value={filters.relationship_status || ''}
                      onChange={(e) => setFilters({ ...filters, relationship_status: e.target.value || undefined })}
                      aria-label="Filter by relationship status"
                    >
                      <option value="">All Statuses</option>
                      {filterOptions.relationship_statuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>

                    <select
                      className={clsx(
                        'px-4 py-2.5 text-xs font-medium text-slate-700',
                        'bg-white border border-slate-300 rounded-md',
                        'focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:border-slate-400',
                        'cursor-pointer'
                      )}
                      style={{ transition: tokens.transition }}
                      value={filters.rag_status || ''}
                      onChange={(e) => setFilters({ ...filters, rag_status: e.target.value || undefined as any })}
                      aria-label="Filter by RAG status"
                    >
                      <option value="">All RAG</option>
                      <option value="Red">Red</option>
                      <option value="Yellow">Amber</option>
                      <option value="Green">Green</option>
                    </select>

                    <select
                      className={clsx(
                        'px-4 py-2.5 text-xs font-medium text-slate-700',
                        'bg-white border border-slate-300 rounded-md',
                        'focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:border-slate-400',
                        'cursor-pointer'
                      )}
                      style={{ transition: tokens.transition }}
                      value={filters.pcpl_range || ''}
                      onChange={(e) => setFilters({ ...filters, pcpl_range: e.target.value || undefined })}
                      aria-label="Filter by PCPL"
                    >
                      <option value="">All PCPL</option>
                      <option value="0-500">0-500 (Green)</option>
                      <option value="501-800">501-800 (Amber)</option>
                      <option value="800+">800+ (Red)</option>
                    </select>

                    <select
                      className={clsx(
                        'px-4 py-2.5 text-xs font-medium text-slate-700',
                        'bg-white border border-slate-300 rounded-md',
                        'focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:border-slate-400',
                        'cursor-pointer'
                      )}
                      style={{ transition: tokens.transition }}
                      value={filters.reply_rate_range || ''}
                      onChange={(e) => setFilters({ ...filters, reply_rate_range: e.target.value || undefined })}
                      aria-label="Filter by Reply Rate"
                    >
                      <option value="">All Reply Rate</option>
                      <option value="0-1.5">&lt;1.5% (Red)</option>
                      <option value="1.5-2">1.5-2% (Amber)</option>
                      <option value="2+">≥2% (Green)</option>
                    </select>

                    <select
                      className={clsx(
                        'px-4 py-2.5 text-xs font-medium text-slate-700',
                        'bg-white border border-slate-300 rounded-md',
                        'focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:border-slate-400',
                        'cursor-pointer'
                      )}
                      style={{ transition: tokens.transition }}
                      value={filters.bounce_rate_range || ''}
                      onChange={(e) => setFilters({ ...filters, bounce_rate_range: e.target.value || undefined })}
                      aria-label="Filter by Bounce Rate"
                    >
                      <option value="">All Bounce Rate</option>
                      <option value="0-2">&lt;2% (Green)</option>
                      <option value="2-4">2-4% (Amber)</option>
                      <option value="4+">≥4% (Red)</option>
                    </select>

                    <select
                      className={clsx(
                        'px-4 py-2.5 text-xs font-medium text-slate-700',
                        'bg-white border border-slate-300 rounded-md',
                        'focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:border-slate-400',
                        'cursor-pointer'
                      )}
                      style={{ transition: tokens.transition }}
                      value={filters.positive_reply_rate_range || ''}
                      onChange={(e) => setFilters({ ...filters, positive_reply_rate_range: e.target.value || undefined })}
                      aria-label="Filter by Positive Reply Rate"
                    >
                      <option value="">All Positive Rate</option>
                      <option value="0-5">&lt;5% (Red)</option>
                      <option value="5-8">5-8% (Amber)</option>
                      <option value="8+">≥8% (Green)</option>
                    </select>

                    <select
                      className={clsx(
                        'px-4 py-2.5 text-xs font-medium text-slate-700',
                        'bg-white border border-slate-300 rounded-md',
                        'focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:border-slate-400',
                        'cursor-pointer'
                      )}
                      style={{ transition: tokens.transition }}
                      value={filters.target_status || ''}
                      onChange={(e) => setFilters({ ...filters, target_status: (e.target.value as 'below' | 'above' | '') || undefined })}
                      aria-label="Filter by Target Status"
                    >
                      <option value="">All Target Status</option>
                      <option value="below">Below Target (Red)</option>
                      <option value="above">At/Above Target (Green)</option>
                    </select>
                  </div>

                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className={clsx(
                        'px-4 py-2.5 text-xs font-semibold text-red-700 hover:text-red-800',
                        'transition-colors focus:outline-none focus:underline',
                        'focus:ring-2 focus:ring-red-400 focus:ring-offset-2 rounded-md'
                      )}
                      style={{ transition: tokens.transition }}
                    >
                      Clear all
                    </button>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="max-w-[1800px] mx-auto px-6 pb-6">
        <div
          className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden"
          style={{ boxShadow: tokens.shadows.card }}
        >
          <div className="overflow-x-auto">
            <table className="w-full" role="grid">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 w-10">
                    <input
                      type="checkbox"
                      checked={selectedClients.size === sortedClients.length && sortedClients.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedClients(new Set(sortedClients.map(c => c.client_id)));
                        } else {
                          setSelectedClients(new Set());
                        }
                      }}
                      className="w-4 h-4 rounded border-slate-300 text-slate-600 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                      aria-label="Select all clients"
                    />
                  </th>
                  <SortableHeader
                    field="client_code"
                    label="Client"
                    sortField={sortField}
                    sortOrder={sortOrder}
                    onSort={handleSort}
                    align="left"
                    sticky={true}
                  />
                  {visibleColumns.has('rag_status') && (
                    <SortableHeader
                      field="rag_status"
                      label="Health"
                      sortField={sortField}
                      sortOrder={sortOrder}
                      onSort={handleSort}
                      align="center"
                    />
                  )}
                  {visibleColumns.has('contacted_7d') && (
                    <SortableHeader
                      field="contacted_7d"
                      label="Emails Sent (7d)"
                      sortField={sortField}
                      sortOrder={sortOrder}
                      onSort={handleSort}
                      align="right"
                    />
                  )}
                  {visibleColumns.has('new_leads_reached_7d') && (
                    <SortableHeader
                      field="new_leads_reached_7d"
                      label="New Leads (7d)"
                      sortField={sortField}
                      sortOrder={sortOrder}
                      onSort={handleSort}
                      align="right"
                    />
                  )}
                  {visibleColumns.has('prorated_target') && (
                    <SortableHeader
                      field="prorated_target"
                      label="Target (Expected)"
                      sortField={sortField}
                      sortOrder={sortOrder}
                      onSort={handleSort}
                      align="right"
                    />
                  )}
                  {visibleColumns.has('replies_7d') && (
                    <SortableHeader
                      field="replies_7d"
                      label="Replies (7d)"
                      sortField={sortField}
                      sortOrder={sortOrder}
                      onSort={handleSort}
                      align="right"
                    />
                  )}
                  {visibleColumns.has('reply_rate_7d') && (
                    <SortableHeader
                      field="reply_rate_7d"
                      label="Reply Rate"
                      sortField={sortField}
                      sortOrder={sortOrder}
                      onSort={handleSort}
                      align="right"
                    />
                  )}
                  {visibleColumns.has('bounce_pct_7d') && (
                    <SortableHeader
                      field="bounce_pct_7d"
                      label="Bounce Rate"
                      sortField={sortField}
                      sortOrder={sortOrder}
                      onSort={handleSort}
                      align="right"
                    />
                  )}
                  {visibleColumns.has('positives_7d') && (
                    <SortableHeader
                      field="positives_7d"
                      label="Positive Replies (7d)"
                      sortField={sortField}
                      sortOrder={sortOrder}
                      onSort={handleSort}
                      align="right"
                    />
                  )}
                  {visibleColumns.has('positive_reply_rate_7d') && (
                    <SortableHeader
                      field="positive_reply_rate_7d"
                      label="Positive Rate"
                      sortField={sortField}
                      sortOrder={sortOrder}
                      onSort={handleSort}
                      align="right"
                    />
                  )}
                  {visibleColumns.has('pcpl') && (
                    <SortableHeader
                      field="pcpl"
                      label="PCPL"
                      sortField={sortField}
                      sortOrder={sortOrder}
                      onSort={handleSort}
                      align="right"
                    />
                  )}
                  {visibleColumns.has('volume_attainment') && (
                    <SortableHeader
                      field="volume_attainment"
                      label="Target"
                      sortField={sortField}
                      sortOrder={sortOrder}
                      onSort={handleSort}
                      align="right"
                    />
                  )}
                  {visibleColumns.has('not_contacted_leads') && (
                    <SortableHeader
                      field="not_contacted_leads"
                      label="Not Contacted"
                      sortField={sortField}
                      sortOrder={sortOrder}
                      onSort={handleSort}
                      align="right"
                    />
                  )}
                  {visibleColumns.has('bonus_pool_monthly') && (
                    <SortableHeader
                      field="bonus_pool_monthly"
                      label="Bonus Pool"
                      sortField={sortField}
                      sortOrder={sortOrder}
                      onSort={handleSort}
                      align="right"
                    />
                  )}
                  <th className="px-4 py-3.5 text-left font-semibold text-xs uppercase tracking-wide border-b-2 border-slate-200 text-slate-600 bg-slate-50/50 whitespace-nowrap">
                    Issues
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sortedClients.map((client, index) => {
                  // Calculate PCPL for this client
                  const newLeads = client.new_leads_reached_7d || 0;
                  const positives = client.positives_7d || 0;
                  const pcpl = positives > 0 ? newLeads / positives : null;

                  return (
                    <tr
                      key={client.client_id}
                      className={clsx(
                        'group transition-colors',
                        index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                      )}
                      style={{ transition: tokens.transition }}
                    >
                      <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedClients.has(client.client_id)}
                          onChange={(e) => {
                            const newSelected = new Set(selectedClients);
                            if (e.target.checked) {
                              newSelected.add(client.client_id);
                            } else {
                              newSelected.delete(client.client_id);
                            }
                            setSelectedClients(newSelected);
                          }}
                          className="w-4 h-4 rounded border-slate-300 text-slate-600 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                          aria-label={`Select ${client.client_code}`}
                        />
                      </td>
                      <td
                        className={clsx(
                          'px-4 py-4 cursor-pointer hover:bg-slate-50 transition-colors left-0 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]',
                          index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                        )}
                        style={{ position: 'sticky', left: '0' } as React.CSSProperties}
                        onClick={() => window.location.href = `/client/${client.client_code}`}
                      >
                        <div>
                          <div className="font-semibold text-slate-900 text-sm group-hover:text-blue-700 transition-colors focus:outline-none focus:underline">
                            {client.client_code}
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            {client.client_company_name || 'No company name'}
                          </div>
                          <div className="mt-2">
                            <StatusBadge status={client.relationship_status} />
                          </div>
                        </div>
                      </td>
                      {visibleColumns.has('rag_status') && (
                        <td className="px-4 py-4 text-center">
                          <RAGStatus status={client.rag_status} />
                        </td>
                      )}
                      {visibleColumns.has('contacted_7d') && (
                        <td className="px-4 py-4 text-right">
                          <div className="font-semibold text-slate-900 text-sm tabular-nums">
                            {formatNumber(client.contacted_7d)}
                          </div>
                        </td>
                      )}
                      {visibleColumns.has('new_leads_reached_7d') && (
                        <td className="px-4 py-4 text-right">
                          <div className="font-semibold text-slate-900 text-sm tabular-nums">
                            {formatNumber(client.new_leads_reached_7d)}
                          </div>
                        </td>
                      )}
                      {visibleColumns.has('prorated_target') && (
                        <td className="px-4 py-4 text-right">
                          <TargetStatusBadge
                            proratedTarget={client.prorated_target}
                            newLeads={client.new_leads_reached_7d || 0}
                          />
                        </td>
                      )}
                      {visibleColumns.has('replies_7d') && (
                        <td className="px-4 py-4 text-right">
                          <div className="text-sm text-slate-700 tabular-nums">
                            {formatNumber(client.replies_7d || 0)}
                          </div>
                        </td>
                      )}
                      {visibleColumns.has('reply_rate_7d') && (
                        <td className="px-4 py-4 text-right">
                          <ReplyRateBadge
                            value={client.reply_rate_7d}
                            replies={client.replies_7d || 0}
                            newLeads={client.new_leads_reached_7d || 0}
                          />
                        </td>
                      )}
                      {visibleColumns.has('bounce_pct_7d') && (
                        <td className="px-4 py-4 text-right">
                          <BounceRateBadge
                            value={client.bounce_pct_7d}
                            bounces={client.bounces_7d || 0}
                            contacted={client.contacted_7d || 0}
                          />
                        </td>
                      )}
                      {visibleColumns.has('positives_7d') && (
                        <td className="px-4 py-4 text-right">
                          <div className="text-sm text-slate-700 tabular-nums">
                            {formatNumber(client.positives_7d || 0)}
                          </div>
                        </td>
                      )}
                      {visibleColumns.has('positive_reply_rate_7d') && (
                        <td className="px-4 py-4 text-right">
                          <PositiveReplyRateBadge
                            value={client.positive_reply_rate_7d}
                            positives={client.positives_7d || 0}
                            replies={client.replies_7d || 0}
                          />
                        </td>
                      )}
                      {visibleColumns.has('pcpl') && (
                        <td className="px-4 py-4 text-right">
                          <PCPLBadge
                            newLeads={newLeads}
                            positives={positives}
                          />
                        </td>
                      )}
                      {visibleColumns.has('volume_attainment') && (
                        <td className="px-4 py-4 text-right">
                          <AttainmentBadge
                            value={client.volume_attainment}
                            weeklyTarget={client.weekly_target_int}
                            newLeads={client.new_leads_reached_7d}
                          />
                        </td>
                      )}
                      {visibleColumns.has('not_contacted_leads') && (
                        <td className="px-4 py-4 text-right">
                          <Tooltip content="Leads with STARTED status (not yet contacted) from SmartLead API">
                            <div className="font-semibold text-slate-900 text-sm tabular-nums">
                              {formatNumber(client.not_contacted_leads || 0)}
                            </div>
                          </Tooltip>
                        </td>
                      )}
                      {visibleColumns.has('bonus_pool_monthly') && (
                        <td className="px-4 py-4 text-right">
                          {client.bonus_pool_monthly !== null && client.bonus_pool_monthly !== undefined ? (
                            <Tooltip content="Monthly bonus pool allocation">
                              <div className="font-semibold text-slate-900 text-sm tabular-nums">
                                {formatNumber(client.bonus_pool_monthly)}
                              </div>
                            </Tooltip>
                          ) : (
                            <div className="text-sm text-slate-400 tabular-nums">—</div>
                          )}
                        </td>
                      )}
                      <td className="px-4 py-4">
                        <IssuesFlags client={client} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {sortedClients.length === 0 && (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-slate-500">No clients match your filters</p>
              <button
                onClick={clearAllFilters}
                className="mt-2 text-sm font-semibold text-blue-700 hover:text-blue-800 focus:outline-none focus:underline focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 rounded-md"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

    </main>
  );
}
