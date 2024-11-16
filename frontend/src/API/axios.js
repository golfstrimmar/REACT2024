import axios from 'axios';
// Указываем базовый URL нашего бэкенда
const instance = axios.create({
  baseURL: 'http://localhost:5000', // Адрес бэкенда
  headers: {
    'Content-Type': 'application/json',
  },
});
export default instance;
