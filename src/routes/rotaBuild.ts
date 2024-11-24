import express from 'express';
import { getAllBuilds, getBuildById, createBuild, updateBuild, deleteBuild, patchBuild } from '../controllers/buildsController';

const router = express.Router();

// Definindo as rotas para acessar as builds
router.get('/', getAllBuilds as express.RequestHandler);
router.get('/:id', getBuildById as express.RequestHandler);
router.post('/', createBuild as express.RequestHandler);
router.put('/:id', updateBuild as express.RequestHandler);
router.patch('/:id', patchBuild as express.RequestHandler)
router.delete('/:id', deleteBuild as express.RequestHandler);

export default router;