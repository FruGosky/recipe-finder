import z from 'zod';

export const favoriteRecipeSchema = z.object({
  id: z.int(),
  userId: z.string().min(1, 'userId cannot be empty'),
  recipeId: z.int(),
  title: z.string().min(1, 'title cannot be empty'),
  image: z.string().nullable(),
  cookTime: z.string().nullable(),
  servings: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});
export type FavoriteRecipe = z.infer<typeof favoriteRecipeSchema>;

// GET ALL
export const getAllFavoriteRecipesParamsSchema = favoriteRecipeSchema.pick({ userId: true });

// GET BY ID
export const getFavoriteRecipeByIdParamsSchema = favoriteRecipeSchema
  .pick({ userId: true, recipeId: true })
  .extend({ recipeId: z.coerce.number() });
export type GetFavoriteRecipeParamsById = z.infer<typeof getFavoriteRecipeByIdParamsSchema>;

// CREATE
export const createFavoriteRecipeSchema = favoriteRecipeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type CreateFavoriteRecipe = z.infer<typeof createFavoriteRecipeSchema>;

// UPDATE
export const updateFavoriteRecipeParamsSchema = favoriteRecipeSchema
  .pick({ userId: true, recipeId: true })
  .extend({ recipeId: z.coerce.number() });
export type UpdateFavoriteRecipeParams = z.infer<typeof updateFavoriteRecipeParamsSchema>;
export const updateFavoriteRecipeSchema = favoriteRecipeSchema.omit({
  id: true,
  userId: true,
  recipeId: true,
  createdAt: true,
  updatedAt: true,
});
export type UpdateFavoriteRecipe = z.infer<typeof updateFavoriteRecipeSchema>;

// DELETE
export const deleteFavoriteRecipeParamsSchema = favoriteRecipeSchema
  .pick({ userId: true, recipeId: true })
  .extend({ recipeId: z.coerce.number() });
export type DeleteFavoriteRecipeParams = z.infer<typeof deleteFavoriteRecipeParamsSchema>;
