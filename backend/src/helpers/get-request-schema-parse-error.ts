import { ZodError } from 'zod';
import { Context } from 'hono';
import { StatusCodes } from 'http-status-codes';
import { getErrorMessage } from './get-error-message';
import { getResponseErrorJSON } from './get-response-error-json';

export const getRequestSchemaParseError = (c: Context, error: ZodError) => {
  const errorMessage = getErrorMessage(error);
  const errorJSON = getResponseErrorJSON(errorMessage);
  return c.json(errorJSON, StatusCodes.UNPROCESSABLE_ENTITY);
};
