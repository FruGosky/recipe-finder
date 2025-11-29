import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import { POOL_CONFIG } from '../constants';
import { Pool } from 'pg';
import { ENV } from '@/env';

export const pool = new Pool(POOL_CONFIG);

export const db = drizzle(pool, { schema, casing: 'snake_case' });

export const destroyTestDb = async () => {
  if (ENV.NODE_ENV !== 'test') return;

  // Get all user tables (excluding system tables)
  const tablesResult = await pool.query<{ table_name: string }>(
    `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE'
      `
  );

  if (tablesResult.rows.length > 0) {
    // Build TRUNCATE statement for all tables
    const tableNames = tablesResult.rows.map((row) => `"${row.table_name}"`).join(', ');
    await pool.query(`TRUNCATE TABLE ${tableNames} RESTART IDENTITY CASCADE`);
  }
};
