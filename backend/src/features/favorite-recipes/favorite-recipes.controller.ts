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
import { Request, Response } from 'express';
import { getResponseMessageJSON } from '../../helpers/get-response-message.json';
import { getResponseErrorJSON } from '../../helpers/get-response-error-json';
import { isDrizzlePostgresUniqueViolationError } from '../../helpers/is-drizzle-postgres-unique-violation-error';

// CREATE
export const createFavoriteRecipe = async (req: Request, res: Response) => {
  const { data, error } = createFavoriteRecipeSchema.safeParse(req.body);
  if (error) return getRequestSchemaParseError(res, error);

  try {
    const [newFavoriteRecipe] = await db.insert(favoriteRecipesTable).values(data).returning();
    if (!newFavoriteRecipe) throw new Error('Insert failed, no data was returned!');

    return res.status(StatusCodes.CREATED).json(newFavoriteRecipe);
  } catch (error) {
    if (isDrizzlePostgresUniqueViolationError(error)) {
      const errorJSON = getResponseErrorJSON(
        `Favorite Recipe with recipeId '${data.recipeId}' & userId '${data.userId}' already exists!`
      );
      return res.status(StatusCodes.CONFLICT).json(errorJSON);
    }

    return getRequestError(req, res, error);
  }
};

// GET ALL
export const getAllFavoriteRecipes = async (req: Request, res: Response) => {
  const { data, error } = getAllFavoriteRecipesParamsSchema.safeParse(req.params);
  if (error) return getRequestSchemaParseError(res, error);

  try {
    const favoriteRecipes = await db
      .select()
      .from(favoriteRecipesTable)
      .where(eq(favoriteRecipesTable.userId, data.userId));
    return res.status(StatusCodes.OK).json(favoriteRecipes);
  } catch (error) {
    return getRequestError(req, res, error);
  }
};

// GET BY ID
export const getFavoriteRecipeById = async (req: Request, res: Response) => {
  const { data, error } = getFavoriteRecipeByIdParamsSchema.safeParse(req.params);
  if (error) return getRequestSchemaParseError(res, error);

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
      return res.status(StatusCodes.NOT_FOUND).json(messageJSON);
    }

    return res.status(StatusCodes.OK).json(favoriteRecipe);
  } catch (error) {
    return getRequestError(req, res, error);
  }
};

// UPDATE
export const updateFavoriteRecipe = async (req: Request, res: Response) => {
  const { data: paramsData, error: paramsError } = updateFavoriteRecipeParamsSchema.safeParse(
    req.params
  );
  if (paramsError) return getRequestSchemaParseError(res, paramsError);
  const { userId, recipeId } = paramsData;

  const { data: bodyData, error: bodyError } = updateFavoriteRecipeSchema.safeParse(req.body);
  if (bodyError) return getRequestSchemaParseError(res, bodyError);

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
      return res.status(StatusCodes.NOT_FOUND).json(messageJSON);
    }

    const messageJSON = getResponseMessageJSON('Favorite Recipe updated successfully!');
    return res.status(StatusCodes.OK).json(messageJSON);
  } catch (error) {
    return getRequestError(req, res, error);
  }
};

// DELETE
export const deleteFavoriteRecipe = async (req: Request, res: Response) => {
  const { data, error } = deleteFavoriteRecipeParamsSchema.safeParse(req.params);
  if (error) return getRequestSchemaParseError(res, error);

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
      return res.status(StatusCodes.NOT_FOUND).json(messageJSON);
    }

    const messageJSON = getResponseMessageJSON('Favorite Recipe removed successfully!');
    return res.status(StatusCodes.OK).json(messageJSON);
  } catch (error) {
    return getRequestError(req, res, error);
  }
};
