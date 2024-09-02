import express, { Request, Response } from 'express';
import { fetchLocalService } from '../services/localService';
import { appConfig } from '../config/appConfig';

const router = express.Router();

router.get('/local-service', async (req: Request, res: Response) => {
  try {
    const data = await fetchLocalService(`http://localhost:${appConfig.port}/buteco`);
    res.json({ data });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Erro desconhecido ao chamar o serviço local' });
    }
  }
});

router.get('/file-manager-service', async (req: Request, res: Response) => {
  try {
    const data = await fetchLocalService(`${appConfig.fileManagerUrl}/files`);
    res.json({ data });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Erro desconhecido ao chamar o serviço de file manager' });
    }
  }
});

export default router;
