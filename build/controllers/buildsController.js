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
exports.deleteBuild = exports.patchBuild = exports.updateBuild = exports.createBuild = exports.getBuildById = exports.getAllBuilds = void 0;
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("../config/knexfile"));
const logger_1 = __importDefault(require("../config/logger"));
// Configurar a conexão com o banco de dados
const db = (0, knex_1.default)(knexfile_1.default.development);
const getAllBuilds = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 3 } = req.query;
        const offset = (Number(page) - 1) * Number(limit);
        const builds = yield (0, knex_1.default)('Builds').limit(Number(limit)).offset(offset);
        // Buscar armas e equipamentos para cada build
        for (const build of builds) {
            build.armas = yield db('Armas').whereIn('id', build.armas);
            build.equipamentos = yield db('Equipamentos').whereIn('id', build.equipamentos);
        }
        res.status(200).json({
            message: 'Build encontradas!',
            build: builds
        });
    }
    catch (error) {
        logger_1.default.error(error.message);
        next(error); // Chama o middleware de erro
    }
});
exports.getAllBuilds = getAllBuilds;
const getBuildById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const build = yield (0, knex_1.default)('Builds').where({ id: req.params.id }).first();
        if (!build) {
            res.status(404).json({ error: 'Build não encontrada' }); // Feedback de build não encontrada
            return;
        }
        res.status(200).json({
            message: 'Build encontrada com sucesso', // Feedback possitivo para busca da build
            build
        });
    }
    catch (error) {
        logger_1.default.error(error.message);
        next(error); // Lança o erro
    }
});
exports.getBuildById = getBuildById;
const createBuild = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nome, descricao, dataCriacao } = req.body;
        if (!nome || !descricao || !dataCriacao) {
            res.status(400).json({ error: 'Todos os campos são obrigatórios' }); // Feedback de preenchimento incompleto
            return;
        }
        const [newBuild] = yield (0, knex_1.default)('Builds').insert({ nome, descricao, dataCriacao }).returning('*');
        res.status(201).json({
            message: 'Build criada com sucesso!', // Feedback possitivo para a criacao da build
            build: newBuild
        });
    }
    catch (error) {
        logger_1.default.error(error.message);
        next(error); // Lança o erro
    }
});
exports.createBuild = createBuild;
const updateBuild = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nome, armas, equipamentos } = req.body;
        const build = yield (0, knex_1.default)('Builds').where({ id: req.params.id }).first();
        if (!build) {
            res.status(404).json({ error: 'Build não encontrada' }); // Feedback para a build não encontrada
            return;
        }
        if (!nome || !equipamentos || !armas) {
            res.status(400).json({ error: 'Todos os campos são obrigatórios' }); // Feedback para preenchimento incompleto
            return;
        }
        build.nome = nome;
        build.equipamentos = equipamentos;
        build.armas = armas;
        res.status(200).json({
            message: 'Build atualizada com sucesso', // Feedback para sucesso ao atualizar a build
            build: build
        });
    }
    catch (error) {
        logger_1.default.error(error.message);
        next(error); // Lança o erro
    }
});
exports.updateBuild = updateBuild;
const patchBuild = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updates = req.body;
        const build = yield (0, knex_1.default)('Builds').where({ id: req.params.id }).first();
        if (!build) {
            res.status(404).json({ error: 'Build não encontrada' });
            return;
        }
        const updatedBuild = yield (0, knex_1.default)('Builds').where({ id: req.params.id }).update(updates).returning('*');
        res.status(200).json({
            message: 'Build atualizada com sucesso!',
            build: updatedBuild
        });
    }
    catch (error) {
        logger_1.default.error(error.message);
        next(error);
    }
});
exports.patchBuild = patchBuild;
const deleteBuild = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const build = yield (0, knex_1.default)('Builds').where({ id: req.params.id }).first();
        if (!build) {
            res.status(404).json({ error: 'Build não encontrada' }); // Feedback build não encontrada
            return;
        }
        yield (0, knex_1.default)('Builds').where({ id: req.params.id }).del();
        res.status(204).json({
            message: 'Build deletada com sucesso', // Feedback de sucesso ao deletar a build
        });
    }
    catch (error) {
        logger_1.default.error(error.message);
        next(error); // Lança o erro
    }
});
exports.deleteBuild = deleteBuild;
