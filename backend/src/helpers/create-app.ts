import { AppEnv } from './../lib/types';
import type { Schema } from 'hono';
import { requestId } from 'hono/request-id';
import type { AppOpenAPI } from '../lib/types';
import serveEmojiFavicon from './serve-emoji-favicon';
import { defaultHook } from './default-hook';
import { notFound } from '../middlewares/not-found';
import { onError } from '../middlewares/on-error';
import { pinoLogger } from '../middlewares/pino-logger';
import { OpenAPIHono } from '@hono/zod-openapi';
import { getFaviconEmoji } from './get-favicon-emoji';
import { ENV } from '@/env';

export const createRouter = () => {
  return new OpenAPIHono<AppEnv>({
    strict: false,
    defaultHook,
  });
};

export const createApp = () => {
  const app = createRouter();

  app
    .use(serveEmojiFavicon(getFaviconEmoji(ENV.NODE_ENV)))
    .use(requestId())
    .use(pinoLogger)
    .notFound(notFound)
    .onError(onError);

  return app;
};

export const createTestApp = <S extends Schema>(router: AppOpenAPI<S>) => {
  return createApp().route('/', router);
};
