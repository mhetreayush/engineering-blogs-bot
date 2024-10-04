import { createClient } from '@vercel/kv';
import { ENV } from '@constants/env';

export const kvClient = createClient({
  token: ENV.KV_REST_API_TOKEN,
  url: ENV.KV_REST_API_URL,
});
