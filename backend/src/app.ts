import { createApp } from './helpers/create-app';
import configureOpenAPI from './lib/configure-open-api';
import { healthRouter } from '@/routes/health';
import { favoriteRecipesRouter } from './routes/favorite-recipes';

export const app = createApp();

configureOpenAPI(app);

const routes = [healthRouter, favoriteRecipesRouter] as const;

routes.forEach((route) => {
  app.route('/api', route);
});

export type AppType = (typeof routes)[number];

// Test usage on FE
// import { hc } from 'hono/client';
// import { ENV } from './env';
// const client = hc<AppType>(`http://localhost:${ENV.PORT}/api/`);

// const x = async () =>
//   client['favorite-recipes'].$post({
//     json: {
//       title: 'Test2',
//       userId: '3',
//       recipeId: 3,
//       cookTime: null,
//       image: null,
//       servings: null,
//     },
//   });

// setTimeout(async () => {
//   return console.log(await x());
// }, 3_000);
