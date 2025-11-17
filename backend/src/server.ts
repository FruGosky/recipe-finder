import { app } from './app';
import { ENV } from './env';

Bun.serve({
  fetch: app.fetch,
  port: ENV.PORT,
});
