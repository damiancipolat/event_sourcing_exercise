import dotenv from 'dotenv';
import Tconfig from './config';

dotenv.config();

const config:Tconfig = {
  server: {
    port: process.env.PORT,
  },
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    db: process.env.DB_NAME,
    user: process.env.DB_USER,
    pwd: process.env.DB_PWD,
  },
};

export default config;
