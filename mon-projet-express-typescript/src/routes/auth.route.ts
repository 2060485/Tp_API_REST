import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../interfaces/user.interface';
import { JWT_SECRET } from '../utils/jwt.util';

const router = Router();

const users: User[] = []; // Simuler une base de données en mémoire

/**
 * @swagger
 * /v1/users/register:
 *   post:
 *     summary: Register a new user
 *     description: This endpoint allows a user to register with a username, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - id
 *               - name
 *               - email
 *               - username
 *               - password
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /v1/users/login:
 *   post:
 *     summary: Log in a user
 *     description: This endpoint allows a user to log in with a username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       403:
 *         description: Invalid username or password
 */

router.post('/register', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user: User = { 
        id: req.body.id,
        name: req.body.name, 
        email: req.body.email, 
        username: req.body.username, 
        password: hashedPassword 
    };
    users.push(user);
    res.status(201).send('Utilisateur enregistré');
});

router.post('/login', async (req, res) => {
    const user = users.find(user => user.username === req.body.username);
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        const accessToken = jwt.sign({ username: user.username }, JWT_SECRET, 
            { expiresIn: '1h' }
        );
        res.json({ accessToken });
    } else {
        res.status(403).send('Nom d’utilisateur ou mot de passe incorrect');
    }
});

export default router;