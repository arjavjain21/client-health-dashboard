/**
 * Quick Refresh API Endpoint
 *
 * Triggers a quick data refresh from Supabase WITHOUT calling SmartLead API.
 * This preserves the not_contacted_leads values that are updated daily by cron.
 *
 * SmartLead API integration runs ONLY during scheduled cron jobs (3:00 AM UTC).
 */

import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    console.log('Quick refresh started...');
    const startTime = Date.now();

    // Run ingestion script with --skip-smartlead flag
    const scriptPath = '/home/ubuntu/client-health-dashboard/ingest/ingest_main.py';
    const venvPath = '/home/ubuntu/client-health-dashboard/venv/bin/python';

    const { stdout, stderr } = await execAsync(`${venvPath} ${scriptPath} --skip-smartlead`, {
      cwd: '/home/ubuntu/client-health-dashboard',
      timeout: 120000, // 2 minute timeout
      maxBuffer: 1024 * 1024 * 10 // 10MB buffer
    });

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);

    console.log('Quick refresh completed in', duration, 'seconds');
    console.log('Output:', stdout);

    if (stderr && stderr.includes('ERROR')) {
      console.error('Refresh errors:', stderr);
      return NextResponse.json(
        {
          error: 'Refresh completed with errors',
          details: stderr,
          duration: `${duration}s`
        },
        { status: 207 } // 207 Multi-Status (partial success)
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Dashboard data refreshed successfully (SmartLead data preserved)',
      duration: `${duration}s`,
      note: 'Not contacted leads data is updated daily at 3:00 AM UTC'
    });

  } catch (error: any) {
    console.error('Quick refresh error:', error);

    return NextResponse.json(
      {
        error: 'Failed to refresh dashboard data',
        details: error.message,
        stdout: error.stdout || '',
        stderr: error.stderr || ''
      },
      { status: 500 }
    );
  }
}
