// Controladore para testes e execução de dados em loco
import { Request, Response, NextFunction } from 'express';
import { Equipamento, equipamentos } from '../models/equipTeste';
//import logger from '../config/logger';

const getAllEquipamentos = (req: Request, res: Response, next: NextFunction): void => {
  try {
    res.status(200).json({  // Feedback de sucesso
      message: 'Equipamentos encontrados!',
      Equipamentos: equipamentos
    });

  } catch (error) {
    //logger.error((error as Error).message);
    next(error); 
  }
};

const getEquipamentoById = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const equipamento = equipamentos.find(e => e.id === parseInt(req.params.id));
    if (!equipamento) {
      res.status(404).json({ error: 'Equipamento não encontrado' });
      return;
    }
    res.status(200).json({  // Feedback de sucesso
      message: 'Equipamento encontrado!',
      Equipamento: equipamento
    });

  } catch (error) {
    //logger.error((error as Error).message);
    next(error);
  }
};

const createEquipamento = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { nome, categoria, atributoPrim, valorAtri } = req.body as Equipamento;
    if (!nome || !categoria || !atributoPrim || !valorAtri) {
      res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      return;
    }

    const newEquipamento: Equipamento = { id: equipamentos.length + 1, nome, categoria, atributoPrim, valorAtri };
    equipamentos.push(newEquipamento);
    res.status(201).json({  // Feedback de sucesso
      message: 'Equipamento adicinado!',
      Equipamento: newEquipamento
    });

  } catch (error) {
    //logger.error((error as Error).message);
    next(error);
  }
};

const updateEquipamento = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const equipamento = equipamentos.find(e => e.id === parseInt(req.params.id));
    if (!equipamento) {
      res.status(404).json({ error: 'Equipamento não encontrado' });
      return;
    }

    const { nome, categoria, atributoPrim, valorAtri } = req.body as Equipamento;
    if (!nome || !categoria || !atributoPrim || !valorAtri) {
      res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      return;
    }

    equipamento.nome = nome;
    equipamento.categoria = categoria;
    equipamento.atributoPrim = atributoPrim;
    equipamento.valorAtri = valorAtri;
    res.status(200).json({  // Feedback de sucesso
      message: 'Equipamento atualizado!',
      Equipamento: equipamento
    });

  } catch (error) {
    //logger.error((error as Error).message);
    next(error);
  }
};

const patchEquipamento = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const equipamentoIndex = equipamentos.findIndex(e => e.id === parseInt(req.params.id));
    if (equipamentoIndex === -1) {
      res.status(404).json({ error: 'Equipamento não encontrado' });
      return;
    }

    // Atualiza apenas os campos fornecidos no body
    const updates = req.body;
    equipamentos[equipamentoIndex] = {
      ...equipamentos[equipamentoIndex],
      ...updates,
    };

    res.status(200).json({
      message: 'Equipamento atualizado!',
      equipamento: equipamentos[equipamentoIndex],
    });
  } catch (error) {
    //logger.error((error as Error).message);
    next(error);
  }
};

const deleteEquipamento = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const equipamentoIndex = equipamentos.findIndex(e => e.id === parseInt(req.params.id));
    if (equipamentoIndex === -1) {
      res.status(404).json({ error: 'Equipamento não encontrado' });
      return;
    }

    equipamentos.splice(equipamentoIndex, 1);
    res.status(204).send({  // Feedback de sucesso
      message: 'Equipamento deletado!',
    });

  } catch (error) {
    //logger.error((error as Error).message);
    next(error);
  }
};

export { getAllEquipamentos, getEquipamentoById, createEquipamento, updateEquipamento, patchEquipamento, deleteEquipamento };