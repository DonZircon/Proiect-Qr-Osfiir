import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


import Home from './home';
import About from './about';
import Login from './login';
import Profile from './profile';
import AdminDash from './admindash';

import { auth } from './firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const ADMIN_EMAIL = "admin@gmail.com";
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("Stare user schimbată:", currentUser);
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
        <nav style={{ padding: '15px', background: '#333', textAlign: 'center' }}>
          
          <Link to="/" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>Home</Link>
          <Link to="/about" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>About Us</Link>

          {user ? (
            <>
              {user.email === ADMIN_EMAIL && (
                <Link to="/admindash" style={{ margin: '0 15px', color: '#ff4444', fontWeight: 'bold', textDecoration: 'none' }}>
                  ADMIN PANEL
                </Link>
              )}
              <Link to="/profile" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>Profile</Link>
              <button 
                onClick={handleLogout}
                style={{ 
                  marginLeft: '15px', 
                  background: 'red', 
                  color: 'white', 
                  border: 'none', 
                  padding: '5px 10px', 
                  cursor: 'pointer' 
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>Login</Link>
          )}

        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admindash" element={<AdminDash />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;