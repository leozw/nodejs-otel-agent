import express, { Request, Response } from 'express';
import { appConfig } from '../config/appConfig';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello, Open!' });
});

router.get('/buteco', (req: Request, res: Response) => {
  res.json({ message: 'Bora tomar uma?' });
});

router.get('/file-manager-url', (req: Request, res: Response) => {
  res.json({ url: appConfig.fileManagerUrl });
});

export default router;
