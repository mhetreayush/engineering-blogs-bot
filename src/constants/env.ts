import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  PORT: process.env.PORT ?? 3000,
  BASE_URL: process.env.BASE_URL ?? 'http://localhost',
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  MONGO_DB_URI: process.env.MONGO_DB_URI ?? '',
};

export const WHATSAPP_API_CREDENTIALS = {
  WHATSAPP_SECRET: process.env.WHATSAPP_SECRET ?? '',
  WHATSAPP_API_ACCESS_TOKEN: process.env.WHATSAPP_API_ACCESS_TOKEN ?? '',
  WHATSAPP_API_PHONE_NUMBER_ID: process.env.WHATSAPP_API_PHONE_NUMBER_ID ?? '',
};
