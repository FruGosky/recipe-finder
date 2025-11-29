import { execSync } from 'node:child_process';

export const setup = async () => {
  // Run db:push once before all tests
  execSync('bun run db:push');
};
