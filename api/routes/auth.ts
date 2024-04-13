import express from 'express';
const router = express.Router();
import { login, register, logout } from '../controllers/auth';

// Routes
router.post('/login', login);
router.post('/register', register);
router.get('/logout', logout);

export default router;
