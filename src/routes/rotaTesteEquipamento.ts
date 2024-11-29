import express from 'express';
import { getAllEquipamentos, getEquipamentoById, createEquipamento, updateEquipamento, deleteEquipamento, patchEquipamento } from '../controllers/equipTesteControlador';

const router = express.Router();

// Definindo as rotas para acessar as equipamentos
router.get('/', getAllEquipamentos as express.RequestHandler);
router.get('/:id', getEquipamentoById as express.RequestHandler);
router.post('/', createEquipamento as express.RequestHandler);
router.put('/:id', updateEquipamento as express.RequestHandler);
router.patch('/:id', patchEquipamento as express.RequestHandler)
router.delete('/:id', deleteEquipamento as express.RequestHandler);

export default router;