import * as StatusCodes from '@/lib/http-status-codes';
import type { NotFoundHandler } from 'hono';

const NOT_FOUND_MESSAGE = 'Not Found';

export const notFound: NotFoundHandler = (c) => {
  return c.json(
    {
      message: `${NOT_FOUND_MESSAGE} - ${c.req.path}`,
    },
    StatusCodes.NOT_FOUND
  );
};
