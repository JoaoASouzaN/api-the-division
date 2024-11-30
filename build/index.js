"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const rotaTesteArma_1 = __importDefault(require("./routes/rotaTesteArma"));
const rotaTesteBuild_1 = __importDefault(require("./routes/rotaTesteBuild"));
const rotaTesteEquipamento_1 = __importDefault(require("./routes/rotaTesteEquipamento"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
//const db = knex(dot.development);
app.use(express_1.default.json());
// Rota de teste simples
app.get('/', (req, res) => {
    res.send('API rodando!');
});
// Rota teste dados em loco
app.use('/armasTeste', rotaTesteArma_1.default);
app.use('/buildTeste', rotaTesteBuild_1.default);
app.use('/equipTeste', rotaTesteEquipamento_1.default);
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
