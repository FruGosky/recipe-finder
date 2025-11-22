import z from 'zod';

export const errorJSONSchema = z.object({
  error: z.string(),
});

export const getResponseErrorJSON = (error: string): z.infer<typeof errorJSONSchema> => {
  if (typeof error !== 'string') {
    return { error: 'Something went wrong while constructing error structure!' };
  }

  return { error };
};
