import { ZodSchema } from '../lib/types';

export const jsonContent = <T extends ZodSchema, D extends string>(schema: T, description: D) => {
  return {
    content: {
      'application/json': {
        schema,
      },
    },
    description,
  };
};
