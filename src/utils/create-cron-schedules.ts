import cron from 'node-cron';

import { sendDailyRemainderToInteract } from './send-daily-reminder-to-interact';
import { getUnsentLinkFromEachDocument } from './send-scheduled-blog';

const scheduleBlogCron = () => {
  getUnsentLinkFromEachDocument();
  console.log('Running scheduled task to send WhatsApp message...');
};

const scheduleRemainderCron = () => {
  console.log('Scheduled task to send daily remainder to interact with the bot.');

  // send a message at 8 pm ist asking to interact with the bot.
  cron.schedule('00 20 * * *', sendDailyRemainderToInteract, {
    timezone: 'Asia/Kolkata',
  });
};

const CRON_TIMES = [
  {
    description: 'Every day at 7:30 AM',
    cronValue: '30 7 * * *', // 7:30 AM IST
  },
  {
    description: 'Every day at 4 PM IST',
    cronValue: '00 16 * * *', // 4:00 PM IST
  },
  {
    description: 'Every day at 9:45 PM IST',
    cronValue: '45 21 * * *', // 9:45 PM IST
  },
];

export const createCronSchedules = () => {
  CRON_TIMES.forEach(({ cronValue, description }) => {
    console.log(`Scheduling task to run at: ${description}`);
    cron.schedule(cronValue, scheduleBlogCron, {
      timezone: 'Asia/Kolkata',
    });
  });

  scheduleRemainderCron();
};
