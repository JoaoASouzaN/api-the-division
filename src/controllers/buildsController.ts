import { Request, Response, NextFunction } from 'express';
import { Build, builds } from '../models/buildsModel';

const getAllBuilds = (req: Request, res: Response, next: NextFunction): void => {
  try {
    
    res.status(200).json({  // Feedback de sucesso
      message: 'Build encontradas!',
      build: builds
    });
  } catch (error) {
    next(error); // Chama o middleware de erro
  }
};

const getBuildById = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const build = builds.find(b => b.id === parseInt(req.params.id));
    if (!build) {
      res.status(404).json({ error: 'Build não encontrada' }); // Feedback de build não encontrada
      return;
    }
    res.status(200).json({
      message: 'Build encontrada com sucesso', // Feedback possitivo para busca da build
      build: build
    });
  } catch (error) {
    next(error);  // Lança o erro
  }
};

const searchBuilds = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { nome } = req.query as { nome?: string };
    if (!nome) {
      res.status(400).json({ error: 'É necessário fornecer um nome para a busca' }); // Feedback de preenchimento incompleto
      return;
    }

    const resultados = builds.filter(build =>
      build.nome.toLowerCase().includes(nome.toLowerCase())
    );

    if (resultados.length === 0) {
      res.status(404).json({ error: 'Nenhum build encontrado com o nome fornecido' }); // Feedback negativo para a busca pela build
      return;
    }
    res.status(200).json({
      message: 'Build encontrada com sucesso', // Feedback possitivo para a busca pela build
      Resultado: resultados
    });
    res.json(resultados);
  } catch (error) {
    next(error);  // Lança o erro
  }
};

const createBuild = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { nome, equipamentos, armas, modificacoes } = req.body as Build;
    if (!nome || !equipamentos || !armas || !modificacoes) {
      res.status(400).json({ error: 'Todos os campos são obrigatórios' });  // Feedback de preenchimento incompleto
      return;
    }

    const newBuild: Build = { id: builds.length + 1, nome, equipamentos, armas, modificacoes };
    builds.push(newBuild);

    res.status(201).json({
      message: 'Build criada com sucesso',  // Feedback possitivo para a criacao da build
      build: newBuild
    });
  } catch (error) {
    next(error); // Lança o erro
  }
};

const updateBuild = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const build = builds.find(b => b.id === parseInt(req.params.id));
    if (!build) {
      res.status(404).json({ error: 'Build não encontrada' }); // Feedback para a build não encontrada
      return;
    }

    const { nome, equipamentos, armas, modificacoes } = req.body as Build;
    if (!nome || !equipamentos || !armas || !modificacoes) {
      res.status(400).json({ error: 'Todos os campos são obrigatórios' }); // Feedback para preenchimento incompleto
      return;
    }

    build.nome = nome;
    build.equipamentos = equipamentos;
    build.armas = armas;
    build.modificacoes = modificacoes;

    res.status(200).json({
      message: 'Build atualizada com sucesso', // Feedback para sucesso ao atualizar a build
      build: build
    });

  } catch (error) {
    next(error); // Lança o erro
  }
};

const deleteBuild = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const buildIndex = builds.findIndex(b => b.id === parseInt(req.params.id));
    if (buildIndex === -1) {
      res.status(404).json({ error: 'Build não encontrada' }); // Feedback build não encontrada
      return;
    }

    builds.splice(buildIndex, 1);
    
    res.status(204).send({
      message: 'Build deletada com sucesso', // Feedback de sucesso ao deletar a build
    });
  } catch (error) {
    next(error); // Lança o erro
  }
};

export { getAllBuilds, getBuildById, searchBuilds, createBuild, updateBuild, deleteBuild };