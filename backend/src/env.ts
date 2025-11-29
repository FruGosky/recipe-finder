import { z } from 'zod';
import dotenv from 'dotenv';
import { getFaviconEmoji } from './helpers/get-favicon-emoji';

const showEnvValidationError = (error: z.ZodError) => {
  console.error('❌ Invalid or missing environment variables:');
  error.issues.forEach((issue) => {
    console.error(`- ${issue.path.join('.')}: ${issue.message}`);
  });
};

export const nodeEnvSchema = z.enum(['production', 'development', 'test']).default('development');
const safeParseNodeEnv = nodeEnvSchema.safeParse(process.env.NODE_ENV);
if (!safeParseNodeEnv.success) {
  showEnvValidationError(safeParseNodeEnv.error);
  process.exit(1);
}

const envFileMap: Record<z.infer<typeof nodeEnvSchema>, string> = {
  production: '.env.production',
  development: '.env.development',
  test: '.env.test',
};
dotenv.config({ path: envFileMap[safeParseNodeEnv.data] });

const envSchema = z.object({
  PORT: z.coerce.number(),
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_DATABASE: z.string(),
  DB_PORT: z.coerce.number(),
  NODE_ENV: nodeEnvSchema,
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),
});

const safeParseEnvObj = envSchema.safeParse(process.env);
if (!safeParseEnvObj.success) {
  showEnvValidationError(safeParseEnvObj.error);
  process.exit(1);
}

const envIcon = getFaviconEmoji(safeParseEnvObj.data.NODE_ENV);
console.info(`${envIcon} App running in ${safeParseEnvObj.data.NODE_ENV.toUpperCase()} mode!`);
console.info(`✅ All environment variables are valid.`);

export const ENV = safeParseEnvObj.data;
