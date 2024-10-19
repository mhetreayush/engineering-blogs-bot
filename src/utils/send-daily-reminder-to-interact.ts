import { WHATSAPP_RECIPIENT_NUMBER } from '@src/constants/env';

import { sendWhatsAppMessage } from './send-whatsapp-message';

export const sendDailyRemainderToInteract = async () => {
  try {
    const message = `
        Hey! 👋 \nJust a quick note: \nFor the bot to keep working as expected, I'll need you to interact with it once in every 24 hours as WhatsApp maintains 24-hour sessions, so this helps keep things running smoothly. \nThanks for helping out! 😊
      `;

    const { success } = await sendWhatsAppMessage({
      recipient_number: WHATSAPP_RECIPIENT_NUMBER,
      message,
    });

    if (!success) {
      throw new Error('Error sending WhatsApp message');
    }

    console.log('Message sent successfully:', message);
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
  }
};
