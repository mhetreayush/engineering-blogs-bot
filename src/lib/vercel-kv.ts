import { ENV } from '@src/constants/env';
import { createClient } from '@vercel/kv';

export const kvClient = createClient({
  token: ENV.KV_REST_API_TOKEN,
  url: ENV.KV_REST_API_URL,
});
