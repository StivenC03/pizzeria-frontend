import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setLoggedInUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    axios.post('https://pizzeria-backend-xbfp.onrender.com/api/login', { username, password }, { withCredentials: true })
      .then(response => {
        setMessage(response.data.message);
        
        if (response.data.success) {
          // Rimosso localStorage! Ora fa tutto il cookie in automatico
          setLoggedInUser(response.data.username);
          
          setTimeout(() => {
            navigate('/prenotazioni');
          }, 1000);
        }
      })
      .catch(error => {
        if (error.response) {
          setMessage(error.response.data.message);
        }
      });
  };

  return (
    <div className="card" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
      <h2>Accedi alla tua area riservata</h2>
      <form onSubmit={handleLogin} style={{ width: '100%' }}>
        <div className="form-group">
          <label>Username: </label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required
          />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </div>
        <button type="submit" className="btn">Login</button>
      </form>
      <p style={{ fontWeight: 'bold', color: '#d32f2f', marginTop: '15px' }}>{message}</p>
    </div>
  );
}

export default Login;