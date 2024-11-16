// index.js
import express from 'express';
import cors from 'cors';
import {connectDB} from './config/db.js';
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';

connectDB();
const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use('/posts', postRoutes);
app.use('/auth', userRoutes);
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
