import { z } from '@hono/zod-openapi';

export const createMessageObjectSchema = (exampleMessage: string = 'example') => {
  return z
    .object({
      message: z.string(),
    })
    .openapi({
      example: {
        message: exampleMessage,
      },
    });
};
