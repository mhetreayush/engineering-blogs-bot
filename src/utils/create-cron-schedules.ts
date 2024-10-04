import cron from 'node-cron';

import { sendDailyBlog } from './send-daily-blog.controller';

const scheduleBlogCron = () => {
  console.log('Running scheduled task to send WhatsApp message...');
  sendDailyBlog();
};

const CRON_TIMES = [
  {
    description: 'Every day at 7:30 AM IST',
    cronValue: '30 1 * * *',
  },
  {
    description: 'Every day at 4 PM IST',
    cronValue: '00 10 * * *',
  },
  {
    description: 'Every day at 9:30 PM IST',
    cronValue: '30 16 * * *',
  },
];

export const createCronSchedules = () => {
  CRON_TIMES.forEach(({ cronValue, description }) => {
    console.log(`Scheduling task to run at: ${description}`);
    cron.schedule(cronValue, scheduleBlogCron);
  });
};
