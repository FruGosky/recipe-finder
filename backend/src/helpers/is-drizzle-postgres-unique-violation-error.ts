import { POSTGRES_UNIQUE_VIOLATION_CODE } from '../constants';
import { isDrizzleError } from './is-drizzle-error';
import { isPostgresError } from './is-postgres-error';

export const isDrizzlePostgresUniqueViolationError = (error: unknown): boolean => {
  if (!isDrizzleError(error)) return false;
  if (!isPostgresError(error.cause)) return false;
  return error.cause.code === POSTGRES_UNIQUE_VIOLATION_CODE;
};
