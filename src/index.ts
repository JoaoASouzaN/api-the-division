import express, { Application, Request, Response } from 'express';

// Configurando o logger e os erros
import logger from './config/logger';
import errorHandler from './middlewares/errorHandler';

// Configurar as rotas
import armasRoutes from './routes/rotaArma';
import buildsRoutes from './routes/rotaBuild';
import equipamentosRoutes from './routes/rotaEquipamento';

// Configurar as rotas de teste
import armasTesteRoutes from './routes/rotaTesteArma';
import buildsTesteRoutes from './routes/rotaTesteBuild';
import equipamentosTesteRoutes from './routes/rotaTesteEquipamento';

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

// Rotas teste
app.use('/armasTeste', armasTesteRoutes);
app.use('/buildsTeste', buildsTesteRoutes);
app.use('/equipamentosTeste', equipamentosTesteRoutes);

// Middleware de erro
app.use(errorHandler);

// Feedback backend rodando
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
app.listen(port, () => {
  logger.info(`Servidor rodando na porta ${port}`);
});