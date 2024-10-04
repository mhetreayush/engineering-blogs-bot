import { WHATSAPP_RECIPIENT_NUMBER } from '@src/constants/env';
import { getRandomBlog } from './get-random-blog';
import { sendWhatsAppMessage } from './send-whatsapp-message';

export const sendDailyBlog = async () => {
  try {
    const randomBlog = await getRandomBlog();
    const message = `*${randomBlog.blogName}*\n\n${randomBlog.blogUrl}`;

    // Send the message using the WhatsApp API
    await sendWhatsAppMessage({
      recipient_number: WHATSAPP_RECIPIENT_NUMBER,
      message,
    }); // Replace with the actual recipient's phone number
    console.log('Message sent successfully:', message);
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
  }
};
