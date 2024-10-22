import { ENV } from '@src/constants/env';
import axios from 'axios';

const MINUTE = 1000 * 60;

export const keepServerAlive = () => {
  setInterval(() => {
    axios.get(`${ENV.BASE_URL}${ENV.NODE_ENV === 'production' ? '' : `:${ENV.PORT}`}/api/keep-me-alive`);
  }, MINUTE * 5); // Logs message every 5 minutes
};
