import { pgTable, serial, text, timestamp, integer, unique } from 'drizzle-orm/pg-core';

export const favoriteRecipesTable = pgTable(
  'favorite_recipes',
  {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull(),
    recipeId: integer('recipe_id').notNull(),
    title: text('title').notNull(),
    image: text('image'),
    cookTime: text('cook_time'),
    servings: text('servings'),
    createdAt: timestamp('created_at')
      .$defaultFn(() => new Date())
      .notNull(),
    updatedAt: timestamp('updated_at')
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date()),
  },
  (table) => [unique('favorite_user_recipe_unique').on(table.userId, table.recipeId)]
);
