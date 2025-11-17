import { StatusCodes } from 'http-status-codes';
import { getErrorMessage } from './get-error-message';
import { getResponseErrorJSON } from './get-response-error-json';
import { Request, Response } from 'express';

export const getRequestError = (req: Request, res: Response, error: unknown) => {
  const httpMethod = req.method;
  const originalUrl = req.originalUrl;
  const errorMessage = getErrorMessage(error);
  console.error(`${httpMethod} ${originalUrl} error: `, errorMessage);
  const errorJSON = getResponseErrorJSON(errorMessage);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorJSON);
};
