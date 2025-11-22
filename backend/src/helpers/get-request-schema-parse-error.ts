import { ZodError } from 'zod';
import { Context } from 'hono';
import * as StatusCodes from '@/lib/http-status-codes';
import { getErrorMessage } from './get-error-message';
import { getResponseErrorJSON } from './get-response-error-json';
import { $ZodError } from 'zod/v4/core';

export const getRequestSchemaParseError = (c: Context, error: ZodError | $ZodError) => {
  const errorMessage = getErrorMessage(error);
  const errorJSON = getResponseErrorJSON(errorMessage);
  return c.json(errorJSON, StatusCodes.UNPROCESSABLE_ENTITY);
};
