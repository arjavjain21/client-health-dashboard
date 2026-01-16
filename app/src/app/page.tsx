/**
 * Client Health Dashboard - Main Page
 */

import { Suspense } from 'react';
import DashboardClient from './DashboardClient';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Suspense fallback={<div className="p-8 text-slate-600">Loading dashboard...</div>}>
        <DashboardClient />
      </Suspense>
    </main>
  );
}
