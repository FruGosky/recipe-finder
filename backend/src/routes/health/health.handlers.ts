import { AppRouteHandler } from '@/lib/types';
import { HealthRoute } from './health.routes';

export const health: AppRouteHandler<HealthRoute> = (c) => {
  return c.json({ success: true });
};
