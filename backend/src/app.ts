import { favoriteRecipesRouter } from './features/favorite-recipes/favorite-recipes.routes';
import { healthRouter } from './features/health/health.routes';
import { Hono } from 'hono';

const app = new Hono();

// Routes
app.route('/api/health', healthRouter);
app.route('/api/favorite-recipes', favoriteRecipesRouter);

export { app };
