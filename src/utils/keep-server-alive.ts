import { ENV } from '@src/constants/env';
import axios from 'axios';

const MINUTE = 1000 * 60;

export const keepServerAlive = () => {
  // This middleware starts an interval which does nothing, just to keep the server alive
  setInterval(() => {
    if (ENV.NODE_ENV === 'production') {
      axios.get(ENV.BASE_URL);
    }

    console.log('Keeping server alive...');
  }, MINUTE * 5); // Logs message every 10 minutes
};
