import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';


export const verifyRole = (req: Request, res: Response, next: NextFunction) => {
  const role = req.headers['role'];

  if (!role) {
    logger.info('verifyRole - Aucun role');
    return res.status(403).json({ message: 'Accès refusé. Aucun role détecté.' });
  }

  if (role == "Admin") {
      req.body.user = role;
      next();
  }
  else{
      logger.info('verifyRole - Role invalide');
      res.status(401).json({ message: 'role invalide.' });
  }
};
