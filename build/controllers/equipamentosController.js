"use strict";
// Para o banco
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
exports.deleteEquipamento = exports.patchEquipamento = exports.updateEquipamento = exports.createEquipamento = exports.getEquipamentoById = exports.getAllEquipamentos = void 0;
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("../config/knexfile"));
const logger_1 = __importDefault(require("../config/logger"));
// Configurar a conexão com o banco de dados
const db = (0, knex_1.default)(knexfile_1.default.development);
const getAllEquipamentos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 5 } = req.query;
        const offset = (Number(page) - 1) * Number(limit);
        const equipamentos = yield (0, knex_1.default)('Equipamentos').limit(Number(limit)).offset(offset);
        res.status(200).json({
            message: 'Equipamentos encontrados!',
            Equipamentos: equipamentos
        });
    }
    catch (error) {
        logger_1.default.error(error.message); // Lança o erro
        next(error);
    }
});
exports.getAllEquipamentos = getAllEquipamentos;
const getEquipamentoById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const equipamento = yield (0, knex_1.default)('Equipamentos').where({ id: req.params.id }).first();
        if (!equipamento) {
            res.status(404).json({ error: 'Equipamento não encontrado' });
            return;
        }
        res.status(200).json({
            message: 'Equipamento encontrado!',
            Equipamento: equipamento
        });
    }
    catch (error) {
        logger_1.default.error(error.message); // Lança o erro
        next(error);
    }
});
exports.getEquipamentoById = getEquipamentoById;
const createEquipamento = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nome, categoria, atributoPrim, valorAtri } = req.body;
        if (!nome || !categoria || !atributoPrim || !valorAtri) {
            res.status(400).json({ error: 'Todos os campos são obrigatórios' });
            return;
        }
        const [newEquipamento] = yield (0, knex_1.default)('Equipamentos').insert({ nome, categoria, atributoPrim, valorAtri }).returning('*');
        res.status(201).json({
            message: 'Equipamento adicinado!',
            Equipamento: newEquipamento
        });
    }
    catch (error) {
        logger_1.default.error(error.message); // Lança o erro
        next(error);
    }
});
exports.createEquipamento = createEquipamento;
const updateEquipamento = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nome, categoria, atributoPrim, valorAtri } = req.body;
        const equipamento = yield (0, knex_1.default)('Equipamentos').where({ id: req.params.id }).first();
        if (!nome || !categoria || !atributoPrim || !valorAtri) {
            res.status(400).json({ error: 'Todos os campos são obrigatórios' }); // Feedback de preenchimento incompleto dos campos
            return;
        }
        if (!equipamento) {
            res.status(404).json({ error: 'Equipamento não encontrado' }); // Feedback de operação executada, mas sem sucesso ao encontrar os equipamentos especificados
            return;
        }
        const updatedEquipamento = yield (0, knex_1.default)('Equipamentos').where({ id: req.params.id }).update({ nome, categoria, atributoPrim, valorAtri }).returning('*');
        res.status(200).json({
            message: 'Equipamento atualizado!',
            equipamento: updatedEquipamento
        });
        equipamento.nome = nome;
        equipamento.categoria = categoria;
        equipamento.atributoPrim = atributoPrim;
        equipamento.valorAtri = valorAtri;
        res.status(200).json({
            message: 'Equipamento atualizado!',
            Equipamento: equipamento
        });
    }
    catch (error) {
        logger_1.default.error(error.message); // Lança o erro
        next(error);
    }
});
exports.updateEquipamento = updateEquipamento;
const patchEquipamento = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updates = req.body;
        const equipamento = yield (0, knex_1.default)('Equipamentos').where({ id: req.params.id }).first();
        if (!equipamento) {
            res.status(404).json({ error: 'Equipamento não encontrado' });
            return;
        }
        const updatedEquipamento = yield (0, knex_1.default)('Equipamentos').where({ id: req.params.id }).update(updates).returning('*');
        res.status(200).json({
            message: 'Equipamento atualizado!',
            equipamento: updatedEquipamento
        });
    }
    catch (error) {
        logger_1.default.error(error.message);
        next(error);
    }
});
exports.patchEquipamento = patchEquipamento;
const deleteEquipamento = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const equipamento = yield (0, knex_1.default)('Equipamentos').where({ id: req.params.id }).first();
        if (!equipamento) {
            res.status(404).json({ error: 'Equipamento não encontrado' }); // Feedback de rquisisão feita, mas falha ao encontrar
            return;
        }
        yield (0, knex_1.default)('Equipamentos').where({ id: req.params.id }).del();
        res.status(204).json({
            message: 'Equipamento deletado!',
        });
    }
    catch (error) {
        logger_1.default.error(error.message); // Lança o erro
        next(error);
    }
});
exports.deleteEquipamento = deleteEquipamento;
