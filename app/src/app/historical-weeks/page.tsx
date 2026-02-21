/**
 * Historical Weeks Dashboard - Main Page
 *
 * Allows users to select and view data from historical weeks
 */

import { Suspense } from 'react';
import HistoricalDashboardClient from './HistoricalDashboardClient';

export default function HistoricalWeeksPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Suspense fallback={<div className="p-8 text-slate-600">Loading historical weeks...</div>}>
        <HistoricalDashboardClient />
      </Suspense>
    </main>
  );
}
