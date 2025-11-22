import type { z, OpenAPIHono, RouteConfig, RouteHandler } from '@hono/zod-openapi';
import type { Schema } from 'hono';
import type { Logger } from 'pino';

export type ZodSchema = z.ZodUnion | z.ZodObject | z.ZodArray<z.ZodObject>;

export type AppEnv = {
  Variables: {
    logger: Logger;
  };
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type AppOpenAPI<S extends Schema = {}> = OpenAPIHono<AppEnv, S>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppEnv>;
