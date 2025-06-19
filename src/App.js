import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Game from './pages/Game/Game';
import './App.css';

function App() {
  return (
    <Router>
      <div className="fondo">
        <div className="oscurecer"></div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
