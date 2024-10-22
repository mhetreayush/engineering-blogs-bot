import LinkModel from '@src/models/Link.model';

import { sendWhatsAppMessage } from './send-whatsapp-message';

const getUsersWithUnsentLinks = async () => {
  try {
    const result = await LinkModel.aggregate([
      {
        $match: {
          is_sent: false,
        },
      },
      {
        $group: {
          _id: '$user_phone',
          unsentLinksCount: { $sum: 1 },
        },
      },
      {
        $match: {
          unsentLinksCount: { $gt: 0 },
        },
      },
      {
        $project: {
          _id: 0,
          user_phone: '$_id',
        },
      },
    ]);

    return result;
  } catch (error) {
    console.error('Error fetching users with unsent links:', error);
    throw error;
  }
};

export default getUsersWithUnsentLinks;

export const sendDailyRemainderToInteract = async () => {
  try {
    const message = `
        Hey! 👋 \nJust a quick note: \nFor the bot to keep working as expected, We need you to interact with it once in every 24 hours as WhatsApp maintains 24-hour sessions, so this helps keep things running smoothly. \nYou can simply do it by reacting to this message!\nThanks for helping out! 😊
      `;

    const users = await getUsersWithUnsentLinks();

    const userMessagesPromise = users.map(async (user) => {
      await sendWhatsAppMessage({
        recipient_number: user.user_phone,
        message,
      });
    });

    await Promise.allSettled(userMessagesPromise);

    console.log('Message sent successfully:', message);
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
  }
};
