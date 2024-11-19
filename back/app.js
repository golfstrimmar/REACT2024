import express from 'express';
import cors from 'cors';
import {connectDB} from './config/db.js';
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
// import * as UserController from './controllers/UserController.js';
// import {getMe} from "./controllers/UserController.js"; // Импортируем контроллер
connectDB();
const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Фронтенд приложение
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// --------------------------------
// расшифровка запроса
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});
// вывод сообщения в браузер при пустом запросе. ничего не делает. просто индикация запуска сервера
app.get('/', (req, res) => {
  res.send('<h1>Hello from the server 5000!</h1>');
});
app.use('/posts', postRoutes);
app.use('/auth', userRoutes);
app.use('/comments', commentRoutes);
app.use('/uploads', express.static('uploads'));
// --------------------------------
// --------------------------------
// --------------------------------
// --------------------------------
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
