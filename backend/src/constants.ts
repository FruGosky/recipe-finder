import { PoolConfig } from 'pg';
import { ENV } from './env';

export const DB_CREDENTIALS: PoolConfig = {
  host: ENV.DB_HOST,
  user: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_DATABASE,
  port: ENV.DB_PORT,
  ssl: { rejectUnauthorized: false },
};

export const POSTGRES_UNIQUE_VIOLATION_CODE = '23505';
