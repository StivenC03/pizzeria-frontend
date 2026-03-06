import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:3001/api/register', { username, password })
      .then(response => {
        setMessage(response.data.message);
        setUsername('');
        setPassword('');
      })
      .catch(error => {
        if (error.response) {
          setMessage(error.response.data.message);
        }
      });
  };

  return (
    <div className="card" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
      <h2>Registrati al nostro sito</h2>
      <form onSubmit={handleRegister} style={{ width: '100%' }}>
        <div className="form-group">
          <label>Scegli un Username: </label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required
          />
        </div>
        <div className="form-group">
          <label>Scegli una Password: </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </div>
        <button type="submit" className="btn">Registrati</button>
      </form>
      <p style={{ fontWeight: 'bold', color: '#d32f2f', marginTop: '15px' }}>{message}</p>
    </div>
  );
}

export default Register;