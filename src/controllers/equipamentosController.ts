import { Request, Response, NextFunction } from 'express';
import knex from '../config/db';
import logger from '../config/logger';

const getAllEquipamentos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    const equipamentos = await

  knex('Equipamentos').limit(Number(limit)).offset(offset)
    res.status(200).json({  // Feedback de sucesso
      message: 'Equipamentos encontrados!',
      Equipamentos: equipamentos
    });

  } catch (error) {
    logger.error((error as Error).message); // Lança o erro
    next(error);
  }
};

const getEquipamentoById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const equipamento = await knex('Equipamentos').where({ id: req.params.id }).first();
    if (!equipamento) {
      res.status(404).json({ error: 'Equipamento não encontrado' });
      return;
    }
    res.status(200).json({  // Feedback de sucesso
      message: 'Equipamento encontrado!',
      Equipamento: equipamento
    });

  } catch (error) {
    logger.error((error as Error).message); // Lança o erro
    next(error);
  }
};


const createEquipamento = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { nome, categoria, atributoPrim, valorAtri } = req.body;
    if (!nome || !categoria || !atributoPrim || !valorAtri) {
      res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      return;
    }

    const [newEquipamento] = await knex('Equipamentos').insert({ nome, categoria, atributoPrim, valorAtri }).returning('*');
    res.status(201).json({  // Feedback de sucesso
      message: 'Equipamento adicinado!',
      Equipamento: newEquipamento
    });

  } catch (error) {
    logger.error((error as Error).message); // Lança o erro
    next(error);
  }
};

const updateEquipamento = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { nome, categoria, atributoPrim, valorAtri } = req.body;
    const equipamento = await knex('Equipamentos').where({ id: req.params.id }).first();

    if (!nome || !categoria || !atributoPrim || !valorAtri) {
      res.status(400).json({ error: 'Todos os campos são obrigatórios' });  // Feedback de preenchimento incompleto dos campos
      return;
    }
    if (!equipamento) {
      res.status(404).json({ error: 'Equipamento não encontrado' }); // Feedback de operação executada, mas sem sucesso ao encontrar os equipamentos especificados
      return;
    }
    const updatedEquipamento = await knex('Equipamentos').where({ id: req.params.id }).update({ nome, categoria, atributoPrim, valorAtri }).returning('*');
    res.status(200).json({
      message: 'Equipamento atualizado!',
      equipamento: updatedEquipamento
    });

    equipamento.nome = nome;
    equipamento.categoria = categoria;
    equipamento.atributoPrim = atributoPrim;
    equipamento.valorAtri = valorAtri;

    res.status(200).json({  // Feedback de sucesso
      message: 'Equipamento atualizado!',
      Equipamento: equipamento
    });

  } catch (error) {
    logger.error((error as Error).message); // Lança o erro
    next(error);
  }
};

const patchEquipamento = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updates = req.body;
    const equipamento = await knex('Equipamentos').where({ id: req.params.id }).first();
    if (!equipamento) {
      res.status(404).json({ error: 'Equipamento não encontrado' });
      return;
    }

    const updatedEquipamento = await knex('Equipamentos').where({ id: req.params.id }).update(updates).returning('*');
    res.status(200).json({
      message: 'Equipamento atualizado!',
      equipamento: updatedEquipamento
    });
  } catch (error) {
    logger.error((error as Error).message);
    next(error);
  }
};

const deleteEquipamento = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const equipamento = await knex('Equipamentos').where({ id: req.params.id }).first();
    if (!equipamento) {
      res.status(404).json({ error: 'Equipamento não encontrado' }); // Feedback de rquisisão feita, mas falha ao encontrar
      return;
    }

    await knex('Equipamentos').where({ id: req.params.id }).del();
    res.status(204).json({  // Feedback de sucesso
      message: 'Equipamento deletado!',
    });

  } catch (error) {
    logger.error((error as Error).message); // Lança o erro
    next(error);
  }
};

export { getAllEquipamentos, getEquipamentoById, createEquipamento, updateEquipamento, patchEquipamento, deleteEquipamento };