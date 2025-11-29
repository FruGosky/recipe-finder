import { afterEach } from 'vitest';
import { destroyTestDb } from '@/db/db';

// Clean up database after each test
afterEach(async () => {
  await destroyTestDb();
});
