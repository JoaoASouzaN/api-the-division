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
exports.deleteArma = exports.patchArma = exports.updateArma = exports.createArma = exports.getArmaById = exports.getAllArmas = void 0;
const db_1 = __importDefault(require("../config/db"));
const logger_1 = __importDefault(require("../config/logger"));
const getAllArmas = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 5 } = req.query;
        const offset = (Number(page) - 1) * Number(limit);
        const armas = yield (0, db_1.default)('Armas').limit(Number(limit)).offset(offset);
        res.status(200).json({
            message: 'Armas encontradas!',
            armas
        });
    }
    catch (error) {
        logger_1.default.error(error.message);
        next(error); // Lança o erro
    }
});
exports.getAllArmas = getAllArmas;
const getArmaById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const arma = yield (0, db_1.default)('Armas').where({ id: req.params.id }).first();
        if (!arma) {
            res.status(404).json({ error: 'Arma não encontrada' }); // Feedback de arma não encontrada
            return;
        }
        res.status(200).json({
            message: 'Arma encontradas!',
            arma
        });
    }
    catch (error) {
        logger_1.default.error(error.message);
        next(error); // Lança o erro
    }
});
exports.getArmaById = getArmaById;
const createArma = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nome, dano, tipo, danoCritico, taxaDisparo, alcance } = req.body;
        if (!nome || !dano || !tipo || !danoCritico || !taxaDisparo || !alcance) {
            res.status(400).json({ error: 'Todos os campos são obrigatórios' }); // Feedback de preenchimento incompleto
            return;
        }
        const [newArma] = yield (0, db_1.default)('Armas').insert({ nome, dano, tipo, danoCritico, taxaDisparo, alcance }).returning('*');
        res.status(201).json({
            message: 'Nova arma adicionada!',
            Armas: newArma
        });
    }
    catch (error) {
        logger_1.default.error(error.message);
        next(error); // Lança o erro
    }
});
exports.createArma = createArma;
const updateArma = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nome, dano, tipo, danoCritico, taxaDisparo, alcance } = req.body;
        const arma = yield (0, db_1.default)('Armas').where({ id: req.params.id }).first();
        if (!arma) {
            res.status(404).json({ error: 'Arma não encontrada' }); // Feedback de requisiçao executada mas falha ao encontrar a arma
            return;
        }
        const updatedArma = yield (0, db_1.default)('Armas').where({ id: req.params.id }).update({ nome, dano, tipo, danoCritico, taxaDisparo, alcance }).returning('*');
        res.status(200).json({
            message: 'Arma atualizada!',
            arma: updatedArma
        });
        arma.nome = nome;
        arma.dano = dano;
        arma.tipo = tipo;
        arma.danoCritico = danoCritico;
        arma.taxaDisparo = taxaDisparo;
        arma.alcance = alcance;
        res.status(200).json({
            message: 'Armas atualizada!',
            Armas: arma
        });
    }
    catch (error) {
        logger_1.default.error(error.message);
        next(error); // Lança o erro
    }
});
exports.updateArma = updateArma;
const patchArma = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updates = req.body;
        const arma = yield (0, db_1.default)('Armas').where({ id: req.params.id }).first();
        if (!arma) {
            res.status(404).json({ error: 'Arma não encontrada' });
            return;
        }
        const updatedArma = yield (0, db_1.default)('Armas').where({ id: req.params.id }).update(updates).returning('*');
        res.status(200).json({
            message: 'Arma atualizada!',
            arma: updatedArma
        });
    }
    catch (error) {
        logger_1.default.error(error.message);
        next(error);
    }
});
exports.patchArma = patchArma;
const deleteArma = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const arma = yield (0, db_1.default)('Armas').where({ id: req.params.id }).first();
        if (!arma) {
            res.status(404).json({ error: 'Arma não encontrada' }); // Feedback de requisição feita mas falha ao encontrar a arma
            return;
        }
        yield (0, db_1.default)('Armas').where({ id: req.params.id }).del();
        res.status(204).send({
            message: 'Arma deletada!',
        });
    }
    catch (error) {
        logger_1.default.error(error.message);
        next(error); // Lança o erro
    }
});
exports.deleteArma = deleteArma;
