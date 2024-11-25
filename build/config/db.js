"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("./knexfile"));
const environment = process.env.NODE_ENV || 'development';
const connection = (0, knex_1.default)(knexfile_1.default[environment]);
// Teste de conexão
connection.raw('SELECT 1')
    .then(() => {
    console.log('Sucesso! Conexão com o banco de dados estabelecida.');
})
    .catch((err) => {
    console.error('Falha ao conectar ao banco de dados:', err);
});
exports.default = connection;
