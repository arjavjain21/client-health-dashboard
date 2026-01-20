/**
 * Health check endpoint for monitoring database connectivity
 */

import { NextResponse } from 'next/server';
import { healthCheck } from '@/lib/db';

export async function GET() {
  const isHealthy = await healthCheck();

  if (isHealthy) {
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
    });
  } else {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Database connection failed',
      },
      { status: 503 }
    );
  }
}
