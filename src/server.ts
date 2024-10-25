import { ENV } from '@src/constants/env';
import { redisClientSetup } from '@src/lib/redis-client';
import { linksRouter } from '@src/routes/links-router';
import { userAuthRouter } from '@src/routes/user-auth';
import { whatsappRouter } from '@src/routes/whatsapp-router';
import { createCronSchedules } from '@src/utils/create-cron-schedules';
import { keepServerAlive } from '@src/utils/keep-server-alive';
import bodyParser from 'body-parser';
import { Express } from 'express';
import express from 'express';
import mongoose from 'mongoose';

const API_PREFIX = '/api';

const initializeApp = async () => {
  const app: Express = express();

  await redisClientSetup();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(API_PREFIX, linksRouter);
  app.use(API_PREFIX, whatsappRouter);
  app.use(API_PREFIX, userAuthRouter);

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.get(`${API_PREFIX}/keep-me-alive`, (req, res) => {
    const now = new Date();
    const message = `I am alive! ${now.toISOString()}`;
    console.log(message);
    res.send(message);
  });

  createCronSchedules(); // Call the function to create cron schedules

  keepServerAlive();

  // Start the Express server
  app.listen(ENV.PORT, () => {
    console.log(`Server running on port ${ENV.BASE_URL}`);
  });

  mongoose.connect(ENV.MONGO_DB_URI);
};

initializeApp();
