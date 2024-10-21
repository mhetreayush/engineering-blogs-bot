import { WHATSAPP_API_CREDENTIALS } from '@src/constants/env';
import { Request, Response } from 'express';

export const whatsappWebhookIncomingController = async (req: Request, res: Response) => {
  try {
    if (req.query['hub.mode'] == 'subscribe' && req.query['hub.verify_token'] == WHATSAPP_API_CREDENTIALS.WHATSAPP_SECRET) {
      res.send(req.query['hub.challenge']);
    } else {
      res.sendStatus(400);
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};
