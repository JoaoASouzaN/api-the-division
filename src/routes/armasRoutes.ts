import express from 'express';
import { getAllArmas, getArmaById, createArma, updateArma, deleteArma } from '../controllers/armasController';

const router = express.Router();

router.get('/', getAllArmas as express.RequestHandler);
router.get('/:id', getArmaById as express.RequestHandler);
router.post('/', createArma as express.RequestHandler);
router.put('/:id', updateArma as express.RequestHandler);
router.delete('/:id', deleteArma as express.RequestHandler);

export default router;