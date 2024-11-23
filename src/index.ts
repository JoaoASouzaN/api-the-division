import express, { Application, Request, Response } from 'express';

// Configurando o logger e os erros
import logger from './config/logger';
import errorHandler from './middlewares/errorHandler';

// Configurar as rotas
import buildsRoutes from './routes/buildsRoutes';
import armasRoutes from './routes/armasRoutes';
import equipamentosRoutes from './routes/equipamentosRoutes';

// Configurar a conexão e dados de aceesso o banco
import knex from 'knex';
import config from './config/knexfile';
import dotenv from 'dotenv';

dotenv.config(); // Puxa as configurações

const db = knex(config.development);

const app: Application = express();
app.use(express.json());

// Rota de teste de conexão com o banco de dados
app.get('/test-db', async (req: Request, res: Response) => {
  try {
    const result = await db.raw('SELECT 1+1 AS result');
    res.status(200).json({ success: true, result: result[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao conectar ao banco de dados', error });
  }
});

// Rotas
app.use('/builds', buildsRoutes);
app.use('/armas', armasRoutes);
app.use('/equipamentos', equipamentosRoutes);

// Middleware de erro
app.use(errorHandler);

// Feedback backend rodando
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
app.listen(port, () => {
  logger.info(`Servidor rodando na porta ${port}`);
});