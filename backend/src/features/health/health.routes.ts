import { checkHealth } from './health.controller';
import { Hono } from 'hono';

const router = new Hono();

router.get('/', checkHealth);

export { router as healthRouter };
