import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import { DB_CREDENTIALS } from '../constants';
import { Pool } from 'pg';

const pool = new Pool(DB_CREDENTIALS);

export const db = drizzle(pool, { schema, casing: 'snake_case' });
