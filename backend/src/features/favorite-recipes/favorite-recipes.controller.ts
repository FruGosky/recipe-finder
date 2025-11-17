import { and, eq } from 'drizzle-orm';
import { StatusCodes } from 'http-status-codes';
import { db } from '../../db/db';
import { favoriteRecipesTable } from '../../db/schema';
import { getRequestError } from '../../helpers/get-request-error';
import { getRequestSchemaParseError } from '../../helpers/get-request-schema-parse-error';
import {
  createFavoriteRecipeSchema,
  deleteFavoriteRecipeParamsSchema,
  FavoriteRecipe,
  getAllFavoriteRecipesParamsSchema,
  getFavoriteRecipeByIdParamsSchema,
  UpdateFavoriteRecipe,
  updateFavoriteRecipeParamsSchema,
  updateFavoriteRecipeSchema,
} from './favorite-recipes.schema';
import { getResponseMessageJSON } from '../../helpers/get-response-message.json';
import { getResponseErrorJSON } from '../../helpers/get-response-error-json';
import { isDrizzlePostgresUniqueViolationError } from '../../helpers/is-drizzle-postgres-unique-violation-error';
import { Context } from 'hono';

// CREATE
export const createFavoriteRecipe = async (c: Context) => {
  const { data, error } = createFavoriteRecipeSchema.safeParse(await c.req.json());
  if (error) return getRequestSchemaParseError(c, error);

  try {
    const [newFavoriteRecipe] = await db.insert(favoriteRecipesTable).values(data).returning();
    if (!newFavoriteRecipe) throw new Error('Insert failed, no data was returned!');

    return c.json(newFavoriteRecipe, StatusCodes.CREATED);
  } catch (error) {
    if (isDrizzlePostgresUniqueViolationError(error)) {
      const errorJSON = getResponseErrorJSON(
        `Favorite Recipe with recipeId '${data.recipeId}' & userId '${data.userId}' already exists!`
      );
      return c.json(errorJSON, StatusCodes.CONFLICT);
    }

    return getRequestError(c, error);
  }
};

// GET ALL
export const getAllFavoriteRecipes = async (c: Context) => {
  const { data, error } = getAllFavoriteRecipesParamsSchema.safeParse(c.req.param());
  if (error) return getRequestSchemaParseError(c, error);

  try {
    const favoriteRecipes = await db
      .select()
      .from(favoriteRecipesTable)
      .where(eq(favoriteRecipesTable.userId, data.userId));
    return c.json(favoriteRecipes, StatusCodes.OK);
  } catch (error) {
    return getRequestError(c, error);
  }
};

// GET BY ID
export const getFavoriteRecipeById = async (c: Context) => {
  const { data, error } = getFavoriteRecipeByIdParamsSchema.safeParse(c.req.param());
  if (error) return getRequestSchemaParseError(c, error);

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
      const messageJSON = getResponseMessageJSON(
        `Recipe with userId '${data.userId}' & recipeId '${data.recipeId}' was not found!`
      );
      return c.json(messageJSON, StatusCodes.NOT_FOUND);
    }

    return c.json(favoriteRecipe, StatusCodes.OK);
  } catch (error) {
    return getRequestError(c, error);
  }
};

// UPDATE
export const updateFavoriteRecipe = async (c: Context) => {
  const { data: paramsData, error: paramsError } = updateFavoriteRecipeParamsSchema.safeParse(
    c.req.param()
  );
  if (paramsError) return getRequestSchemaParseError(c, paramsError);
  const { userId, recipeId } = paramsData;

  const { data: bodyData, error: bodyError } = updateFavoriteRecipeSchema.safeParse(
    await c.req.json()
  );
  if (bodyError) return getRequestSchemaParseError(c, bodyError);

  try {
    const updatedFavoriteRecipe: UpdateFavoriteRecipe & Pick<FavoriteRecipe, 'updatedAt'> = {
      ...bodyData,
      updatedAt: new Date(),
    };

    const result = await db
      .update(favoriteRecipesTable)
      .set(updatedFavoriteRecipe)
      .where(
        and(eq(favoriteRecipesTable.userId, userId), eq(favoriteRecipesTable.recipeId, recipeId))
      );

    if (!result.rowCount) {
      const messageJSON = getResponseMessageJSON(
        `Recipe with userId '${userId}' & recipeId '${recipeId}' was not found!`
      );
      return c.json(messageJSON, StatusCodes.NOT_FOUND);
    }

    const messageJSON = getResponseMessageJSON('Favorite Recipe updated successfully!');
    return c.json(messageJSON, StatusCodes.OK);
  } catch (error) {
    return getRequestError(c, error);
  }
};

// DELETE
export const deleteFavoriteRecipe = async (c: Context) => {
  const { data, error } = deleteFavoriteRecipeParamsSchema.safeParse(c.req.param());
  if (error) return getRequestSchemaParseError(c, error);

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
      const messageJSON = getResponseMessageJSON(
        `Recipe with userId '${data.userId}' & recipeId '${data.recipeId}' was not found!`
      );
      return c.json(messageJSON, StatusCodes.NOT_FOUND);
    }

    const messageJSON = getResponseMessageJSON('Favorite Recipe removed successfully!');
    return c.json(messageJSON, StatusCodes.OK);
  } catch (error) {
    return getRequestError(c, error);
  }
};
