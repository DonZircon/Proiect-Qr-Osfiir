import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './home';
import About from './about';
import Login from './login';
import './App.css';
function App() {
  return (
    <Router>
      <div>
       
        <nav className="App-navbar">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/login">Log in</Link>
        </nav>
          
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;