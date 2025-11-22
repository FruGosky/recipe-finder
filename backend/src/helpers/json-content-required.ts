import { ZodSchema } from '@/lib/types.js';
import { jsonContent } from './json-content.js';

export const jsonContentRequired = <T extends ZodSchema>(schema: T, description: string) => {
  return {
    ...jsonContent(schema, description),
    required: true,
  };
};
