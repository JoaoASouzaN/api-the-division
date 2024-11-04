import { Request, Response, NextFunction } from 'express';
import { Build, builds } from '../models/builsModel';

const getAllBuilds = (req: Request, res: Response, next: NextFunction): void => {
  try {
    res.json(builds);
  } catch (error) {
    next(error); // Chama o middleware de erro
  }
};

const getBuildById = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const build = builds.find(b => b.id === parseInt(req.params.id));
    if (!build) {
      res.status(404).json({ error: 'Build não encontrada' });
      return;
    }
    res.json(build);
  } catch (error) {
    next(error);
  }
};

const searchBuilds = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { nome } = req.query as { nome?: string };
    if (!nome) {
      res.status(400).json({ error: 'É necessário fornecer um nome para a busca' });
      return;
    }

    const resultados = builds.filter(build =>
      build.nome.toLowerCase().includes(nome.toLowerCase())
    );

    if (resultados.length === 0) {
      res.status(404).json({ error: 'Nenhum build encontrado com o nome fornecido' });
      return;
    }

    res.json(resultados);
  } catch (error) {
    next(error);
  }
};

const createBuild = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { nome, equipamentos, armas, modificacoes } = req.body as Build;
    if (!nome || !equipamentos || !armas || !modificacoes) {
      res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      return;
    }

    const newBuild: Build = { id: builds.length + 1, nome, equipamentos, armas, modificacoes };
    builds.push(newBuild);
    res.status(201).json(newBuild);
  } catch (error) {
    next(error);
  }
};

const updateBuild = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const build = builds.find(b => b.id === parseInt(req.params.id));
    if (!build) {
      res.status(404).json({ error: 'Build não encontrada' });
      return;
    }

    const { nome, equipamentos, armas, modificacoes } = req.body as Build;
    if (!nome || !equipamentos || !armas || !modificacoes) {
      res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      return;
    }

    build.nome = nome;
    build.equipamentos = equipamentos;
    build.armas = armas;
    build.modificacoes = modificacoes;
    res.json(build);
  } catch (error) {
    next(error);
  }
};

const deleteBuild = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const buildIndex = builds.findIndex(b => b.id === parseInt(req.params.id));
    if (buildIndex === -1) {
      res.status(404).json({ error: 'Build não encontrada' });
      return;
    }

    builds.splice(buildIndex, 1);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export { getAllBuilds, getBuildById, searchBuilds, createBuild, updateBuild, deleteBuild };