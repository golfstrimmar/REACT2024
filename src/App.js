import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header/>
      <AppRouter/>
    </Router>
  );
}

export default App;