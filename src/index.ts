import { ENV } from '@src/constants/env';
import { blogRouter } from '@src/routes/blog-router';
import bodyParser from 'body-parser';
import { Express } from 'express';
import express from 'express';

import { createCronSchedules } from './utils/create-cron-schedules';
import { keepServerAlive } from './utils/keep-server-alive';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { PORT, BASE_URL } = ENV;

app.use(blogRouter);
app.get('/keep-me-alive', (req, res) => {
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
