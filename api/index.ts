import express from 'express';
import authRoutes from './routes/auth';
import noteRoutes from './routes/note';
import connectDB from './config/connectDb';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

// Database setup
connectDB();

// Middlewares
const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running!`);
});

// Routes
app.get('/test', (req, res) => {
  return res.status(200).json({ message: "Success" });
})
app.use('/api/auth', authRoutes);
app.use('/api/note', noteRoutes);

const dir = path.resolve();

app.use(express.static(path.join(dir, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(dir, 'client', 'dist', 'index.html'));
});