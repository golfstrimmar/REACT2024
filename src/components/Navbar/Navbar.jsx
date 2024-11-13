import "./Navbar.scss";
import React from 'react';
import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-menu">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};
export default Navbar;
  