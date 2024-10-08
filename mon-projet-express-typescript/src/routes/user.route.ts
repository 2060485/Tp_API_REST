import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { verifyRole } from '../middlewares/roles.middleware';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();
const userController = new UserController();

router.get('/', userController.getAllUsers); // Changez '/users' en '/'

// Route pour les administrateurs
router.get('/admin', verifyToken, verifyRole, UserController.getAdminData);

export default router;
