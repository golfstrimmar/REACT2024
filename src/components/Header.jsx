import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import {Link} from "react-router-dom";
import LogoutButton from '../components/LogoutButton';

const pages = [
  {name: 'Home', path: '/'},
  {name: 'Posts', path: '/posts'},
  {name: 'Login', path: '/login'},
  {name: 'Registration', path: '/register'},
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [scrollY, setScrollY] = React.useState(0); // Стейт для хранения прокрутки страницы
  // Отслеживание прокрутки страницы
  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY); // Обновляем значение прокрутки
    };
    window.addEventListener('scroll', handleScroll); // Добавляем слушатель события прокрутки
    return () => window.removeEventListener('scroll', handleScroll); // Убираем слушатель при размонтировании
  }, []);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: scrollY > 50 ? '#033362D3' : 'rgb(3,51,98)', // Изменяем цвет фона в зависимости от прокрутки
        transition: 'background-color 0.3s ease', // Плавное изменение фона
        boxShadow: scrollY > 50 ? '0px 4px 6px rgba(0, 0, 0, 0.1)' : 'none', // Тень при прокрутке
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/*<AdbIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>*/}
          {/*<Typography*/}
          {/*  variant="h6"*/}
          {/*  noWrap*/}
          {/*  component="a"*/}
          {/*  href="#app-bar-with-responsive-menu"*/}
          {/*  sx={{*/}
          {/*    mr: 2,*/}
          {/*    display: {xs: 'none', md: 'flex'},*/}
          {/*    fontFamily: 'monospace',*/}
          {/*    fontWeight: 700,*/}
          {/*    letterSpacing: '.3rem',*/}
          {/*    color: 'inherit',*/}
          {/*    textDecoration: 'none',*/}
          {/*  }}*/}
          {/*>*/}
          {/*  LOGO*/}
          {/*</Typography>*/}
          
          <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{display: {xs: 'block', md: 'none'}}}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography sx={{textAlign: 'center'}}>
                    <Link to={page.path} style={{textDecoration: 'none', color: 'inherit'}}>
                      {page.name}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
            {pages.map((page) => (
              <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                <Typography sx={{textAlign: 'center'}}>
                  <Link to={page.path} style={{textDecoration: 'none', color: 'inherit', fontSize: '1.2rem'}}>
                    {page.name}
                  </Link>
                </Typography>
              </MenuItem>
            ))}
          
          </Box>
          <LogoutButton/>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
