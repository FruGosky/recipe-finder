import { StatusCodes } from 'http-status-codes';
import { getErrorMessage } from './get-error-message';
import { getResponseErrorJSON } from './get-response-error-json';
import { Context } from 'hono';

export const getRequestError = (c: Context, error: unknown) => {
  const httpMethod = c.req.method;
  const originalUrl = c.req.url;
  const errorMessage = getErrorMessage(error);
  console.error(`${httpMethod} ${originalUrl} error: `, errorMessage);
  const errorJSON = getResponseErrorJSON(errorMessage);
  return c.json(errorJSON, StatusCodes.INTERNAL_SERVER_ERROR);
};
