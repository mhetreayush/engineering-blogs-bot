import { whatsappWebhookIncomingController } from '@src/controllers/whatsapp/webhook-incoming.controller';
import { whatsappWebhookOutgoingController } from '@src/controllers/whatsapp/webhook-outgoing.controller';
import { Router } from 'express';

const router = Router();

router.get('/webhook', whatsappWebhookIncomingController);

router.post('/webhook', whatsappWebhookOutgoingController);

export { router as whatsappRouter };
