import express from 'express';
import { getAllEquipamentos, getEquipamentoById, createEquipamento, updateEquipamento, deleteEquipamento, patchEquipamento } from '../controllers/equipamentosController';

const router = express.Router();

// Definindo as rotas para acessar as equipamentos
router.get('/testeE/', getAllEquipamentos as express.RequestHandler);
router.get('/testeE/:id', getEquipamentoById as express.RequestHandler);
router.post('/testeE/', createEquipamento as express.RequestHandler);
router.put('/testeE/:id', updateEquipamento as express.RequestHandler);
router.patch('/testeE/:id', patchEquipamento as express.RequestHandler)
router.delete('/testeE/:id', deleteEquipamento as express.RequestHandler);

export default router;