import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/jwt.util';
import { logger } from '../utils/logger';

// Middleware pour vérifier le JWT
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];

    if (!token) {
      logger.info('verifyToken - Aucun token');
      return res.status(403).json({ message: 'Accès refusé. Aucun token fourni.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        next();
      } catch (error) {
        logger.info('verifyToken - Token invalide');
        res.status(401).json({ message: 'Token invalide.' });
      }
};
