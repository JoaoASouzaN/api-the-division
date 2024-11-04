"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBuild = exports.updateBuild = exports.createBuild = exports.searchBuilds = exports.getBuildById = exports.getAllBuilds = void 0;
const builsModel_1 = require("../models/builsModel");
const getAllBuilds = (req, res, next) => {
    try {
        res.json(builsModel_1.builds);
    }
    catch (error) {
        next(error); // Chama o middleware de erro
    }
};
exports.getAllBuilds = getAllBuilds;
const getBuildById = (req, res, next) => {
    try {
        const build = builsModel_1.builds.find(b => b.id === parseInt(req.params.id));
        if (!build) {
            res.status(404).json({ error: 'Build não encontrada' });
            return;
        }
        res.json(build);
    }
    catch (error) {
        next(error);
    }
};
exports.getBuildById = getBuildById;
const searchBuilds = (req, res, next) => {
    try {
        const { nome } = req.query;
        if (!nome) {
            res.status(400).json({ error: 'É necessário fornecer um nome para a busca' });
            return;
        }
        const resultados = builsModel_1.builds.filter(build => build.nome.toLowerCase().includes(nome.toLowerCase()));
        if (resultados.length === 0) {
            res.status(404).json({ error: 'Nenhum build encontrado com o nome fornecido' });
            return;
        }
        res.json(resultados);
    }
    catch (error) {
        next(error);
    }
};
exports.searchBuilds = searchBuilds;
const createBuild = (req, res, next) => {
    try {
        const { nome, equipamentos, armas, modificacoes } = req.body;
        if (!nome || !equipamentos || !armas || !modificacoes) {
            res.status(400).json({ error: 'Todos os campos são obrigatórios' });
            return;
        }
        const newBuild = { id: builsModel_1.builds.length + 1, nome, equipamentos, armas, modificacoes };
        builsModel_1.builds.push(newBuild);
        res.status(201).json(newBuild);
    }
    catch (error) {
        next(error);
    }
};
exports.createBuild = createBuild;
const updateBuild = (req, res, next) => {
    try {
        const build = builsModel_1.builds.find(b => b.id === parseInt(req.params.id));
        if (!build) {
            res.status(404).json({ error: 'Build não encontrada' });
            return;
        }
        const { nome, equipamentos, armas, modificacoes } = req.body;
        if (!nome || !equipamentos || !armas || !modificacoes) {
            res.status(400).json({ error: 'Todos os campos são obrigatórios' });
            return;
        }
        build.nome = nome;
        build.equipamentos = equipamentos;
        build.armas = armas;
        build.modificacoes = modificacoes;
        res.json(build);
    }
    catch (error) {
        next(error);
    }
};
exports.updateBuild = updateBuild;
const deleteBuild = (req, res, next) => {
    try {
        const buildIndex = builsModel_1.builds.findIndex(b => b.id === parseInt(req.params.id));
        if (buildIndex === -1) {
            res.status(404).json({ error: 'Build não encontrada' });
            return;
        }
        builsModel_1.builds.splice(buildIndex, 1);
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
};
exports.deleteBuild = deleteBuild;
