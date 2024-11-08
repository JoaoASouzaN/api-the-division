import express, { Application } from 'express';
import logger from './config/logger';
import errorHandler from './middlewares/errorHandler';
import buildsRoutes from './routes/buildsRoutes';
import armasRoutes from './routes/armasRoutes';
import equipamentosRoutes from './routes/equipamentosRoutes';
import compoemRoutes from './routes/compoemRoutes';
import possueRoutes from './routes/possueRoutes';

const app: Application = express();
app.use(express.json());

// Rotas
app.use('/builds', buildsRoutes);
app.use('/armas', armasRoutes);
app.use('/equipamentos', equipamentosRoutes);
app.use('/compoem', compoemRoutes);
app.use('/possue', possueRoutes);

// Middleware de erro
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});