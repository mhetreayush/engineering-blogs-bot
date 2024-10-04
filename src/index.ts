import { ENV } from '@src/constants/env';
import { blogRouter } from '@src/routes/blog-router';
import bodyParser from 'body-parser';
import { Express } from 'express';
import express from 'express';
import cron from 'node-cron'; // Import node-cron here

import { keepServerAlive } from './utils/keep-server-alive';
import { sendDailyBlog } from './utils/send-daily-blog.controller';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { PORT, BASE_URL } = ENV;

app.use(blogRouter);

keepServerAlive();

// Schedule the job to run at 7:30 AM IST every day
cron.schedule('30 1 * * *', () => {
  // 1 AM UTC is 7:30 AM IST
  console.log('Running scheduled task to send WhatsApp message...');
  sendDailyBlog();
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${BASE_URL}:${PORT}`);
});
