import { ENV } from '@src/constants/env';
import { blogRouter } from '@src/routes/blog-router';
import axios from 'axios';
import bodyParser from 'body-parser';
import { Express } from 'express';
import express from 'express';
import cron from 'node-cron'; // Import node-cron here

import { sendDailyBlog } from './utils/send-daily-blog.controller';

// const MINUTE = 1000 * 60;

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

// Schedule the job to run at 7:30 AM IST every day
cron.schedule('30 1 * * *', () => {
  // 1 AM UTC is 7:30 AM IST
  console.log('Running scheduled task to send WhatsApp message...');
  sendDailyBlog();
});

if (ENV.NODE_ENV === 'production') {
}

setInterval(() => {
  axios.get(`${ENV.BASE_URL}${ENV.NODE_ENV === 'production' ? '' : `:${ENV.PORT}`}/keep-me-alive`);
}, 1000); // Logs message every 10 minutes

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${BASE_URL}:${PORT}`);
});
