'use client';

/**
 * Historical Weeks Dashboard - Client Component
 *
 * Allows users to select historical weeks and view aggregated client health data
 * Reuses components from the main dashboard for consistency
 */

import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import type { ClientRow } from '@/lib/types';
import type { HistoricalWeek, WeeksResponse } from '@/lib/types';
import { ColumnSelector, type ColumnDefinition } from '@/components/ColumnSelector';

// ============================================================================
// DESIGN TOKENS (Reused from main dashboard)
// ============================================================================

const tokens = {
  spacing: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    6: '24px',
    8: '32px',
  },
  colors: {
    foreground: 'text-slate-900',
    secondary: 'text-slate-600',
    muted: 'text-slate-400',
    border: 'border-slate-200',
    background: 'bg-slate-50',
    surface: 'bg-white',
  },
  shadows: {
    card: '0 0 0 0.5px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.03), 0 4px 8px rgba(0, 0, 0, 0.02)',
  },
  radius: {
    sm: '4px',
    md: '6px',
    lg: '8px',
  },
  transition: '150ms cubic-bezier(0.16, 1, 0.3, 1)',
};

// ============================================================================
// COLUMN DEFINITIONS (Reused from main dashboard)
// ============================================================================

const COLUMN_DEFINITIONS: ColumnDefinition[] = [
  {
    id: 'rag_status',
    label: 'Health (RAG)',
    category: 'Health & Status',
    defaultVisible: true,
  },
  {
    id: 'contacted_7d',
    label: 'Emails Sent',
    category: 'Health & Status',
    defaultVisible: false,
  },
  {
    id: 'new_leads_reached_7d',
    label: 'New Leads',
    category: 'Health & Status',
    defaultVisible: true,
  },
  {
    id: 'prorated_target',
    label: 'Target (Expected)',
    category: 'Performance Metrics',
    defaultVisible: true,
  },
  {
    id: 'replies_7d',
    label: 'Replies',
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
    label: 'Positive Replies',
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
  {
    id: 'volume_attainment',
    label: 'Target (Attainment)',
    category: 'Target & Attainment',
    defaultVisible: true,
  },
  {
    id: 'bonus_pool_monthly',
    label: 'Bonus Pool',
    category: 'Financial',
    defaultVisible: true,
  },
  {
    id: 'monthly_booking_goal',
    label: 'Monthly Booking Goal',
    category: 'Financial',
    defaultVisible: true,
  },
];

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

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className || "w-4 h-4"}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className || "w-4 h-4"}
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

// ============================================================================
// WEEK SELECTOR COMPONENT
// ============================================================================

interface WeekSelectorProps {
  weeks: HistoricalWeek[];
  selectedWeeks: Set<number>;
  onWeekToggle: (weekNumber: number) => void;
  onClearSelection: () => void;
  loading?: boolean;
}

