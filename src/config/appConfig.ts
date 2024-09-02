import dotenv from 'dotenv';

dotenv.config();

export const appConfig = {
  port: process.env.PORT || 3000,
  fileManagerUrl: process.env.NEXT_PUBLIC_FILE_MANAGER_URL || 'http://localhost:8085',
};
