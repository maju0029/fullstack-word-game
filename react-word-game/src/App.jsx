import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './About.jsx';
import Home from './Home.jsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css'
import NavBar from './components/navBar.jsx';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
