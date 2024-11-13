import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import Home from '../pages/Home';
import PostPage from '../pages/PostPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

function AppRouter(props) {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/post/:id" element={<PostPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
    </Routes>
  );
}

export default AppRouter;