function WeekSelector({
  weeks,
  selectedWeeks,
  onWeekToggle,
  onClearSelection,
  loading = false,
}: WeekSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const selectedCount = selectedWeeks.size;
  const totalCount = weeks.length;

  // Get display text for button
  const getButtonText = () => {
    if (loading) return 'Loading weeks...';
    if (selectedCount === 0) return 'Select weeks';
    if (selectedCount === 1) {
      const week = weeks.find(w => w.week_number === Array.from(selectedWeeks)[0]);
      return week ? week.display_name : `${selectedCount} week selected`;
    }
    return `${selectedCount} weeks selected`;
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading || weeks.length === 0}
        className={clsx(
          'inline-flex items-center justify-between gap-3 px-4 py-2.5 text-xs font-medium',
          'bg-white border rounded-md min-w-[320px]',
          'transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2',
          (loading || weeks.length === 0) ? 'border-slate-200 text-slate-400 cursor-not-allowed' : 'border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50 cursor-pointer'
        )}
        style={{ transition: tokens.transition }}
        aria-label={getButtonText()}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4" />
          <span>{getButtonText()}</span>
        </div>
        <ChevronDownIcon className={clsx('w-4 h-4 transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && weeks.length > 0 && (
        <div
          className="absolute left-0 top-full mt-2 w-[380px] bg-white border border-slate-200 rounded-lg shadow-lg z-50 max-h-[400px] overflow-hidden flex flex-col"
          style={{ boxShadow: tokens.shadows.card }}
        >
          {/* Header */}
          <div className="p-3 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">Select Historical Weeks</h3>
              <span className="text-xs text-slate-500">
                {selectedCount > 0 ? `${selectedCount} of ${totalCount} selected` : `${totalCount} available`}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Select one or more weeks to view aggregated data
            </p>
          </div>

          {/* Week List */}
          <div className="overflow-y-auto flex-1 p-2">
            {weeks.map((week) => {
              const isSelected = selectedWeeks.has(week.week_number);
              return (
                <label
                  key={week.week_number}
                  className={clsx(
                    'flex items-start gap-3 px-3 py-2.5 rounded-md cursor-pointer transition-colors',
                    'hover:bg-slate-50',
                    isSelected && 'bg-blue-50 hover:bg-blue-100'
                  )}
                  style={{ transition: tokens.transition }}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onWeekToggle(week.week_number)}
                    className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={clsx(
                        'text-sm font-medium truncate',
                        isSelected ? 'text-blue-700' : 'text-slate-700'
                      )}>
                        {week.display_name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-slate-500">
                        {week.record_count} clients
                      </span>
                    </div>
                  </div>
                </label>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            <button
              onClick={() => {
                onClearSelection();
                setIsOpen(false);
              }}
              disabled={selectedCount === 0}
              className={clsx(
                'px-3 py-1.5 text-xs font-semibold rounded-md transition-colors',
                selectedCount > 0
                  ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                  : 'text-slate-400 cursor-not-allowed'
              )}
            >
              Clear selection
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className={clsx(
                'px-3 py-1.5 text-xs font-semibold rounded-md transition-colors',
                'text-blue-700 hover:text-blue-800 hover:bg-blue-100'
              )}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// REUSED UI COMPONENTS
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

// RAG Status Badge
function RAGStatus({ status }: { status: 'Red' | 'Yellow' | 'Green' }) {
  const config = {
    Red: {
      bg: 'bg-red-50',
      text: 'text-red-700',
      dot: 'bg-red-500',
      border: 'border-red-200',
      display: 'Red'
    },
    Yellow: {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      dot: 'bg-amber-500',
      border: 'border-amber-200',
      display: 'Amber'
    },
    Green: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      dot: 'bg-emerald-500',
      border: 'border-emerald-200',
      display: 'Green'
    },
  };

  const { bg, text, dot, border, display } = config[status];

  return (
    <Tooltip content={`RAG Status: ${display}`}>
      <div
        className={clsx(
          bg,
          text,
          border,
          'inline-flex items-center gap-2 px-3 py-1.5 rounded-md border font-semibold text-[11px] uppercase tracking-wide'
        )}
      >
        <span className={clsx('w-2 h-2 rounded-full', dot)}></span>
        {display}
      </div>
    </Tooltip>
  );
}

// Reply Rate Badge
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
      <Tooltip content={`Replies: ${formatNumber(replies)} / New Leads: ${formatNumber(newLeads)} • ${percentage.toFixed(2)}%`}>
        <span
          className={clsx(
            'inline-flex items-center px-2.5 py-1 rounded-md',
            bg,
            color,
            border,
            'border font-semibold text-xs tabular-nums'
          )}
        >
          {formatPercentage(value, 1)}
        </span>
      </Tooltip>
      <span className="text-[10px] text-slate-500 tabular-nums">{formatNumber(replies)}</span>
    </div>
  );
}

// Bounce Rate Badge
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
      <Tooltip content={`Bounces: ${formatNumber(bounces)} / Emails: ${formatNumber(contacted)} • ${percentage.toFixed(2)}%`}>
        <span
          className={clsx(
            'inline-flex items-center px-2.5 py-1 rounded-md',
            bg,
            color,
            border,
            'border font-semibold text-xs tabular-nums'
          )}
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
      <Tooltip content={`Positives: ${formatNumber(positives)} / Replies: ${formatNumber(replies)} • ${percentage.toFixed(2)}%`}>
        <span
          className={clsx(
            'inline-flex items-center px-2.5 py-1 rounded-md',
            bg,
            color,
            border,
            'border font-semibold text-xs tabular-nums'
          )}
        >
          {positiveRate !== null ? formatPercentage(positiveRate, 2) : 'N/A'}
        </span>
      </Tooltip>
      <span className="text-[10px] text-slate-500 tabular-nums">{formatNumber(positives)}</span>
    </div>
  );
}

// Target Status Badge
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
      <Tooltip content={`New Leads: ${formatNumber(newLeads)} / Target: ${formatNumber(Math.round(proratedTarget))}`}>
        <span
          className={clsx(
            'inline-flex items-center px-2.5 py-1 rounded-md',
            bg,
            color,
            border,
            'border font-semibold text-xs tabular-nums'
          )}
        >
          {formatNumber(Math.round(proratedTarget))}
        </span>
      </Tooltip>
      <span className="text-[10px] text-slate-500 tabular-nums">{formatNumber(newLeads)}</span>
    </div>
  );
}

