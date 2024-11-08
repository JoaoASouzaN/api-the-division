import { Request, Response, NextFunction } from 'express';
import { Possue, possue } from '../models/possueModel';
import logger from '../config/logger';

const getAllPossue = (req: Request, res: Response, next: NextFunction): void => {
  try {
    res.json(possue);
  } catch (error) {
    logger.error((error as Error).message);
    next(error);
  }
};

const getPossueByBuildId = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const possueBuild = possue.filter(p => p.id_build === parseInt(req.params.id_build));
    if (possueBuild.length === 0) {
      res.status(404).json({ error: 'Nenhum equipamento encontrado para essa build' });
      return;
    }
    res.json(possueBuild);
  } catch (error) {
    logger.error((error as Error).message);
    next(error);
  }
};

const createPossue = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { id_build, id_equipamento } = req.body as Possue;
    if (!id_build || !id_equipamento) {
      res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      return;
    }

    const newPossue: Possue = { id_build, id_equipamento };
    possue.push(newPossue);
    res.status(201).json(newPossue);
  } catch (error) {
    logger.error((error as Error).message);
    next(error);
  }
};

const deletePossue = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const possueIndex = possue.findIndex(p => p.id_build === parseInt(req.params.id_build) && p.id_equipamento === parseInt(req.params.id_equipamento));
    if (possueIndex === -1) {
      res.status(404).json({ error: 'Relacionamento não encontrado' });
      return;
    }

    possue.splice(possueIndex, 1);
    res.status(204).send();
  } catch (error) {
    logger.error((error as Error).message);
    next(error);
  }
};

export { getAllPossue, getPossueByBuildId, createPossue, deletePossue };