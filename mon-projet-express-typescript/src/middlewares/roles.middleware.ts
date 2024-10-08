import { Request, Response, NextFunction } from 'express';


export const verifyRole = (req: Request, res: Response, next: NextFunction) => {
  const role = req.headers['role'];

  if (!role) {
      return res.status(403).json({ message: 'Accès refusé. Aucun role détecté.' });
  }

  if (role == "Admin") {
      req.body.user = role;
      next();
  }
  else{
      res.status(401).json({ message: 'role invalide.' });
  }
};
