"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const buildsController_1 = require("../controllers/buildsController");
const router = express_1.default.Router();
// Definindo as rotas para acessar as builds
router.get('/', buildsController_1.getAllBuilds);
router.get('/:id', buildsController_1.getBuildById);
router.get('/search', buildsController_1.searchBuilds);
router.post('/', buildsController_1.createBuild);
router.put('/:id', buildsController_1.updateBuild);
router.delete('/:id', buildsController_1.deleteBuild);
exports.default = router;
