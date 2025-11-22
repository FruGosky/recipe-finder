import { and, eq } from 'drizzle-orm';
import * as StatusCodes from '@/lib/http-status-codes';
import { db } from '../../db/db';
import { favoriteRecipesTable } from '../../db/schema';
import { getRequestError } from '../../helpers/get-request-error';
import { FavoriteRecipe, UpdateFavoriteRecipe } from './favorite-recipes.schema';
import { getResponseMessageJSON } from '../../helpers/get-response-message.json';
import { getResponseErrorJSON } from '../../helpers/get-response-error-json';
import { AppRouteHandler } from '@/lib/types';
import {
  CreateRoute,
  DeleteOneRoute,
  GetAllRoute,
  GetByIdRoute,
  UpdateRoute,
} from './favorite-recipes.routes';
import { isDatabaseUniqueViolationError } from '@/db/is-database-unique-violation-error';

// CREATE
export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const data = c.req.valid('json');

  try {
    const [newFavoriteRecipe] = await db.insert(favoriteRecipesTable).values(data).returning();
    if (!newFavoriteRecipe) throw new Error('Insert failed, no data was returned!');

    return c.json(newFavoriteRecipe, StatusCodes.CREATED);
  } catch (error) {
    if (isDatabaseUniqueViolationError(error)) {
      const errorJSON = getResponseErrorJSON(
        `Favorite Recipe with recipeId '${data.recipeId}' & userId '${data.userId}' already exists!`
      );
      return c.json(errorJSON, StatusCodes.CONFLICT);
    }

    return getRequestError(c, error, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

// GET ALL
export const getAll: AppRouteHandler<GetAllRoute> = async (c) => {
  const data = c.req.valid('param');

  try {
    const favoriteRecipes = await db
      .select()
      .from(favoriteRecipesTable)
      .where(eq(favoriteRecipesTable.userId, data.userId));
    return c.json(favoriteRecipes, StatusCodes.OK);
  } catch (error) {
    return getRequestError(c, error, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

// GET BY ID
export const getById: AppRouteHandler<GetByIdRoute> = async (c) => {
  const data = c.req.valid('param');

  try {
    const [favoriteRecipe] = await db
      .select()
      .from(favoriteRecipesTable)
      .where(
        and(
          eq(favoriteRecipesTable.userId, data.userId),
          eq(favoriteRecipesTable.recipeId, data.recipeId)
        )
      )
      .limit(1);

    if (!favoriteRecipe) {
      const messageJSON = getResponseErrorJSON(
        `Recipe with userId '${data.userId}' & recipeId '${data.recipeId}' was not found!`
      );
      return c.json(messageJSON, StatusCodes.NOT_FOUND);
    }

    return c.json(favoriteRecipe, StatusCodes.OK);
  } catch (error) {
    return getRequestError(c, error, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

// UPDATE
export const update: AppRouteHandler<UpdateRoute> = async (c) => {
  const paramsData = c.req.valid('param');
  const bodyData = c.req.valid('json');

  try {
    const updatedFavoriteRecipe: UpdateFavoriteRecipe & Pick<FavoriteRecipe, 'updatedAt'> = {
      ...bodyData,
      updatedAt: new Date(),
    };

    const result = await db
      .update(favoriteRecipesTable)
      .set(updatedFavoriteRecipe)
      .where(
        and(
          eq(favoriteRecipesTable.userId, paramsData.userId),
          eq(favoriteRecipesTable.recipeId, paramsData.recipeId)
        )
      );

    if (!result.rowCount) {
      const messageJSON = getResponseErrorJSON(
        `Recipe with userId '${paramsData.userId}' & recipeId '${paramsData.recipeId}' was not found!`
      );
      return c.json(messageJSON, StatusCodes.NOT_FOUND);
    }

    const messageJSON = getResponseMessageJSON('Favorite Recipe updated successfully!');
    return c.json(messageJSON, StatusCodes.OK);
  } catch (error) {
    return getRequestError(c, error, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

// DELETE
export const deleteOne: AppRouteHandler<DeleteOneRoute> = async (c) => {
  const data = c.req.valid('param');

  try {
    const result = await db
      .delete(favoriteRecipesTable)
      .where(
        and(
          eq(favoriteRecipesTable.userId, data.userId),
          eq(favoriteRecipesTable.recipeId, data.recipeId)
        )
      );

    if (!result.rowCount) {
      const messageJSON = getResponseErrorJSON(
        `Recipe with userId '${data.userId}' & recipeId '${data.recipeId}' was not found!`
      );
      return c.json(messageJSON, StatusCodes.NOT_FOUND);
    }

    const messageJSON = getResponseMessageJSON('Favorite Recipe removed successfully!');
    return c.json(messageJSON, StatusCodes.OK);
  } catch (error) {
    return getRequestError(c, error, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
