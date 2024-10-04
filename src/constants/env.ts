import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  PORT: process.env.PORT ?? 3000,
  KV_REST_API_READ_ONLY_TOKEN: process.env.KV_REST_API_READ_ONLY_TOKEN ?? '',
  KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN ?? '',
  KV_REST_API_URL: process.env.KV_REST_API_URL ?? '',
  KV_URL: process.env.KV_URL ?? '',
  BASE_URL: process.env.BASE_URL ?? 'http://localhost',
};
