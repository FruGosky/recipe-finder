import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    setupFiles: ['./src/test/setup.ts'],
    globalSetup: ['./src/test/global-setup.ts'],
    env: {
      NODE_ENV: 'test',
    },
    pool: 'forks',
    isolate: false,
  },
});
