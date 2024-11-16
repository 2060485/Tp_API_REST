import dotenv from 'dotenv';

// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  sessionSecret: process.env.SESSION_SECRET || 'secret_par_defaut_pour_les_sessions',
  jwtSecret: process.env.JWT_SECRET || 'secret_par_defaut_pour_le_jwt',
  nodeEnv: process.env.NODE_ENV || 'test',
  isProduction: process.env.NODE_ENV === 'production',
  testPerformance : process.env.PERF || 'false',
};