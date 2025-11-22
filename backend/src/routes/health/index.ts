import { createRouter } from '@/helpers/create-app';
import * as handlers from './health.handlers';
import * as routes from './health.routes';

export const healthRouter = createRouter().openapi(routes.health, handlers.health);
