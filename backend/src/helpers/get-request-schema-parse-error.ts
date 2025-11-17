import { ZodError } from 'zod';
import { Response } from 'express';
import { getErrorMessage } from './get-error-message';
import { StatusCodes } from 'http-status-codes';
import { getResponseErrorJSON } from './get-response-error-json';

export const getRequestSchemaParseError = (res: Response, error: ZodError) => {
  const errorMessage = getErrorMessage(error);
  const errorJSON = getResponseErrorJSON(errorMessage);
  return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(errorJSON);
};
