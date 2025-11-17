import { DB_CREDENTIALS } from './src/constants';
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: DB_CREDENTIALS,
} satisfies Config;
