import { testClient } from 'hono/testing';
import * as StatusCodes from '@/lib/http-status-codes';
import { describe, expect, it } from 'vitest';
import { createTestApp } from '@/helpers/create-app';
import { healthRouter } from '.';

describe('Health', () => {
  const client = testClient(createTestApp(healthRouter));

  it(`GET ${client.health.$url().pathname} should return { success: true }`, async () => {
    const res = await client.health.$get();
    expect(res.status).toBe(StatusCodes.OK);
    const json = await res.json();
    expect(json).toEqual({ success: true });
  });
});
