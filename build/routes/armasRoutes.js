"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const armasController_1 = require("../controllers/armasController");
const router = express_1.default.Router();
// Definindo as rotas para acessar as armas
router.get('/', armasController_1.getAllArmas);
router.get('/:id', armasController_1.getArmaById);
router.post('/', armasController_1.createArma);
router.put('/:id', armasController_1.updateArma);
router.delete('/:id', armasController_1.deleteArma);
exports.default = router;
