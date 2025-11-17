import { Router } from 'express';
import { checkHealth } from './health-check.controller';

const router = Router();

router.get('/', checkHealth);

export { router as healthCheckRouter };
