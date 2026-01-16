/**
 * API route for triggering manual data refresh from Supabase
 */

import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    // Log file for this refresh
    const logDir = path.join(process.env.HOME || '/home/ubuntu', 'client-health-dashboard', 'logs');
    const logFile = path.join(logDir, `refresh_${Date.now()}.log`);

    // Ensure log directory exists
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    // Trigger the ingestion script
    const ingestScript = path.join(process.env.HOME || '/home/ubuntu', 'client-health-dashboard', 'ingest', 'ingest_main.py');
    const venvPython = path.join(process.env.HOME || '/home/ubuntu', 'client-health-dashboard', 'venv', 'bin', 'python');

    // Run ingestion in background
    const command = `cd ${path.join(process.env.HOME || '/home/ubuntu', 'client-health-dashboard')} && ${venvPython} ${ingestScript} > ${logFile} 2>&1 &`;

    execAsync(command);

    return NextResponse.json({
      success: true,
      message: 'Data refresh initiated. This will take 30-60 seconds. Please refresh the page afterwards.',
      logFile: logFile
    });
  } catch (error) {
    console.error('Refresh API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to initiate data refresh'
      },
      { status: 500 }
    );
  }
}
