import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Importurile paginilor
import Home from './home';
import About from './about';
import Login from './login';
import Profile from './profile';
import AdminDash from './admindash';
import EventQR from './EventQR';

import { auth } from './firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  
  const ADMIN_EMAIL = "admin@gmail.com"; 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    alert("Te-ai delogat!");
  };

  return (
    <Router>
      <div>
        <nav className="App-navbar">
          {/* Left side - Navigation Links */}
          <div className="navbar-left">
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            {user && user.email === ADMIN_EMAIL && (
              <Link to="/admindash" className="admin-link">ADMIN PANEL</Link>
            )}
          </div>

          {/* Center - Logo */}
          <div className="navbar-center">
            <Link to="/" className="navbar-logo">
              <span className="logo-icon">⚡</span>
              <span className="logo-text">OSFIIR</span>
            </Link>
          </div>

          {/* Right side - User Actions */}
          <div className="navbar-right">
            {user ? (
              <>
                <Link to="/profile">Profile</Link>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="login-link">Login</Link>
            )}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admindash" element={<AdminDash />} />
          <Route path="/event-qr" element={<EventQR />} />
        </Routes>
      </div>
      <div className="footer-section">
              <ul className="footer-contact">
                <li className="footer-heading">Contact</li>
                <li>📧 contact@osfiir.ro</li>
                <li>📞 +40 123 456 789</li>
                <li>📍 București, România</li>
              </ul>
            </div>
    </Router>
  );
}

export default App;