import * as StatusCodes from '@/lib/http-status-codes';
import type { ErrorHandler } from 'hono';
import type { ContentfulStatusCode } from 'hono/utils/http-status';
import { ENV } from '../env';

export const onError: ErrorHandler = (err, c) => {
  const currentStatus = 'status' in err ? err.status : c.newResponse(null).status;
  const statusCode =
    currentStatus !== StatusCodes.OK
      ? (currentStatus as ContentfulStatusCode)
      : StatusCodes.INTERNAL_SERVER_ERROR;

  return c.json(
    {
      message: err.message,

      stack: ENV.NODE_ENV === 'production' ? undefined : err.stack,
    },
    statusCode
  );
};
