import app from './src/app';
import { appConfig } from './src/config/appConfig';

const port = typeof appConfig.port === 'string' ? parseInt(appConfig.port, 10) : appConfig.port;

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
