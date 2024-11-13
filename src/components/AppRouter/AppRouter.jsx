import React from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import Error from "../../pages/Error/Error";
import PostIdPage from "../../pages/PostIdPage/PostIdPage";
import About from "../../pages/About/About";
import Posts from "../../pages/Posts/Posts";

const AppRouter = () => {
  return (
    <div className="approuter">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route exact path="/posts" element={<Posts/>}/>
        <Route exact path="/posts/:id" element={<PostIdPage/>}/>
        <Route path="*" element={<Navigate to="/error"/>}/>
        <Route path="/error" element={<Error/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  );
};
export default AppRouter;
