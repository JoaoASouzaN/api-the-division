import { Request, Response, NextFunction } from 'express';
import knex from '../config/db';
import logger from '../config/logger';
import { armas } from '../models/armasModel';
import { builds } from '../models/buildsModel';
import { equipamentos } from '../models/equipamentosModel';

const getAllBuilds = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page = 1, limit = 3 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    const builds = await knex('Builds').limit(Number(limit)).offset(offset);

    res.status(200).json({  // Feedback de sucesso
      message: 'Build encontradas!',
      build: builds
    });
  } catch (error) {
    logger.error((error as Error).message);
    next(error); // Chama o middleware de erro
  }
};

const getBuildById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const build = await knex('Builds').where({ id: req.params.id }).first();
    if (!build) {
      res.status(404).json({ error: 'Build não encontrada' }); // Feedback de build não encontrada
      return;
    }
    res.status(200).json({
      message: 'Build encontrada com sucesso', // Feedback possitivo para busca da build
      build
    });
  } catch (error) {
    logger.error((error as Error).message);
    next(error);  // Lança o erro
  }
};

const searchBuilds = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { nome } = req.query as { nome?: string };
    if (!nome) {
      res.status(400).json({ error: 'É necessário fornecer um nome para a busca' }); // Feedback de preenchimento incompleto
      return;
    }

    const resultados = await knex('Builds').where('nome', 'like', `%${nome}%`);
    if (resultados.length === 0) {
      res.status(404).json({ error: 'Nenhum build encontrado com o nome fornecido' });
      return;
    }
    res.status(200).json({
      message: 'Build encontrada com sucesso', // Feedback possitivo para a busca pela build
      Resultado: resultados
    });
    res.json(resultados);
  } catch (error) {
    logger.error((error as Error).message);
    next(error);  // Lança o erro
  }
};

const createBuild = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { nome, descricao, dataCriacao } = req.body;
    if (!nome || !descricao || !dataCriacao) {
      res.status(400).json({ error: 'Todos os campos são obrigatórios' });  // Feedback de preenchimento incompleto
      return;
    }

    const [newBuild] = await knex('Builds').insert({ nome, descricao, dataCriacao }).returning('*');
    res.status(201).json({
      message: 'Build criada com sucesso!',  // Feedback possitivo para a criacao da build
      build: newBuild
    });
  } catch (error) {
    logger.error((error as Error).message);
    next(error); // Lança o erro
  }
};

const updateBuild = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { nome, descricao, dataCriacao } = req.body;

    const build = await knex('Builds').where({ id: req.params.id }).first();
    if (!build) {
      res.status(404).json({ error: 'Build não encontrada' }); // Feedback para a build não encontrada
      return;
    }

    if (!nome || !equipamentos || !armas) {
      res.status(400).json({ error: 'Todos os campos são obrigatórios' }); // Feedback para preenchimento incompleto
      return;
    }

    build.nome = nome;
    build.equipamentos = equipamentos;
    build.armas = armas;

    res.status(200).json({
      message: 'Build atualizada com sucesso', // Feedback para sucesso ao atualizar a build
      build: build
    });

  } catch (error) {
    logger.error((error as Error).message);
    next(error); // Lança o erro
  }
};

const patchBuild = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updates = req.body;
    const build = await knex('Builds').where({ id: req.params.id }).first();
    if (!build) {
      res.status(404).json({ error: 'Build não encontrada' });
      return;
    }

    const updatedBuild = await knex('Builds').where({ id: req.params.id }).update(updates).returning('*');
    res.status(200).json({
      message: 'Build atualizada com sucesso!',
      build: updatedBuild
    });
  } catch (error) {
    logger.error((error as Error).message);
    next(error);
  }
};

const deleteBuild = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const build = await knex('Builds').where({ id: req.params.id }).first();
    if (!build) {
      res.status(404).json({ error: 'Build não encontrada' }); // Feedback build não encontrada
      return;
    }

    await knex('Builds').where({ id: req.params.id }).del();
    res.status(204).json({
      message: 'Build deletada com sucesso', // Feedback de sucesso ao deletar a build
    });
  } catch (error) {
    logger.error((error as Error).message);
    next(error); // Lança o erro
  }
};

export { getAllBuilds, getBuildById, searchBuilds, createBuild, updateBuild, patchBuild, deleteBuild };