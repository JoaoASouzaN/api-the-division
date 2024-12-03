import express, { Request, Response } from 'express';

// Importes de configurações e variaveis do ambiente
import dotenv from 'dotenv';

// Importe rotas para o banco de dados
import armas from './routes/rotaArmas';
import builds from './routes/rotaBuilds';
import equipamentos from './routes/rotaEquip'; 

// Importe rotas testes
import testeArma from './routes/testeRotaArma';
import testeBuild from './routes/testeRotaBuild';
import testeEquip from './routes/testeRotaEquipamento';

dotenv.config();

const app = express();
const port = 3000;
//const db = knex(dot.development);

app.use(express.json());

// Rota de teste simples
app.get('/', (req: Request, res: Response) => {
    res.send('API rodando!');
});

// Rota para o banco
app.use('/armas', armas);
app.use('/builds', builds);
app.use('/equipamentos', equipamentos);

// Rota teste dados em loco
app.use('/armasTeste', testeArma);
app.use('/buildTeste', testeBuild);
app.use('/equipTeste', testeEquip)

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

// http://localhost:3000/armas/ OU  http://127.0.0.1:3000/armas/