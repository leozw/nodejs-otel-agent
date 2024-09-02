import express from 'express';
import { appConfig } from './config/appConfig';
import indexRoutes from './routes/index';
import externalRoutes from './routes/external';
import localRoutes from './routes/local';

const app = express();

app.use('/', indexRoutes);
app.use('/', externalRoutes);
app.use('/', localRoutes);

export default app;
