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
import { RouteReturnMessages } from '@/lib/types';

const tags = ['Favorite Recipes'];

const PATH_PREFIX = '/favorite-recipes';

export const routeReturnMessages = {
  create: {
    request: {
      body: 'Favorite Recipe to create',
    },
    responses: {
      INTERNAL_SERVER_ERROR: 'Something went wrong',
      CONFLICT: 'Favorite recipe already exists',
      CREATED: 'Favorite Recipe created, returns created entity',
    },
  },
  getAll: {
    responses: {
      INTERNAL_SERVER_ERROR: 'Something went wrong',
      OK: 'Returns all favorite recipes for user',
    },
  },
  getById: {
    responses: {
      INTERNAL_SERVER_ERROR: 'Something went wrong',
      UNPROCESSABLE_ENTITY: 'Invalid data',
      NOT_FOUND: 'Favorite Recipe with provided id was not found',
      OK: 'Returns favorite recipe with provided id',
    },
  },
  update: {
    request: {
      body: 'Favorite Recipe to update',
    },
    responses: {
      INTERNAL_SERVER_ERROR: 'Something went wrong',
      UNPROCESSABLE_ENTITY: 'Invalid data',
      NOT_FOUND: 'Favorite Recipe with provided combo of ids was not found',
      OK: 'Returns all favorite recipes for user',
    },
  },
  deleteOne: {
    responses: {
      INTERNAL_SERVER_ERROR: 'Something went wrong',
      UNPROCESSABLE_ENTITY: 'Invalid data',
      NOT_FOUND: 'Favorite Recipe with provided combo of ids was not found',
      OK: 'Favorite recipe removed, returns successful message',
    },
  },
} as const satisfies Record<string, RouteReturnMessages>;

export const create = createRoute({
  path: PATH_PREFIX,
  method: 'post',
  tags,
  request: {
    body: jsonContentRequired(createFavoriteRecipeSchema, routeReturnMessages.create.request.body),
  },
  responses: {
    [StatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorJSONSchema,
      routeReturnMessages.create.responses.INTERNAL_SERVER_ERROR
    ),
    [StatusCodes.CONFLICT]: jsonContent(
      errorJSONSchema,
      routeReturnMessages.create.responses.CONFLICT
    ),
    [StatusCodes.CREATED]: jsonContent(
      favoriteRecipeSchema,
      routeReturnMessages.create.responses.CREATED
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
    [StatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorJSONSchema,
      routeReturnMessages.getAll.responses.INTERNAL_SERVER_ERROR
    ),
    [StatusCodes.OK]: jsonContent(
      favoriteRecipeSchema.array(),
      routeReturnMessages.getAll.responses.OK
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
    [StatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorJSONSchema,
      routeReturnMessages.getById.responses.INTERNAL_SERVER_ERROR
    ),
    [StatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      errorJSONSchema,
      routeReturnMessages.getById.responses.UNPROCESSABLE_ENTITY
    ),
    [StatusCodes.NOT_FOUND]: jsonContent(
      errorJSONSchema,
      routeReturnMessages.getById.responses.NOT_FOUND
    ),
    [StatusCodes.OK]: jsonContent(favoriteRecipeSchema, routeReturnMessages.getById.responses.OK),
  },
});

export const update = createRoute({
  path: `${PATH_PREFIX}/:userId/:recipeId`,
  method: 'patch',
  tags,
  request: {
    params: getFavoriteRecipeByIdParamsSchema,
    body: jsonContentRequired(updateFavoriteRecipeSchema, routeReturnMessages.update.request.body),
  },
  responses: {
    [StatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorJSONSchema,
      routeReturnMessages.update.responses.INTERNAL_SERVER_ERROR
    ),
    [StatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      errorJSONSchema,
      routeReturnMessages.update.responses.UNPROCESSABLE_ENTITY
    ),
    [StatusCodes.NOT_FOUND]: jsonContent(
      errorJSONSchema,
      routeReturnMessages.update.responses.NOT_FOUND
    ),
    [StatusCodes.OK]: jsonContent(messageJSONSchema, routeReturnMessages.update.responses.OK),
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
    [StatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorJSONSchema,
      routeReturnMessages.deleteOne.responses.OK
    ),
    [StatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      errorJSONSchema,
      routeReturnMessages.deleteOne.responses.UNPROCESSABLE_ENTITY
    ),
    [StatusCodes.NOT_FOUND]: jsonContent(
      errorJSONSchema,
      routeReturnMessages.deleteOne.responses.UNPROCESSABLE_ENTITY
    ),
    [StatusCodes.OK]: jsonContent(messageJSONSchema, routeReturnMessages.deleteOne.responses.OK),
  },
});

export type CreateRoute = typeof create;
export type GetAllRoute = typeof getAll;
export type GetByIdRoute = typeof getById;
export type UpdateRoute = typeof update;
export type DeleteOneRoute = typeof deleteOne;
