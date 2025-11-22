import { POSTGRES_UNIQUE_VIOLATION_CODE } from '@/constants';
import { DrizzleQueryError } from 'drizzle-orm';
import { DatabaseError } from 'pg';

const isDrizzleError = (error: unknown): error is DrizzleQueryError => {
  return error instanceof DrizzleQueryError;
};

const isPostgresError = (error: unknown): error is DatabaseError => {
  return error instanceof DatabaseError;
};

export const isDatabaseUniqueViolationError = (error: unknown): boolean => {
  if (!isDrizzleError(error)) return false;
  if (!isPostgresError(error.cause)) return false;
  return error.cause.code === POSTGRES_UNIQUE_VIOLATION_CODE;
};
