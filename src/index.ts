import express, { Request, Response } from 'express';

// Importes de configurações e variaveis do ambiente
import knex from 'knex';
import dotenv from 'dotenv';

import testeArma from './routes/rotaTesteArma';
import testeBuild from './routes/rotaTesteBuild';
import testeEquip from './routes/rotaTesteEquipamento';

dotenv.config();

const app = express();
const port = 3000;
//const db = knex(dot.development);

app.use(express.json());

// Rota de teste simples
app.get('/', (req: Request, res: Response) => {
    res.send('API rodando!');
});

// Rota teste dados em loco
app.use('/armasTeste', testeArma);
app.use('/buildTeste', testeBuild);
app.use('/equipTeste', testeEquip)

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));