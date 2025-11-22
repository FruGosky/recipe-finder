import { Context, Next } from 'hono';
import pino from 'pino';
import { ENV } from '../env';
import { AppEnv } from '../lib/types';

// Create pino logger instance
const logger = pino({
  level: ENV.LOG_LEVEL,
  transport: ENV.NODE_ENV !== 'production' ? { target: 'pino-pretty' } : undefined,
});

export const pinoLogger = async (c: Context<AppEnv>, next: Next) => {
  const start = Date.now();
  const requestId = c.var.requestId;

  // Create child logger with request ID
  const childLogger = logger.child({ requestId });

  // Log incoming request
  childLogger.info(
    {
      method: c.req.method,
      url: c.req.url,
      path: c.req.path,
    },
    'incoming request'
  );

  // Set logger on context for route handlers
  c.set('logger', childLogger);

  // Execute next middleware/handler
  await next();

  // Calculate response time
  const duration = Date.now() - start;

  // Log outgoing response
  childLogger.info(
    {
      method: c.req.method,
      url: c.req.url,
      path: c.req.path,
      status: c.res.status,
      duration: `${duration}ms`,
    },
    'request completed'
  );
};
