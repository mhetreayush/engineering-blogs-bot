import UserModel from '@src/models/User.model';

import { sendWhatsAppMessage } from './send-whatsapp-message';

export const sendDailyRemainderToInteract = async () => {
  try {
    const message = `
        Hey! 👋 \nJust a quick note: \nFor the bot to keep working as expected, We need you to interact with it once in every 24 hours as WhatsApp maintains 24-hour sessions, so this helps keep things running smoothly. \nYou can simply do it by reacting to this message!\nThanks for helping out! 😊
      `;

    const users = await UserModel.find().select('phone_number');
    const userMessagesPromise = users.map(async (user) => {
      await sendWhatsAppMessage({
        recipient_number: user.phone_number,
        message,
      });
    });

    await Promise.allSettled(userMessagesPromise);

    console.log('Message sent successfully:', message);
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
  }
};
