import express from 'express';
import { getAllCompoem, getCompoemByBuildId, createCompoem, deleteCompoem } from '../controllers/compoemController';

const router = express.Router();

router.get('/', getAllCompoem as express.RequestHandler);
router.get('/:id_build', getCompoemByBuildId as express.RequestHandler);
router.post('/', createCompoem as express.RequestHandler);
router.delete('/:id_build/:id_arma', deleteCompoem as express.RequestHandler);

export default router;