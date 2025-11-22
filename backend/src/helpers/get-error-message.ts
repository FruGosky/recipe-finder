import { ZodError } from 'zod';
import { $ZodError } from 'zod/v4/core';

export const getErrorMessagesFromZod = (error: ZodError | $ZodError): string => {
  const issue = error.issues[0];
  const issueField = issue.path.join('.') ?? 'unknown path';
  return `[${issueField}]: ${issue.message}`;
};

const getNestedString = (obj: unknown, path: string[]): string | undefined => {
  let current: unknown = obj;
  for (const key of path) {
    if (typeof current !== 'object' || current === null) return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === 'string' ? current : undefined;
};

const PATHS_TO_CHECK_FOR_MESSAGE: string[][] = [
  ['message'],
  ['response', 'data', 'message'],
  ['response', 'data', 'error'],
];

export const getErrorMessage = (error: unknown): string => {
  if (typeof error === 'object' && error && 'error' in error) return getErrorMessage(error.error);
  if (error instanceof ZodError || error instanceof $ZodError) {
    return getErrorMessagesFromZod(error);
  }
  if (typeof error === 'string') return error;

  for (const path of PATHS_TO_CHECK_FOR_MESSAGE) {
    const msg = getNestedString(error, path);
    if (msg) return msg;
  }

  return 'An unknown error occurred';
};
