import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './home';
import About from './about';
import Login from './login';
function App() {
  return (
    <Router>
      <div>
       
        <nav style={{ padding: '10px', background: '#f0f0f0', textAlign: 'center' }}>
          <Link to="/" style={{ margin: '0 10px', textDecoration: 'none', fontSize: '20px' }}>Home</Link>
          <Link to="/about" style={{ margin: '0 10px', textDecoration: 'none', fontSize: '20px' }}>About Us</Link>
          <Link to="/login" style={{ margin: '0 10px', textDecoration: 'none', fontSize: '20px' }}>Log in</Link>
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