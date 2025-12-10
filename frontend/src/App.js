import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Importurile paginilor
// Asigură-te că numele fișierelor tale sunt exact ca aici (litere mici/mari)
import Home from './home';
import About from './about';
import Login from './login';
import Profile from './profile';
import AdminDash from './admindash'; // Verifică dacă fișierul e admindash.js sau AdminDash.js
import EventQR from './EventQR';     // Verifică dacă fișierul e EventQR.js

import { auth } from './firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  
  // Pune aici emailul cu care te loghezi tu ca Admin
  const ADMIN_EMAIL = "admin@gmail.com"; 

  // Verificăm dacă userul e logat
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Funcția de delogare
  const handleLogout = async () => {
    await signOut(auth);
    alert("Te-ai delogat!");
  };

  return (
    <Router>
      <div>
        {/* --- MENIUL DE NAVIGARE (NAVBAR) --- */}
        <nav style={{ padding: '15px', background: '#333', textAlign: 'center' }}>
          
          <Link to="/" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>Home</Link>
          <Link to="/about" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>About Us</Link>

          {/* Dacă userul este logat, arătăm Profile, Logout și eventual Admin */}
          {user ? (
            <>
              {/* Butonul de Admin apare DOAR pentru tine */}
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
                  cursor: 'pointer',
                  borderRadius: '5px'
                }}
              >
                Logout
              </button>
            </>
          ) : (
            // Dacă NU e logat, arătăm doar Login
            <Link to="/login" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>Login</Link>
          )}

        </nav>

        {/* --- DEFINIREA RUTELOR (PAGINILOR) --- */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* Ruta pentru Admin */}
          <Route path="/admindash" element={<AdminDash />} />
          
          {/* ✅ CORECTURA IMPORTANTĂ: Am pus '/event-qr' cu litere mici */}
          <Route path="/event-qr" element={<EventQR />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;