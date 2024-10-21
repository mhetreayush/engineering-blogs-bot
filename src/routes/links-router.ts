import { getScheduledLinksController } from '@src/controllers/links/get-scheduled-links.controller';
import { sendDailyInteractionReminderController } from '@src/controllers/links/send-daily-interaction-reminder.controller';
import { Router } from 'express';

const router = Router();

router.get('/get-daily-blog', getScheduledLinksController);

router.post('/interaction-reminder', sendDailyInteractionReminderController);

export { router as linksRouter };