// Attainment Badge
function AttainmentBadge({ value, weeklyTarget, newLeads }: { value: number | null; weeklyTarget: number | null; newLeads: number }) {
  if (weeklyTarget === null) {
    return <span className="text-slate-400 text-xs">Target missing</span>;
  }

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

  return (
    <Tooltip content={`${percentage.toFixed(1)}% • New Leads: ${formatNumber(newLeads)} / Target: ${formatNumber(weeklyTarget)}`}>
      <div className="flex flex-col items-end gap-1">
        <div className="flex items-center gap-2">
          <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              className={clsx('h-full transition-all', bgColor)}
              style={{ width: `${Math.min(percentage, 100)}%`, transition: tokens.transition }}
            />
          </div>
          <span className={clsx('text-xs font-semibold tabular-nums', color)}>
            {formatPercentage(attainment || 0, 1)}
          </span>
        </div>
        <span className="text-[10px] text-slate-500 tabular-nums">/ {formatNumber(weeklyTarget)}</span>
      </div>
    </Tooltip>
  );
}

// PCPL Badge
function PCPLBadge({ newLeads, positives }: { newLeads: number; positives: number }) {
  const pcpl = positives > 0 ? newLeads / positives : null;
  const displayValue = pcpl !== null ? pcpl.toFixed(1) : 'N/A';

  let colorClass = 'text-slate-700';
  if (pcpl !== null) {
    if (pcpl <= 500) {
      colorClass = 'text-emerald-700';
    } else if (pcpl <= 800) {
      colorClass = 'text-amber-700';
    } else {
      colorClass = 'text-red-700';
    }
  }

  return (
    <div className="flex flex-col items-end gap-0.5">
      <Tooltip content={`${formatNumber(newLeads)} leads / ${formatNumber(positives)} positives = ${displayValue}`}>
        <span
          className={clsx(
            'inline-flex items-center px-2.5 py-1 rounded-md',
            'bg-slate-50 border border-slate-200',
            colorClass,
            'border font-semibold text-xs tabular-nums'
          )}
        >
          {displayValue}
        </span>
      </Tooltip>
      <span className="text-[10px] text-slate-500 tabular-nums">PCPL</span>
    </div>
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

// Issues Flags
function IssuesFlags({ client }: { client: ClientRow }) {
  const flags = [];

  if (client.deliverability_flag) {
    flags.push(
      <Tooltip key="deliv" content="Deliverability risk">
        <TrendingDownIcon className="w-4 h-4 text-red-600" aria-label="Deliverability risk" />
      </Tooltip>
    );
  }

  if (client.volume_flag && client.weekly_target_int) {
    flags.push(
      <Tooltip key="vol" content="Volume risk">
        <AlertIcon className="w-4 h-4 text-amber-600" aria-label="Volume risk" />
      </Tooltip>
    );
  }

  if (client.mmf_flag) {
    flags.push(
      <Tooltip key="mmf" content="MMF risk">
        <MessageIcon className="w-4 h-4 text-amber-600" aria-label="MMF risk" />
      </Tooltip>
    );
  }

  if (client.data_missing_flag) {
    flags.push(
      <Tooltip key="miss" content="No data">
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
      <Tooltip content="All metrics OK">
        <CheckIcon className="w-4 h-4 text-emerald-600" aria-label="No issues" />
      </Tooltip>
    );
  }

  return <div className="flex gap-1.5">{flags}</div>;
}

// Sortable Header
function SortableHeader({
  field,
  label,
  sortField,
  sortOrder,
  onSort,
  align = 'left',
}: {
  field: SortField;
  label: string;
  sortField: SortField | null;
  sortOrder: 'asc' | 'desc' | null;
  onSort: (field: SortField) => void;
  align?: 'left' | 'center' | 'right';
}) {
  const isActive = sortField === field;

  return (
    <th
      className={clsx(
        'px-4 py-3.5 font-semibold text-xs uppercase tracking-wide border-b-2 whitespace-nowrap bg-slate-50/50',
        align === 'center' && 'text-center',
        align === 'right' && 'text-right',
        align === 'left' && 'text-left',
        isActive ? 'border-blue-500 text-blue-700' : 'border-slate-200 text-slate-600'
      )}
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
      >
        <span className="font-semibold">{label}</span>
        <span className="flex items-center">
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

// KPI Pill
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
      <span className={clsx('w-2 h-2 rounded-full', dotColors[color])} />
      <span>{status} {formatNumber(count)}</span>
    </div>
  );
}

// KPI Tile (compact)
function KpiTileCompact({
  label,
  value
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex flex-col justify-center min-w-[90px] px-3 py-2">
      <div className="text-[10px] font-medium text-slate-500 uppercase tracking-wide whitespace-nowrap">
        {label}
      </div>
      <div className="text-lg font-semibold text-slate-900 tabular-nums mt-0.5">
        {value}
      </div>
    </div>
  );
}

// ============================================================================
// MAIN HISTORICAL DASHBOARD COMPONENT
// ============================================================================

type SortField = 'client_code' | 'rag_status' | 'new_leads_reached_7d' | 'prorated_target' | 'contacted_7d' | 'replies_7d' | 'reply_rate_7d' | 'bounce_pct_7d' | 'positives_7d' | 'positive_reply_rate_7d' | 'pcpl' | 'volume_attainment' | 'bonus_pool_monthly' | 'monthly_booking_goal';
type SortOrder = 'asc' | 'desc' | null;

interface HistoricalClientRow extends ClientRow {
  selected_weeks: number[];
  aggregation_days: number;
  period_start_date: string;
  period_end_date: string;
}

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

export default function HistoricalDashboardClient() {
  const [weeks, setWeeks] = useState<HistoricalWeek[]>([]);
  const [selectedWeeks, setSelectedWeeks] = useState<Set<number>>(new Set());
  const [clients, setClients] = useState<HistoricalClientRow[]>([]);
  const [loadingWeeks, setLoadingWeeks] = useState(true);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aggregationInfo, setAggregationInfo] = useState<HistoricalDataResponse['aggregation_info'] | null>(null);

  const [sortField, setSortField] = useState<SortField>('new_leads_reached_7d');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedClients, setSelectedClients] = useState<Set<number>>(new Set());

  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('historical_dashboard_visible_columns');
      if (saved) {
        try {
          return new Set(JSON.parse(saved));
        } catch (e) {
          console.error('Failed to parse saved column visibility:', e);
        }
      }
    }
    return new Set(COLUMN_DEFINITIONS.filter(col => col.defaultVisible).map(col => col.id));
  });

  // Fetch available weeks on mount
  useEffect(() => {
    fetch('/api/weeks')
      .then(res => res.json())
      .then((data: WeeksResponse) => {
        setWeeks(data.weeks);
        setLoadingWeeks(false);
      })
      .catch(err => {
        console.error('Failed to fetch weeks:', err);
        setError('Failed to load available weeks');
        setLoadingWeeks(false);
      });
  }, []);

  // Save column visibility to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('historical_dashboard_visible_columns', JSON.stringify(Array.from(visibleColumns)));
    }
  }, [visibleColumns]);

  // Handle week selection change
  useEffect(() => {
    if (selectedWeeks.size === 0) {
      setClients([]);
      setAggregationInfo(null);
      return;
    }

    setLoadingData(true);
    setError(null);

    const weeksParam = Array.from(selectedWeeks).sort((a, b) => a - b).join(',');
    fetch(`/api/dashboard/historical?weeks=${weeksParam}`)
      .then(res => res.json())
      .then((data: HistoricalDataResponse) => {
        setClients(data.data);
        setAggregationInfo(data.aggregation_info);
        setLoadingData(false);
      })
      .catch(err => {
        console.error('Failed to fetch historical data:', err);
        setError('Failed to load historical data');
        setLoadingData(false);
      });
  }, [selectedWeeks]);

  const handleWeekToggle = (weekNumber: number) => {
    setSelectedWeeks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(weekNumber)) {
        newSet.delete(weekNumber);
      } else {
        newSet.add(weekNumber);
      }
      return newSet;
    });
  };

  const handleClearSelection = () => {
    setSelectedWeeks(new Set());
  };

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
      let aVal: number | string | null;
      let bVal: number | string | null;

      if (sortField === 'pcpl') {
        aVal = a.positives_7d > 0 ? a.new_leads_reached_7d / a.positives_7d : null;
        bVal = b.positives_7d > 0 ? b.new_leads_reached_7d / b.positives_7d : null;
      } else if (sortField === 'prorated_target') {
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

      const aNum = typeof aVal === 'number' ? aVal : Number(aVal);
      const bNum = typeof bVal === 'number' ? bVal : Number(bVal);

      if (!isNaN(aNum) && !isNaN(bNum)) {
        return sortOrder === 'asc' ? aNum - bNum : bNum - aNum;
      }

      return 0;
    });
  }, [clients, sortField, sortOrder]);

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
    setVisibleColumns(new Set(['rag_status', 'new_leads_reached_7d']));
  }, []);

  const exportToCSV = () => {
    const dataToExport = selectedClients.size > 0
      ? sortedClients.filter(c => selectedClients.has(c.client_id))
      : sortedClients;

    const headers = [
      'Client Code',
      'Client Company',
      'Status',
      'RAG Status',
      'New Leads',
      'Emails Sent',
      'Replies',
      'Reply Rate',
      'Positive Replies',
      'Positive Rate',
      'PCPL',
      'Target',
      'Volume Attainment',
      'Not Contacted',
      'Selected Weeks',
      'Aggregation Days',
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
        replies,
        c.reply_rate_7d ? (c.reply_rate_7d * 100).toFixed(1) + '%' : 'N/A',
        positives,
        positiveRate,
        pcpl,
        c.weekly_target_int || 'N/A',
        c.weekly_target_int ? ((c.new_leads_reached_7d || 0) / c.weekly_target_int * 100).toFixed(1) + '%' : 'N/A',
        c.not_contacted_leads || 0,
        c.selected_weeks.join(','),
        c.aggregation_days,
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
    link.setAttribute('download', `historical-dashboard-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculate KPIs
  const redCount = clients.filter(c => c.rag_status === 'Red').length;
  const yellowCount = clients.filter(c => c.rag_status === 'Yellow').length;
  const greenCount = clients.filter(c => c.rag_status === 'Green').length;
  const totalClients = clients.length;

  // Format the period info for display
  const formatPeriodInfo = () => {
    if (!aggregationInfo) return '';

    const weekCount = aggregationInfo.week_ranges.length;
    if (weekCount === 0) return '';

    if (weekCount === 1) {
      const range = aggregationInfo.week_ranges[0];
      const startDate = new Date(range.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const endDate = new Date(range.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      return `${startDate} - ${endDate}`;
    }

    const start = new Date(aggregationInfo.week_ranges[0].start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const end = new Date(aggregationInfo.week_ranges[weekCount - 1].end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${start} - ${end} (${aggregationInfo.total_days} days)`;
  };

  if (loadingWeeks) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin mb-3" />
          <p className="text-sm text-slate-600">Loading available weeks...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* PAGE HEADER */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-[1800px] mx-auto px-6 py-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-3">
                <Link
                  href="/"
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  ← Back to Current Week
                </Link>
              </div>
              <h1 className="text-2xl font-semibold text-slate-900 tracking-tight mt-2">Historical Weeks Dashboard</h1>
              <p className="text-sm text-slate-500 mt-1">Select and compare data from historical weeks</p>
            </div>
            <div className="flex items-center gap-3">
              {selectedClients.size > 0 && (
                <span className="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 rounded-md border border-slate-200">
                  {selectedClients.size} selected
                </span>
              )}
              {selectedWeeks.size > 0 && (
                <button
                  onClick={exportToCSV}
                  className={clsx(
                    'inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700',
                    'bg-white hover:bg-slate-50 rounded-md border border-slate-300',
                    'transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2'
                  )}
                  style={{ transition: tokens.transition }}
                >
                  <DownloadIcon />
                  Export
                </button>
              )}
              <ColumnSelector
                columns={COLUMN_DEFINITIONS}
                visibleColumns={visibleColumns}
                onColumnToggle={handleColumnToggle}
                onShowAll={handleShowAllColumns}
                onHideAll={handleHideAllColumns}
              />
            </div>
          </div>

          {/* Week Selector Row */}
          <div className="flex items-center gap-4">
            <WeekSelector
              weeks={weeks}
              selectedWeeks={selectedWeeks}
              onWeekToggle={handleWeekToggle}
              onClearSelection={handleClearSelection}
              loading={loadingWeeks}
            />
            {aggregationInfo && (
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-md">
                <CalendarIcon className="w-4 h-4 text-blue-700" />
                <span className="text-sm font-medium text-blue-900">
                  Showing {formatPeriodInfo()}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Loading State */}
      {loadingData && (
        <div className="max-w-[1800px] mx-auto px-6 py-12">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin mb-3" />
            <p className="text-sm text-slate-600">Loading historical data...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="max-w-[1800px] mx-auto px-6 py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-sm font-semibold text-red-900">{error}</p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loadingData && !error && selectedWeeks.size === 0 && (
        <div className="max-w-[1800px] mx-auto px-6 py-12">
          <div className="bg-white border border-slate-200 rounded-lg p-12 text-center">
            <CalendarIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Select Historical Weeks</h2>
            <p className="text-sm text-slate-500 mb-4">
              {weeks.length === 0
                ? 'No historical data available yet.'
                : `Choose from ${weeks.length} available week${weeks.length !== 1 ? 's' : ''} to view aggregated client health data.`}
            </p>
            {weeks.length > 0 && (
              <p className="text-xs text-slate-400">
                You can select multiple weeks to compare aggregated performance
              </p>
            )}
          </div>
        </div>
      )}

      {/* Dashboard Content */}
      {!loadingData && !error && selectedWeeks.size > 0 && (
        <>
          {/* KPI CARD */}
          <div className="max-w-[1800px] mx-auto px-6 py-6">
            <div
              className={clsx(
                'bg-white rounded-lg border border-slate-200',
                'p-5'
              )}
              style={{ boxShadow: tokens.shadows.card }}
            >
              <div className="grid grid-cols-[40%_60%] gap-6">
                {/* Left Side: Health Status Pills */}
                <div className="flex flex-col justify-center gap-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <KpiPill status="Red" count={redCount} color="red" />
                    <KpiPill status="Amber" count={yellowCount} color="amber" />
                    <KpiPill status="Green" count={greenCount} color="green" />
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {totalClients} clients
                  </div>
                </div>

                {/* Right Side: Compact KPI Tiles */}
                <div className="flex items-center gap-0 overflow-x-auto pl-4 border-l border-slate-100">
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
                    value={formatNumber(clients.reduce((sum, c) => sum + c.positives_7d, 0))}
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
                          label="Emails Sent"
                          sortField={sortField}
                          sortOrder={sortOrder}
                          onSort={handleSort}
                          align="right"
                        />
                      )}
                      {visibleColumns.has('new_leads_reached_7d') && (
                        <SortableHeader
                          field="new_leads_reached_7d"
                          label="New Leads"
                          sortField={sortField}
                          sortOrder={sortOrder}
                          onSort={handleSort}
                          align="right"
                        />
                      )}
                      {visibleColumns.has('prorated_target') && (
                        <SortableHeader
                          field="prorated_target"
                          label="Target"
                          sortField={sortField}
                          sortOrder={sortOrder}
                          onSort={handleSort}
                          align="right"
                        />
                      )}
                      {visibleColumns.has('replies_7d') && (
                        <SortableHeader
                          field="replies_7d"
                          label="Replies"
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
                          label="Positive Replies"
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
                      {visibleColumns.has('monthly_booking_goal') && (
                        <SortableHeader
                          field="monthly_booking_goal"
                          label="Monthly Booking Goal"
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
                      const newLeads = client.new_leads_reached_7d || 0;
                      const positives = client.positives_7d || 0;

                      return (
                        <tr
                          key={client.client_id}
                          className={clsx(
                            'group transition-colors',
                            index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                          )}
                          style={{ transition: tokens.transition }}
                        >
                          <td className="px-4 py-4">
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
                          <td className="px-4 py-4">
                            <div>
                              <div className="font-semibold text-slate-900 text-sm">
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
                          {visibleColumns.has('monthly_booking_goal') && (
                            <td className="px-4 py-4 text-right">
                              {client.monthly_booking_goal !== null && client.monthly_booking_goal !== undefined ? (
                                <Tooltip content="Monthly booking goal">
                                  <div className="font-semibold text-slate-900 text-sm tabular-nums">
                                    {formatNumber(client.monthly_booking_goal)}
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
                  <p className="text-sm text-slate-500">No clients found for the selected weeks</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
