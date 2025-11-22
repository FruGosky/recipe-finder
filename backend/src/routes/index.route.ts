import { createRoute } from '@hono/zod-openapi';

import { jsonContent } from '../helpers/json-content';
import { createMessageObjectSchema } from '../helpers/create-message-object-schema';
import { createRouter } from '../helpers/create-app';
import * as StatusCodes from '@/lib/http-status-codes';

export const router = createRouter().openapi(
  createRoute({
    tags: ['Index'],
    method: 'get',
    path: '/',
    responses: {
      [StatusCodes.OK]: jsonContent(createMessageObjectSchema('Tasks API'), 'Tasks API Index'),
    },
  }),
  (c) => {
    return c.json(
      {
        message: 'Tasks API',
      },
      StatusCodes.OK
    );
  }
);
