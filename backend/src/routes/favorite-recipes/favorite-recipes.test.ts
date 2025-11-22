import { testClient } from 'hono/testing';
import * as StatusCodes from '@/lib/http-status-codes';
import { describe, expect, it } from 'vitest';
import { createTestApp } from '@/helpers/create-app';
import { favoriteRecipesRouter } from '.';

const client = testClient(createTestApp(favoriteRecipesRouter));

describe('Favorite Recipes', () => {
  it(`${
    client['favorite-recipes'].$url().pathname
  } should return all favorite recipes for a user`, async () => {
    const res = await client['favorite-recipes'][':userId'].$get({ param: { userId: '1' } });
    expect(res.status).toBe(StatusCodes.OK);
    const json = await res.json();
    expect(json).toBeInstanceOf(Array);
  });
});
