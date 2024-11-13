import React, {useState} from 'react';
import {TextField, Button, Grid, Box, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom'; // Для перенаправления после логина
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(''); // Для отображения ошибок
  const navigate = useNavigate(); // Для перенаправления после успешного логина
  // Обработчик изменения данных в полях
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    // Простая валидация формы
    if (!formData.email || !formData.password) {
      setError('Please fill in both fields');
      return;
    }
    // Здесь будет логика авторизации (например, запрос на сервер)
    // Для примера, предположим, что успешный логин происходит сразу
    console.log('Logging in with:', formData);
    // Пример успешного логина — перенаправляем на главную страницу
    // Сохраняем информацию о пользователе в localStorage (или другом хранилище)
    localStorage.setItem('user', JSON.stringify(formData));
    // Перенаправляем на главную страницу после логина
    navigate('/');
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="background.default"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: 400,
          padding: 3,
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        
        {/* Отображаем ошибку, если есть */}
        {error && (
          <Typography color="error" variant="body2" align="center" gutterBottom>
            {error}
          </Typography>
        )}
        
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </Grid>
        </Grid>
        
        <Box mt={2}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default LoginPage;
