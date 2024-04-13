import express from 'express';
// import { createServer } from 'http';
import authRoutes from './routes/auth';
import noteRoutes from './routes/note';
import connectDB from './config/connectDb';
// import corsMiddleware from './middlewares/corsMiddleware';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

// Database setup
connectDB();

// Middlewares
const app = express();
// app.set('trust proxy', 1);
app.use(express.json());
// app.use(corsMiddleware);
app.use(cookieParser());

// const httpServer = createServer(app);

const PORT = process.env.port || 3000;

// Express server setup
app.listen(PORT, () => {
  console.log(`Server running!`);
});

// Routes
app.get('/test', (req, res) => {
  return res.status(200).json({ message: "Success" });
})
app.use('/api/auth', authRoutes);
app.use('/api/note', noteRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});