import { createRoute, z } from '@hono/zod-openapi';
import { jsonContent } from '../../helpers/json-content';
import * as StatusCodes from '@/lib/http-status-codes';

const tags = ['Health'];

export const health = createRoute({
  path: '/health',
  method: 'get',
  tags,
  responses: {
    [StatusCodes.OK]: jsonContent(
      z.object({
        success: z.boolean(),
      }),
      'Returns { success: true }'
    ),
  },
});

export type HealthRoute = typeof health;
