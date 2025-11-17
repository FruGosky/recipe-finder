import dotenv from 'dotenv';
import { z } from 'zod';

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';

dotenv.config({ path: envFile });

const envSchema = z.object({
  PORT: z.coerce.number(),
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_DATABASE: z.string(),
  DB_PORT: z.coerce.number(),
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

export const ENV = safeParseEnvObj.data;
