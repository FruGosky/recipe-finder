import { DrizzleQueryError } from 'drizzle-orm';

export const isDrizzleError = (error: unknown): error is DrizzleQueryError => {
  return error instanceof DrizzleQueryError;
};
