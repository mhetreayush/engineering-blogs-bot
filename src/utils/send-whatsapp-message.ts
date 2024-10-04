// whatsappController.js
import { WHATSAPP_API_CREDENTIALS } from '@src/constants/env';
import axios from 'axios';

const { WHATSAPP_API_ACCESS_TOKEN, WHATSAPP_API_PHONE_NUMBER_ID } = WHATSAPP_API_CREDENTIALS;

// Function to send a WhatsApp message
export const sendWhatsAppMessage = async ({ recipient_number, message }: { recipient_number: string; message: string }) => {
  const url = `https://graph.facebook.com/v13.0/${WHATSAPP_API_PHONE_NUMBER_ID}/messages`;

  const data = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: recipient_number, // The recipient's WhatsApp number
    type: 'text',
    text: {
      preview_url: true,
      body: message,
    },
  };

  try {
    await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${WHATSAPP_API_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error sending WhatsApp message:', error.response?.data || error.message);
    return {
      success: false,
    };
  }
};
