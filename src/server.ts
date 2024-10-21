import { ENV } from '@src/constants/env';
import { linksRouter } from '@src/routes/links-router';
import bodyParser from 'body-parser';
import { Express } from 'express';
import express from 'express';
import mongoose from 'mongoose';

import { whatsappRouter } from './routes/whatsapp-router';
import { createCronSchedules } from './utils/create-cron-schedules';
import { keepServerAlive } from './utils/keep-server-alive';

const app: Express = express();

const API_PREFIX = '/api';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { PORT, BASE_URL } = ENV;

app.use(API_PREFIX, linksRouter);
app.use(API_PREFIX, whatsappRouter);

app.get(`${API_PREFIX}/keep-me-alive`, (req, res) => {
  const now = new Date();
  const message = `I am alive! ${now.toISOString()}`;
  console.log(message);
  res.send(message);
});

createCronSchedules(); // Call the function to create cron schedules

keepServerAlive();

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${BASE_URL}:${PORT}`);
});

mongoose.connect(ENV.MONGO_DB_URI);
