"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Configurando o logger e os erros
const logger_1 = __importDefault(require("./config/logger"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
// Configurar as rotas
const rotaArma_1 = __importDefault(require("./routes/rotaArma"));
const rotaBuild_1 = __importDefault(require("./routes/rotaBuild"));
const rotaEquipamento_1 = __importDefault(require("./routes/rotaEquipamento"));
// Configurar as rotas de teste
const rotaTesteArma_1 = __importDefault(require("./routes/rotaTesteArma"));
const rotaTesteBuild_1 = __importDefault(require("./routes/rotaTesteBuild"));
const rotaTesteEquipamento_1 = __importDefault(require("./routes/rotaTesteEquipamento"));
// Configurar a conexão e dados de aceesso o banco
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("./config/knexfile"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Puxa as configurações
const db = (0, knex_1.default)(knexfile_1.default.development);
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Rota de teste de conexão com o banco de dados
app.get('/test-db', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db.raw('SELECT 1+1 AS result');
        res.status(200).json({ success: true, result: result[0] });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao conectar ao banco de dados', error });
    }
}));
// Rotas
app.use('/builds', rotaBuild_1.default);
app.use('/armas', rotaArma_1.default);
app.use('/equipamentos', rotaEquipamento_1.default);
// Rotas teste
app.use('/armasTeste', rotaTesteArma_1.default);
app.use('/buildsTeste', rotaTesteBuild_1.default);
app.use('/equipamentosTeste', rotaTesteEquipamento_1.default);
// Middleware de erro
app.use(errorHandler_1.default);
// Feedback backend rodando
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
app.listen(port, () => {
    logger_1.default.info(`Servidor rodando na porta ${port}`);
});
