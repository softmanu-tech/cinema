import dotenv from 'dotenv';

dotenv.config();

export const MPESA_CONFIG = {
  CONSUMER_KEY: process.env.MPESA_CONSUMER_KEY,
  CONSUMER_SECRET: process.env.MPESA_CONSUMER_SECRET,
  PASSKEY: process.env.MPESA_PASSKEY,
  SHORTCODE: process.env.MPESA_SHORTCODE,
  CALLBACK_URL: process.env.MPESA_CALLBACK_URL
};