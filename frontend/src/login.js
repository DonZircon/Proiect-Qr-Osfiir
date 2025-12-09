import React from 'react';
import './login.css'; 

function Login() {
  return (
    <div className="login-page-specific">
        <div className="container_register" id="container_register">
            <h2 style={{textAlign: 'center', marginBottom: '20px'}}>Autentificare</h2>
            <input 
                type="text" 
                className="inputs-login" 
                placeholder="Email"  
                id="EmailInput" 
                required 
            />
            <input 
                type="password" 
                className="inputs-login" 
                placeholder="Parola" 
                id="PassInput" 
                required 
            />
            <div className="btn-box">
                <button className="button-login" type="submit" id="register">Register</button>
                <button className="button-login" type="button" id="Login">Login</button>
            </div>
            <div className="container_login" id="container_login" style={{display: 'none'}}> 
                <h1 id="h1">Welcome to the app! You are logged in.</h1>
                <button className="button-login" type="button" id="logout" style={{marginTop: '10px', background: '#d9534f'}}>Logout</button>
            </div>
        </div>
    </div> 
  );
}

export default Login;