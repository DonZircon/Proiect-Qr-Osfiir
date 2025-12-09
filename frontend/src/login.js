import React, { useState, useEffect } from 'react'; 
import './login.css';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"; 
import { auth } from './firebase'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const logged = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setEmail(user.email); 
      } else {
        setIsLoggedIn(false);
      }
    });
    return () => logged();
  }, []);


  const regForm = async (e) => {
    e.preventDefault(); 
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Cont creat cu succes!");
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            alert("Email-ul este deja folosit!");
            return;
        }
    }
  };

  const logForm = async () => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Te-ai logat cu succes!");
    } catch (error) {
        alert("Email sau parolă greșită!");
    }
  };

  const logoutForm = () => {
    auth.signOut(); 
    setEmail('');
    setPassword('');
  };

  return (
    <div className="login-page-specific">
        
        {!isLoggedIn ? (
            <div className="container_register">
                <h2 style={{textAlign: 'center', marginBottom: '20px'}}>Autentificare</h2>
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
        ) : (
            <div className="container_login" style={{display: 'block'}}> 
                <h1 id="h1">Welcome!</h1>
                <p>Te-ai autentificat cu: {email}</p>
                <button 
                    className="button-login" 
                    id="logout" 
                    onClick={logoutForm}
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