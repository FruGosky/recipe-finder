import express from 'express';
import { favoriteRecipesRouter } from './features/favorite-recipes/favorite-recipes.routes';
import { healthCheckRouter } from './features/health-check/health-check.routes';

const app = express();

// Middleware
app.use(express.json()); // For handling JSON
app.use(express.urlencoded({ extended: true })); // For handling FormData

// Routes
app.get('/api/health-check', healthCheckRouter);
app.use('/api/favorite-recipes', favoriteRecipesRouter);

export { app };
