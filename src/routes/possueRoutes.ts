import express from 'express';
import { getAllPossue, getPossueByBuildId, createPossue, deletePossue } from '../controllers/possueController';

const router = express.Router();

router.get('/', getAllPossue as express.RequestHandler);
router.get('/:id_build', getPossueByBuildId as express.RequestHandler);
router.post('/', createPossue as express.RequestHandler);
router.delete('/:id_build/:id_equipamento', deletePossue as express.RequestHandler);

export default router;