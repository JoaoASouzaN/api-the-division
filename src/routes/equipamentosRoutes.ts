import express from 'express';
import { getAllEquipamentos, getEquipamentoById, createEquipamento, updateEquipamento, deleteEquipamento } from '../controllers/equipamentosController';

const router = express.Router();

router.get('/', getAllEquipamentos as express.RequestHandler);
router.get('/:id', getEquipamentoById as express.RequestHandler);
router.post('/', createEquipamento as express.RequestHandler);
router.put('/:id', updateEquipamento as express.RequestHandler);
router.delete('/:id', deleteEquipamento as express.RequestHandler);

export default router;