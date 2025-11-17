import { Context } from 'hono';

export const checkHealth = (c: Context) => {
  return c.json({ success: true });
};
