import * as StatusCodes from '@/lib/http-status-codes';
import type { Hook } from '@hono/zod-openapi';
import { getRequestError } from './get-request-error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const defaultHook: Hook<any, any, any, any> = (result, c) => {
  if (result.success === false) {
    return getRequestError(c, result, StatusCodes.UNPROCESSABLE_ENTITY);
  }
};
