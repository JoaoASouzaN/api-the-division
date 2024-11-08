import { Request, Response, NextFunction } from 'express';
import { Compoem, compoem } from '../models/compoemModel';
import logger from '../config/logger';

const getAllCompoem = (req: Request, res: Response, next: NextFunction): void => {
  try {
    res.json(compoem);
  } catch (error) {
    logger.error((error as Error).message);
    next(error);
  }
};

const getCompoemByBuildId = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const compoemBuild = compoem.filter(c => c.id_build === parseInt(req.params.id_build));
    if (compoemBuild.length === 0) {
      res.status(404).json({ error: 'Nenhuma arma encontrada para essa build' });
      return;
    }
    res.json(compoemBuild);
  } catch (error) {
    logger.error((error as Error).message);
    next(error);
  }
};

const createCompoem = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { id_build, id_arma } = req.body as Compoem;
    if (!id_build || !id_arma) {
      res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      return;
    }

    const newCompoem: Compoem = { id_build, id_arma };
    compoem.push(newCompoem);
    res.status(201).json(newCompoem);
  } catch (error) {
    logger.error((error as Error).message);
    next(error);
  }
};

const deleteCompoem = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const compoemIndex = compoem.findIndex(c => c.id_build === parseInt(req.params.id_build) && c.id_arma === parseInt(req.params.id_arma));
    if (compoemIndex === -1) {
      res.status(404).json({ error: 'Relacionamento não encontrado' });
      return;
    }

    compoem.splice(compoemIndex, 1);
    res.status(204).send();
  } catch (error) {
    logger.error((error as Error).message);
    next(error);
  }
};

export { getAllCompoem, getCompoemByBuildId, createCompoem, deleteCompoem };