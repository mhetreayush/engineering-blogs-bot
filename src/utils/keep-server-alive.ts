import { ENV } from '@src/constants/env';
import axios from 'axios';

const MINUTE = 1000 * 60;

export const keepServerAlive = () => {
  if (ENV.NODE_ENV === 'production') {
    setInterval(() => {
      axios.get(`${ENV.BASE_URL}/keep-me-alive`);
    }, MINUTE * 5); // Logs message every 10 minutes
  }
};
