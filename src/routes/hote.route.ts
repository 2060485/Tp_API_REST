import { Router } from 'express';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = Router();

interface User {
    username: string;
    password: string;
}

const users: User[] = []; // Simuler une base de données en mémoire

router.post('/register', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { username: req.body.username, password: hashedPassword };
    users.push(user);
    res.status(201).send('Utilisateur enregistré');
});

router.post('/login', async (req, res) => {
    const user = users.find(user => user.username === req.body.username);
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        const accessToken = jwt.sign({ username: user.username }, 'SECRET_KEY', { expiresIn: '1h' });
        res.json({ accessToken });
    } else {
        res.status(403).send('Nom d’utilisateur ou mot de passe incorrect');
    }
});

export default router;