/**
 * Unmatched Mappings Page
 */

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { UnmatchedMapping } from '@/lib/types';

export default function UnmatchedPage() {
  const [mappings, setMappings] = useState<UnmatchedMapping[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard/unmatched')
      .then(res => res.json())
      .then(data => {
        setMappings(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch unmatched mappings:', err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">
                Unmatched Client Mappings
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Clients and reporting data that could not be matched
              </p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-[1800px] mx-auto px-6 py-6">
        {loading ? (
          <div className="text-center py-12 text-slate-600">Loading unmatched mappings...</div>
        ) : mappings.length === 0 ? (
          <div className="text-center py-12 text-slate-600">No unmatched mappings found</div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">Type</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">Client Code</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">Normalized Name</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">Last Seen</th>
                    <th className="px-4 py-3 text-right font-semibold text-slate-900">Records</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {mappings.map((mapping, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                          mapping.match_type === 'client_without_reporting'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {mapping.match_type === 'client_without_reporting'
                            ? 'Client Without Reporting'
                            : 'Reporting Without Client'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-900">
                        {mapping.client_code || '-'}
                      </td>
                      <td className="px-4 py-3 text-slate-600 font-mono text-xs">
                        {mapping.client_name_norm}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {mapping.last_seen_date}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-900">
                        {mapping.record_count}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
