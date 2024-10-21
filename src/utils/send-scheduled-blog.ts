import LinkModel from '@src/models/Link.model';

import { sendWhatsAppMessage } from './send-whatsapp-message';

export const getUnsentLinkFromEachDocument = async () => {
  try {
    const result = await LinkModel.aggregate([
      {
        $match: { is_sent: false }, // Filter to only unsent links
      },
      {
        $group: {
          _id: '$user_id', // Group by user_id (or any other field you need)
          link: { $first: '$$ROOT' }, // Get the first unsent link per user
        },
      },
      {
        $replaceRoot: { newRoot: '$link' }, // Replace root to get rid of grouping structure
      },
    ]);

    const userMessagesPromise = result.map(async (link) => {
      await sendWhatsAppMessage({
        recipient_number: link.user_phone,
        message: `Hello! 👋\nYou might want to revisit this: \n*${link.link_name}*\n${link.link_url}`,
      });
    });

    await Promise.allSettled(userMessagesPromise);

    const markAllAsSentPromise = result.map(async (link) => {
      await LinkModel.updateOne({ _id: link._id }, { is_sent: true });
    });

    await Promise.all(markAllAsSentPromise);

    return result;
  } catch (error) {
    console.error('Error fetching unsent link:', error);
    throw error;
  }
};
