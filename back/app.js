import express from 'express';
import cors from 'cors';
import {connectDB} from './config/db.js';
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';
// import multer from 'multer';
// Инициализируем подключение к базе данных
connectDB();
const app = express();
// Подключаем CORS для разрешения запросов с фронтенда
app.use(cors({
  origin: 'http://localhost:3000', // Фронтенд приложение
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Подключаем middlewares для обработки JSON данных и данных формы
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.get('/', (req, res) => {
  res.send('<h1>Hello from the server 5000!</h1>');
});
app.use('/posts', postRoutes);
app.use('/auth', userRoutes);
app.use('/uploads', express.static('uploads'));
// Запуск сервера
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
