import { getErrorMessage } from './get-error-message';
import { getResponseErrorJSON } from './get-response-error-json';
import { Context } from 'hono';
import { ContentfulStatusCode, SuccessStatusCode } from 'hono/utils/http-status';

export const getRequestError = <TStatus extends Exclude<ContentfulStatusCode, SuccessStatusCode>>(
  c: Context,
  error: unknown,
  statusCode: TStatus
) => {
  const httpMethod = c.req.method;
  const originalUrl = c.req.url;
  const errorMessage = getErrorMessage(error);
  console.error(`${httpMethod} ${originalUrl} error: `, errorMessage);
  const errorJSON = getResponseErrorJSON(errorMessage);
  return c.json(errorJSON, statusCode);
};
