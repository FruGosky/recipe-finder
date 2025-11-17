import { Router } from 'express';
import {
  createFavoriteRecipe,
  deleteFavoriteRecipe,
  getAllFavoriteRecipes,
  getFavoriteRecipeById,
  updateFavoriteRecipe,
} from './favorite-recipes.controller';

const router = Router();

router.post('/', createFavoriteRecipe);
router.get('/:userId', getAllFavoriteRecipes);
router.get('/:userId/:recipeId', getFavoriteRecipeById);
router.patch('/:userId/:recipeId', updateFavoriteRecipe);
router.delete('/:userId/:recipeId', deleteFavoriteRecipe);

export { router as favoriteRecipesRouter };
