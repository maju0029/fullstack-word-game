import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './about.jsx';
import Home from './Home.jsx';
import './App.css'
import NavBar from './components/NavBar.jsx';

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
