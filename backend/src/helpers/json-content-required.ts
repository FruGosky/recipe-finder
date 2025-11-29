import { ZodSchema } from '@/lib/types.js';
import { jsonContent } from './json-content.js';

export const jsonContentRequired = <T extends ZodSchema, D extends string>(
  schema: T,
  description: D
) => {
  return {
    ...jsonContent(schema, description),
    required: true,
  } as const;
};
