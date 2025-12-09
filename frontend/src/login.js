import React, { useState } from 'react';
import './login.css';

// CORECȚIE MAJORE AICI 👇
// Importăm funcțiile din pachetul local 'firebase/auth'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Importăm auth-ul configurat de noi în fișierul anterior
import { auth } from './firebase'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault(); // Oprește refresh al paginii

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Cont creat cu succes! Te-ai logat automat.");
        setIsLoggedIn(true);
    } catch (error) {
        if (error.code === "auth/email-already-in-use") {
            alert("Acest email este deja folosit!");
        } else if (error.code === "auth/weak-password") {
            alert("Parola trebuie să aibă minim 6 caractere!");
        } else {
            alert("Eroare: " + error.message);
        }
    }
  };

  const handleLogin = async () => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Te-ai logat cu succes!");
        setIsLoggedIn(true);
    } catch (error) {
        alert("Email sau parolă greșită!");
        console.error(error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="login-page-specific">
        
        {!isLoggedIn ? (
            <div className="container_register">
                <h2 style={{textAlign: 'center', marginBottom: '20px'}}>Autentificare</h2>
                
                {/* Folosim onSubmit la form ca să meargă și tasta Enter */}
                <form onSubmit={(e) => e.preventDefault()}> 
                    <input 
                        type="email" 
                        className="inputs-login" 
                        placeholder="Email"  
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                    
                    <input 
                        type="password" 
                        className="inputs-login" 
                        placeholder="Parola" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />

                    <div className="btn-box">
                        <button 
                            className="button-login" 
                            id="register" 
                            onClick={handleRegister}
                        >
                            Register
                        </button>

                        <button 
                            className="button-login" 
                            id="Login" 
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        ) : (
            <div className="container_login" style={{display: 'block'}}> 
                <h1 id="h1">Welcome!</h1>
                <p>Te-ai autentificat cu: {email}</p>
                <button 
                    className="button-login" 
                    id="logout" 
                    onClick={handleLogout}
                    style={{marginTop: '20px', backgroundColor: '#d9534f'}}
                >
                    Logout
                </button>
            </div>
        )}

    </div>
  );
}

export default Login;