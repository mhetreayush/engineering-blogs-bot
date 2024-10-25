export const REDIS_KEYS = {
  OTP_KEY: (phoneNumber: string) => `otp:${phoneNumber}`,
};
