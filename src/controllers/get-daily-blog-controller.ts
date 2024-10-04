import { Request, Response } from 'express';
import { sendDailyBlog } from './send-daily-blog';

export const getDailyBlogController = async (req: Request, res: Response) => {
  try {
    await sendDailyBlog();
    res.status(200).send('Daily blog sent successfully');
  } catch (error) {
    console.error('Error sending daily blog:', error);
    res.status(500).send('Error sending daily blog');
  }
};
