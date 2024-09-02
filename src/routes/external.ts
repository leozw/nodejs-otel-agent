import express, { Request, Response } from 'express';
import { fetchExternalService } from '../services/externalService';

const router = express.Router();

router.get('/external-service-1', async (req: Request, res: Response) => {
  try {
    const data = await fetchExternalService('https://jsonplaceholder.typicode.com/posts/1');
    res.json({ data });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Erro desconhecido ao chamar o serviço externo 1' });
    }
  }
});

router.get('/external-service-2', async (req: Request, res: Response) => {
  try {
    const data = await fetchExternalService('https://jsonplaceholder.typicode.com/users/1');
    res.json({ data });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Erro desconhecido ao chamar o serviço externo 2' });
    }
  }
});

router.get('/external-service-3', async (req: Request, res: Response) => {
  try {
    const data = await fetchExternalService('https://jsonplaceholder.typicode.com/albums/1');
    res.json({ data });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Erro desconhecido ao chamar o serviço externo 3' });
    }
  }
});

export default router;
