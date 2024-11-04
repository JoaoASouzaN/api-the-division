"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./config/logger"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const buildsRoutes_1 = __importDefault(require("./routes/buildsRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Rotas
app.use('/builds', buildsRoutes_1.default);
// Middleware de erro
app.use(errorHandler_1.default);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    logger_1.default.info(`Server running on port ${port}`);
});
