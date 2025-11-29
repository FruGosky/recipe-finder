import { PoolConfig } from 'pg';
import { ENV } from './env';

export const DB_CREDENTIALS = {
  host: ENV.DB_HOST,
  user: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_DATABASE,
  port: ENV.DB_PORT,
  ssl: false,
} satisfies PoolConfig;

export const POOL_CONFIG: PoolConfig = {
  ...DB_CREDENTIALS,
  max: 10,
  idleTimeoutMillis: 30000,
};

export const POSTGRES_UNIQUE_VIOLATION_CODE = '23505';

const BASE_ROUTES_PREFIX = '/api';

export const ROUTES = {
  health: `${BASE_ROUTES_PREFIX}/health`,
  favoriteRecipes: `${BASE_ROUTES_PREFIX}/favorite-recipes`,
} as const satisfies Record<string, string>;
