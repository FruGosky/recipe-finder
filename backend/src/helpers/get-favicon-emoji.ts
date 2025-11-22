import { nodeEnvSchema } from '@/env';
import z from 'zod';

export const getFaviconEmoji = (nodeEnv: z.infer<typeof nodeEnvSchema>): string => {
  switch (nodeEnv) {
    case 'production':
      return '🚀';
    case 'development':
      return '🔧';
    case 'test':
      return '🧪';
    default:
      nodeEnv satisfies never;
      throw new Error(`getFaviconEmoji don't have handled case for '${nodeEnv}'`);
  }
};
