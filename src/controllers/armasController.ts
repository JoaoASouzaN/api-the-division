import { Request, Response, NextFunction } from 'express';
import knex from '../config/db';
import logger from '../config/logger';

const getAllArmas = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  try {
    const { page = 1, limit = 5 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    const armas = await knex('Armas').limit(Number(limit)).offset(offset);
    res.status(200).json({  // Feedback de sucesso
      message: 'Armas encontradas!',
      armas
    });
    
  } catch (error) {
    logger.error((error as Error).message);
    next(error); // Lança o erro
  }
};

const getArmaById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const arma = await knex('Armas').where({ id: req.params.id }).first();
    if (!arma) {
      res.status(404).json({ error: 'Arma não encontrada' }); // Feedback de arma não encontrada
      return;
    }
    res.status(200).json({  // Feedback de sucesso
      message: 'Arma encontradas!',
      arma
    });

  } catch (error) {
    logger.error((error as Error).message);
    next(error); // Lança o erro
  }
};

const createArma = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { nome, dano, tipo, danoCritico, taxaDisparo, alcance } = req.body;
    if (!nome || !dano || !tipo || !danoCritico || !taxaDisparo || !alcance) {
      res.status(400).json({ error: 'Todos os campos são obrigatórios' }); // Feedback de preenchimento incompleto
      return;
    }

const [newArma] = await knex('Armas').insert({ nome, dano, tipo, danoCritico, taxaDisparo, alcance }).returning('*');

  res.status(201).json({  // Feedback de sucesso
    message: 'Nova arma adicionada!',
    Armas: newArma
  });

  } catch (error) {
    logger.error((error as Error).message);
    next(error); // Lança o erro
  }
};

const updateArma = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { nome, dano, tipo, danoCritico, taxaDisparo, alcance } = req.body;
    const arma = await knex('Armas').where({ id: req.params.id }).first();
    if (!arma) {
      res.status(404).json({ error: 'Arma não encontrada' }); // Feedback de requisiçao executada mas falha ao encontrar a arma
      return;
    }

    const updatedArma = await knex('Armas').where({ id: req.params.id }).update({ nome, dano, tipo, danoCritico, taxaDisparo, alcance }).returning('*');
      res.status(200).json({ // Feedback de preenchimento incompleto
      message: 'Arma atualizada!',
      arma: updatedArma
    });

    arma.nome = nome;
    arma.dano = dano;
    arma.tipo = tipo;
    arma.danoCritico = danoCritico;
    arma.taxaDisparo = taxaDisparo;
    arma.alcance = alcance;

    res.status(200).json({  // Feedback de sucesso
      message: 'Armas atualizada!',
      Armas: arma
    });

  } catch (error) {
    logger.error((error as Error).message);
    next(error); // Lança o erro
  }
};

const patchArma = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updates = req.body;
    const arma = await knex('Armas').where({ id: req.params.id }).first();
    if (!arma) {
      res.status(404).json({ error: 'Arma não encontrada' });
      return;
    }

    const updatedArma = await knex('Armas').where({ id: req.params.id }).update(updates).returning('*');
    res.status(200).json({
      message: 'Arma atualizada!',
      arma: updatedArma
    });
  } catch (error) {
    logger.error((error as Error).message);
    next(error);
  }
};

const deleteArma = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const arma = await knex('Armas').where({ id: req.params.id }).first();
    if (!arma) {
      res.status(404).json({ error: 'Arma não encontrada' }); // Feedback de requisição feita mas falha ao encontrar a arma
      return;
    }

    await knex('Armas').where({ id: req.params.id }).del();
    res.status(204).send({  // Feedback de sucesso
      message: 'Arma deletada!',
    });

  } catch (error) {
    logger.error((error as Error).message);
    next(error); // Lança o erro
  }
};

export { getAllArmas, getArmaById, createArma, updateArma, patchArma, deleteArma };