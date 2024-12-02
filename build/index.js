"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// Importe rotas para o banco de dados
const rotaArmas_1 = __importDefault(require("./routes/rotaArmas"));
const rotaBuilds_1 = __importDefault(require("./routes/rotaBuilds"));
const rotaEquip_1 = __importDefault(require("./routes/rotaEquip"));
// Importe rotas testes
const testeRotaArma_1 = __importDefault(require("./routes/testeRotaArma"));
const testeRotaBuild_1 = __importDefault(require("./routes/testeRotaBuild"));
const testeRotaEquipamento_1 = __importDefault(require("./routes/testeRotaEquipamento"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
//const db = knex(dot.development);
app.use(express_1.default.json());
// Rota de teste simples
app.get('/', (req, res) => {
    res.send('API rodando!');
});
// http://localhost:3000/armas/ OU  http://127.0.0.1:3000/armas/
// Rota para o banco
app.use('/armas', rotaArmas_1.default);
app.use('/builds', rotaBuilds_1.default);
app.use('/equipamentos', rotaEquip_1.default);
// Rota teste dados em loco
app.use('/armasTeste', testeRotaArma_1.default);
app.use('/buildTeste', testeRotaBuild_1.default);
app.use('/equipTeste', testeRotaEquipamento_1.default);
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
