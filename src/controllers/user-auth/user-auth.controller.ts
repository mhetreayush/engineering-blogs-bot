import { REDIS_KEYS } from '@src/constants/redis-keys';
import { redisClient } from '@src/lib/redis-client';
import { sendWhatsAppMessage } from '@src/utils/send-whatsapp-message';
import { Request, Response } from 'express';

export type TUserOTP = {
  otp: string;
  tries_left: number;
  phone_number: string;
};

const OTP_TTL_MINUTES = 5;

export const generateOTPController = async (req: Request, res: Response) => {
  const { phone_number: phoneNumber } = req.body; // Get phone number from request body

  try {
    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Set OTP in Redis with TTL (e.g., 5 minutes = 300 seconds)
    await redisClient.hSet(REDIS_KEYS.OTP_KEY(phoneNumber), {
      phone_number: phoneNumber,
      otp,
      tries_left: 3,
    });
    await redisClient.expire(REDIS_KEYS.OTP_KEY(phoneNumber), OTP_TTL_MINUTES * 60); // Set TTL

    // Send OTP via WhatsApp
    await sendWhatsAppMessage({
      recipient_number: phoneNumber,
      message: `Your OTP to login is: ${otp}\nThis OTP will be valid for the next ${OTP_TTL_MINUTES} minutes`,
    });

    // Return success response
    res.status(200).json({
      success: true,
      message: `OTP sent successfully to ${phoneNumber}`,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate OTP. Please try again.',
    });
    return;
  }
};

export const verifyOTPController = async (req: Request, res: Response) => {
  const { phone_number: phoneNumber, otp } = req.body; // Get phoneNumber and OTP from request body

  try {
    const keyForOTPObjectInRedis = REDIS_KEYS.OTP_KEY(phoneNumber);
    const userOTP = (await redisClient.hGetAll(keyForOTPObjectInRedis)) as unknown as TUserOTP;

    // Check if OTP exists
    if (!userOTP || Object.keys(userOTP).length === 0) {
      res.status(400).json({
        success: false,
        message: 'OTP has expired or does not exist.',
      });
      return;
    }

    // Check if there are attempts left
    if (userOTP.tries_left <= 0) {
      res.status(400).json({
        success: false,
        message: 'No attempts left. Please request a new OTP.',
      });
      return;
    }

    // Verify OTP
    if (userOTP.otp === otp) {
      // OTP is valid, delete it from Redis
      await redisClient.del(keyForOTPObjectInRedis);
      res.status(200).json({
        success: true,
        message: 'OTP verified successfully.',
      });
      return;
    }

    // OTP is invalid, decrement tries_left
    const triesLeft = userOTP.tries_left - 1;
    await redisClient.hSet(keyForOTPObjectInRedis, 'tries_left', triesLeft);

    res.status(400).json({
      success: false,
      message: `Invalid OTP. ${triesLeft} attempts left.`,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: 'Failed to verify OTP. Please try again.',
    });
    return;
  }
};
