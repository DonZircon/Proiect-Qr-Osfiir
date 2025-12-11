import React, { useState, useEffect } from 'react'; 
import './login.css';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"; 
import { auth } from './firebase'; 
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/profile');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const regForm = async (e) => {
    e.preventDefault(); 
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        alert(error.message);
    }
  };

  const logForm = async (e) => {
    e.preventDefault();
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        alert("Email sau parolă greșită!");
    }
  };

  return (
    <div className="login-page-specific">
        <div className="container_register">
            <h2 style={{color: 'black', textAlign: 'center', marginBottom: '20px'}}>Autentificare</h2>
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
                    <button className="button-login" id="register" onClick={regForm}>Register</button>
                    <button className="button-login" id="Login" onClick={logForm}>Login</button>
                </div>
            </form>
        </div>
    </div>
  );
}

export default Login;