'use client';

import { useState, useRef, useEffect } from 'react';
import { Settings2Icon } from 'lucide-react';

export interface ColumnDefinition {
  id: string;
  label: string;
  category?: string;
  defaultVisible?: boolean;
}

interface ColumnSelectorProps {
  columns: ColumnDefinition[];
  visibleColumns: Set<string>;
  onColumnToggle: (columnId: string) => void;
  onShowAll?: () => void;
  onHideAll?: () => void;
}

export function ColumnSelector({
  columns,
  visibleColumns,
  onColumnToggle,
  onShowAll,
  onHideAll,
}: ColumnSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Group columns by category
  const groupedColumns = columns.reduce((acc, col) => {
    const category = col.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(col);
    return acc;
  }, {} as Record<string, ColumnDefinition[]>);

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

  const visibleCount = visibleColumns.size;
  const totalCount = columns.length;

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 hover:border-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        aria-label={`Column visibility: ${visibleCount} of ${totalCount} columns shown`}
      >
        <Settings2Icon className="w-4 h-4" />
        <span>Columns ({visibleCount}/{totalCount})</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-slate-200 rounded-lg shadow-lg z-50 max-h-[80vh] overflow-y-auto">
          <div className="p-3 border-b border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-2">Show/Hide Columns</h3>
            <div className="flex gap-2">
              {onShowAll && (
                <button
                  onClick={() => onShowAll()}
                  className="flex-1 px-2 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                >
                  Show All
                </button>
              )}
              {onHideAll && (
                <button
                  onClick={() => onHideAll()}
                  className="flex-1 px-2 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-md transition-colors"
                >
                  Hide All
                </button>
              )}
            </div>
          </div>

          <div className="p-2">
            {Object.entries(groupedColumns).map(([category, cols]) => (
              <div key={category} className="mb-3 last:mb-0">
                <div className="px-2 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  {category}
                </div>
                <div className="space-y-0.5">
                  {cols.map((col) => (
                    <label
                      key={col.id}
                      className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-50 rounded-md cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={visibleColumns.has(col.id)}
                        onChange={() => onColumnToggle(col.id)}
                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                      />
                      <span className="text-sm text-slate-700">{col.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
