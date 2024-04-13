import express from 'express';
import { createServer } from 'http';
import authRoutes from './routes/auth';
import noteRoutes from './routes/note';
import connectDB from './config/connectDb';
import corsMiddleware from './middlewares/corsMiddleware';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
dotenv.config();

// Middlewares
const app = express();
app.set('trust proxy', 1);
app.use(express.json());
app.use(corsMiddleware);
app.use(cookieParser());

// Routes
app.get('/test', (req, res) => {
  return res.status(200).json({ message: "Success" });
})
app.use('/api/auth', authRoutes);
app.use('/api/note', noteRoutes);


// Database setup
connectDB();

const httpServer = createServer(app);

// Express server setup
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});