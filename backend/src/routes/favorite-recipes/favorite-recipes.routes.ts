import * as StatusCodes from '@/lib/http-status-codes';
import {
  createFavoriteRecipeSchema,
  deleteFavoriteRecipeParamsSchema,
  favoriteRecipeSchema,
  getAllFavoriteRecipesParamsSchema,
  getFavoriteRecipeByIdParamsSchema,
  updateFavoriteRecipeSchema,
} from './favorite-recipes.schema';
import { errorJSONSchema } from '../../helpers/get-response-error-json';
import { messageJSONSchema } from '../../helpers/get-response-message.json';
import { createRoute } from '@hono/zod-openapi';
import { jsonContent } from '../../helpers/json-content';
import { jsonContentRequired } from '@/helpers/json-content-required';

const tags = ['Favorite Recipes'];

const PATH_PREFIX = '/favorite-recipes';

export const create = createRoute({
  path: PATH_PREFIX,
  method: 'post',
  tags,
  request: {
    body: jsonContentRequired(createFavoriteRecipeSchema, 'Favorite Recipe to create'),
  },
  responses: {
    [StatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(errorJSONSchema, 'Something went wrong'),
    [StatusCodes.CONFLICT]: jsonContent(errorJSONSchema, 'Favorite recipe already exists'),
    [StatusCodes.CREATED]: jsonContent(
      favoriteRecipeSchema,
      'Favorite Recipe created, returns created entity'
    ),
  },
});

export const getAll = createRoute({
  path: `${PATH_PREFIX}/:userId`,
  method: 'get',
  tags,
  request: {
    params: getAllFavoriteRecipesParamsSchema,
  },
  responses: {
    [StatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(errorJSONSchema, 'Something went wrong'),
    [StatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(errorJSONSchema, 'Invalid data'),
    [StatusCodes.OK]: jsonContent(
      favoriteRecipeSchema.array(),
      'Returns all favorite recipes for user'
    ),
  },
});

export const getById = createRoute({
  path: `${PATH_PREFIX}/:userId/:recipeId`,
  method: 'get',
  tags,
  request: {
    params: getFavoriteRecipeByIdParamsSchema,
  },
  responses: {
    [StatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(errorJSONSchema, 'Something went wrong'),
    [StatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(errorJSONSchema, 'Invalid data'),
    [StatusCodes.NOT_FOUND]: jsonContent(
      errorJSONSchema,
      'Favorite Recipe with provided id was not found'
    ),
    [StatusCodes.OK]: jsonContent(favoriteRecipeSchema, 'Returns favorite recipe with provided id'),
  },
});

export const update = createRoute({
  path: `${PATH_PREFIX}/:userId/:recipeId`,
  method: 'patch',
  tags,
  request: {
    params: getFavoriteRecipeByIdParamsSchema,
    body: jsonContentRequired(updateFavoriteRecipeSchema, 'Favorite Recipe to create'),
  },
  responses: {
    [StatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(errorJSONSchema, 'Something went wrong'),
    [StatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(errorJSONSchema, 'Invalid data'),
    [StatusCodes.NOT_FOUND]: jsonContent(
      errorJSONSchema,
      'Favorite Recipe with provided combo of ids was not found'
    ),
    [StatusCodes.OK]: jsonContent(messageJSONSchema, 'Returns all favorite recipes for user'),
  },
});

export const deleteOne = createRoute({
  path: `${PATH_PREFIX}/:userId/:recipeId`,
  method: 'delete',
  tags,
  request: {
    params: deleteFavoriteRecipeParamsSchema,
  },
  responses: {
    [StatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(errorJSONSchema, 'Something went wrong'),
    [StatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(errorJSONSchema, 'Invalid data'),
    [StatusCodes.NOT_FOUND]: jsonContent(
      errorJSONSchema,
      'Favorite Recipe with provided combo of ids was not found'
    ),
    [StatusCodes.OK]: jsonContent(
      messageJSONSchema,
      'Favorite recipe removed, returns successful message'
    ),
  },
});

export type CreateRoute = typeof create;
export type GetAllRoute = typeof getAll;
export type GetByIdRoute = typeof getById;
export type UpdateRoute = typeof update;
export type DeleteOneRoute = typeof deleteOne;
