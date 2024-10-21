import { getUnsentLinkFromEachDocument } from '@src/utils/send-scheduled-blog';
import { Request, Response } from 'express';

export const getScheduledLinksController = async (req: Request, res: Response) => {
  try {
    await getUnsentLinkFromEachDocument();
    res.status(200).send('Daily links sent successfully');
  } catch (error) {
    console.error('Error sending daily blog:', error);
    res.status(500).send('Error sending daily blog');
  }
};
