import { z } from '@hono/zod-openapi';

export const messageJSONSchema = z.object({
  message: z.string(),
});

export const getResponseMessageJSON = (message: string): z.infer<typeof messageJSONSchema> => {
  if (typeof message !== 'string') {
    return { message: 'Something went wrong while constructing message structure!' };
  }

  return { message };
};
