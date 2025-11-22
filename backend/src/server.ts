import { app } from './app';
import { ENV } from './env';

const server = Bun.serve({
  fetch: app.fetch,
  port: ENV.PORT,
});

console.info(`🚀 Server is running on: ${server.url}`);
