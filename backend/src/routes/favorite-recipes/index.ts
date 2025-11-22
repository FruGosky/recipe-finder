import { createRouter } from '@/helpers/create-app';
import * as handlers from './favorite-recipes.handlers';
import * as routes from './favorite-recipes.routes';

export const favoriteRecipesRouter = createRouter()
  .openapi(routes.create, handlers.create)
  .openapi(routes.getAll, handlers.getAll)
  .openapi(routes.getById, handlers.getById)
  .openapi(routes.update, handlers.update)
  .openapi(routes.deleteOne, handlers.deleteOne);
