import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './home';
import About from './about';

function App() {
  return (
    <Router>
      <div>
       
        <nav style={{ padding: '10px', background: '#f0f0f0', textAlign: 'center' }}>
          <Link to="/" style={{ margin: '0 10px', textDecoration: 'none', fontSize: '20px' }}>Home</Link>
          <Link to="/about" style={{ margin: '0 10px', textDecoration: 'none', fontSize: '20px' }}>About Us</Link>
        </nav>
          
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;