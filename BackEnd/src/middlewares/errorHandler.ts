import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  logger.error(err.message);
  res.status(500).json({ error: 'Algo deu errado no servidor.' });
}

export default errorHandler;