import express from 'express';
const router = express.Router();
import { addNote, getNote, getNotes, updateNote, deleteNote } from '../controllers/note';
import { verifyToken } from "../middlewares/verifyToken";

// Routes
router.post('/add', verifyToken, addNote);
router.get('/get/:id', verifyToken, getNote);
router.get('/getAll/:userId', verifyToken, getNotes);
router.put('/update/:id', verifyToken, updateNote);
router.delete('/delete/:id', verifyToken, deleteNote);

export default router;
