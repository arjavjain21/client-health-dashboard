/**
 * Client Detail Page
 */

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import type { ClientDetail } from '@/lib/types';

export default function ClientDetailPage() {
  const params = useParams();
  const client_code = params.client_code as string;
  const [detail, setDetail] = useState<ClientDetail | null>(null);
  const [loading, setLoading] = useState(true);

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

  const { client, trendData, campaigns } = detail;

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
          <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
            <h2 className="text-lg font-semibold text-slate-900">Campaign Breakdown (Last 7 Days)</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-slate-900">Campaign</th>
                  <th className="px-4 py-2 text-left font-semibold text-slate-900">Status</th>
                  <th className="px-4 py-2 text-right font-semibold text-slate-900">Sent</th>
                  <th className="px-4 py-2 text-right font-semibold text-slate-900">Replies</th>
                  <th className="px-4 py-2 text-right font-semibold text-slate-900">Positives</th>
                  <th className="px-4 py-2 text-right font-semibold text-slate-900">Bounces</th>
                  <th className="px-4 py-2 text-right font-semibold text-slate-900">Reply Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {campaigns.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-slate-600">No campaigns in last 7 days</td>
                  </tr>
                ) : (
                  campaigns.map((campaign) => (
                    <tr key={campaign.campaign_id} className="hover:bg-slate-50">
                      <td className="px-4 py-2 text-slate-900">{campaign.campaign_name}</td>
                      <td className="px-4 py-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700">
                          {campaign.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-right text-slate-900">{campaign.total_sent.toLocaleString()}</td>
                      <td className="px-4 py-2 text-right text-slate-900">{campaign.replies_count}</td>
                      <td className="px-4 py-2 text-right text-slate-900">{campaign.positive_reply}</td>
                      <td className="px-4 py-2 text-right text-slate-900">{campaign.bounce_count}</td>
                      <td className="px-4 py-2 text-right text-slate-900">
                        {campaign.reply_rate ? `${(campaign.reply_rate * 100).toFixed(2)}%` : 'N/A'}
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
