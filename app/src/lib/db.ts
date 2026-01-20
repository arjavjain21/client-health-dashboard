/**
 * Database connection and query utilities
 */

import { Pool } from 'pg';

// Validate DATABASE_URL on startup
if (!process.env.DATABASE_URL) {
  throw new Error(
    'FATAL: DATABASE_URL environment variable is not set. ' +
    'Please check your .env.local file and ensure DATABASE_URL is defined.'
  );
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Add connection error handling
pool.on('error', (err: any) => {
  console.error('Unexpected database pool error:', {
    code: err.code,
    message: err.message,
    hint: 'Check your DATABASE_URL connection string in .env.local',
  });
});

// Health check function to verify database connectivity
export async function healthCheck(): Promise<boolean> {
  try {
    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();
    console.log('✓ Database connection healthy');
    return true;
  } catch (error: any) {
    console.error('✗ Database health check failed:', {
      code: error.code,
      message: error.message,
      hint: 'Verify DATABASE_URL in .env.local and that PostgreSQL is running',
    });
    return false;
  }
}

export async function query<T = any>(
  text: string,
  params?: any[]
): Promise<T[]> {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res.rows;
  } catch (error: any) {
    console.error('Database query error', {
      text,
      code: error.code,
      message: error.message,
      hint: error.code === '28P01'
        ? 'Password authentication failed. Check DATABASE_URL password in .env.local'
        : undefined,
    });
    throw error;
  }
}

export default pool;
