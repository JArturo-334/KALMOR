import dotenv from 'dotenv';
dotenv.config();

import { config, uploader } from 'cloudinary';

config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export default uploader;