import { z } from 'zod';
import { getFaviconEmoji } from './helpers/get-favicon-emoji';

const envSchema = z.object({
  PORT: z.coerce.number(),
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_DATABASE: z.string(),
  DB_PORT: z.coerce.number(),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),
});

const safeParseEnvObj = envSchema.safeParse(process.env);

if (!safeParseEnvObj.success) {
  console.error('❌ Invalid or missing environment variables:');
  safeParseEnvObj.error.issues.forEach((error) => {
    console.error(`- ${error.path.join('.')}: ${error.message}`);
  });
  process.exit(1);
} else {
  console.info('✅ All environment variables are valid.');
}
const envIcon = getFaviconEmoji(safeParseEnvObj.data.NODE_ENV);
console.info(`${envIcon} App running in ${safeParseEnvObj.data.NODE_ENV.toUpperCase()} mode!`);
console.info(`✅ All environment variables are valid.`);

export const ENV = safeParseEnvObj.data;
