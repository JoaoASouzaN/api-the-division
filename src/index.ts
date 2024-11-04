import express, { Application } from 'express';
import logger from './config/logger';
import errorHandler from './middlewares/errorHandler';
import buildsRoutes from './routes/buildsRoutes';

const app: Application = express();
app.use(express.json());

// Rotas
app.use('/builds', buildsRoutes);

// Middleware de erro
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});