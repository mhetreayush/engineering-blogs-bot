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

export const WHATSAPP_API_CREDENTIALS = {
  WHATSAPP_API_ACCESS_TOKEN: process.env.WHATSAPP_API_ACCESS_TOKEN ?? '',
  WHATSAPP_API_PHONE_NUMBER_ID: process.env.WHATSAPP_API_PHONE_NUMBER_ID ?? '',
};

export const WHATSAPP_RECIPIENT_NUMBER = process.env.WHATSAPP_RECIPIENT_NUMBER ?? '';
