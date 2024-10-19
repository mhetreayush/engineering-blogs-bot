import { sendDailyRemainderToInteract } from '@src/utils/send-daily-reminder-to-interact';
import { Request, Response } from 'express';

export const sendDailyInteractionReminderController = async (req: Request, res: Response) => {
  try {
    await sendDailyRemainderToInteract();
    res.status(200).send('Daily interaction reminder sent successfully');
  } catch (error) {
    console.error('Error sending daily interaction reminder: ', error);
    res.status(500).send('Error sending daily interaction reminder!');
  }
};
