import express from 'express';
import { getAllBuilds, getBuildById, createBuild, updateBuild, deleteBuild, patchBuild } from '../controllers/buildsController';

const router = express.Router();

// Definindo as rotas para acessar as builds
router.get('/testeB/', getAllBuilds as express.RequestHandler);
router.get('/testeB/:id', getBuildById as express.RequestHandler);
router.post('/testeB/', createBuild as express.RequestHandler);
router.put('/testeB/:id', updateBuild as express.RequestHandler);
router.patch('/testeB/:id', patchBuild as express.RequestHandler)
router.delete('/testeB/:id', deleteBuild as express.RequestHandler);

export default router;