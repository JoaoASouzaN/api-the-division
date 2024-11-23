import express, { Application } from 'express';

// Configurando o logger e os erros
import logger from './config/logger';
import errorHandler from './middlewares/errorHandler';

// Configurar as rotas
import buildsRoutes from './routes/buildsRoutes';
import armasRoutes from './routes/armasRoutes';
import equipamentosRoutes from './routes/equipamentosRoutes';

// Configurar a conexão e dados de aceesso o banco
import knex from 'knex'; // Declarado mas nunca usado
import config from './config/knexfile'; // Declarado mas nunca usado
import dotenv from 'dotenv';

dotenv.config();

const db = knex(config.development);

const app: Application = express();
app.use(express.json());

db.select('*').from('apithedivision')
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err);
});

// Rotas
app.use('/builds', buildsRoutes);
app.use('/armas', armasRoutes);
app.use('/equipamentos', equipamentosRoutes);

// Middleware de erro
app.use(errorHandler);

// Feedback backend rodando
const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});