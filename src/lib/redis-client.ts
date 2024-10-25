import { ENV } from '@src/constants/env';
import { createClient } from 'redis';

// Get Redis configuration based on environment
const getRedisConfig = () => {
  if (ENV.NODE_ENV === 'production') {
    return {
      password: ENV.REDIS_PASSWORD,
      socket: {
        host: ENV.REDIS_HOST,
        port: ENV.REDIS_PORT,
      },
    };
  }

  return {
    url: ENV.REDIS_BASE_URL,
  };
};

// Create Redis client with the determined configuration
export const redisClient = createClient(getRedisConfig());

export const redisClientSetup = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }

    redisClient.on('connect', () => {
      console.log('Connected to Redis');
    });

    redisClient.on('error', (err) => {
      console.error('Redis error:', err);
    });
  } catch (error) {
    console.error('Error connecting to Redis:', error);
  }
};

// Export a function to safely disconnect Redis if needed (optional)
export const disconnectRedisClient = async () => {
  if (redisClient.isOpen) {
    await redisClient.disconnect();
    console.log('Redis client disconnected.');
  }
};
