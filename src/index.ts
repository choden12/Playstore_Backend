import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
}));
app.use(express.json());

app.use('/api/users', userRoutes);

export default app;