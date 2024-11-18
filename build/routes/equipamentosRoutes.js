"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const equipamentosController_1 = require("../controllers/equipamentosController");
const router = express_1.default.Router();
// Definindo as rotas para acessar as equipamentos
router.get('/', equipamentosController_1.getAllEquipamentos);
router.get('/:id', equipamentosController_1.getEquipamentoById);
router.post('/', equipamentosController_1.createEquipamento);
router.put('/:id', equipamentosController_1.updateEquipamento);
router.delete('/:id', equipamentosController_1.deleteEquipamento);
exports.default = router;
