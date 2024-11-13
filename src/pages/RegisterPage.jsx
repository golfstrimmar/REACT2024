import React, {useState} from 'react';
import {TextField, Button, Grid, Box, Typography} from '@mui/material';

const RegisterPage = () => {
  // Состояние для полей ввода
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
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
    // Здесь можно добавить валидацию или отправку данных на сервер
    console.log('Submitted data:', formData);
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
          Register
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </Grid>
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
            Register
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default RegisterPage;
