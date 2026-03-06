import React, { useState, useEffect } from 'react';
// Prima era: import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import axios from 'axios';
import './App.css'; 
import Home from './Home';
import Menu from './Menu';
import Login from './Login';
import Register from './Register';
import Prenotazioni from './Prenotazioni';

// Diciamo ad Axios di includere sempre i cookie in ogni richiesta!
axios.defaults.withCredentials = true;

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Al caricamento, chiediamo al server se abbiamo un cookie valido
  useEffect(() => {
  // Cambia l'URL con il tuo link di Render
  axios.get('https://pizzeria-backend-xbfp.onrender.com/api/check-session', { withCredentials: true })
    .then(res => {
      if (res.data.loggedIn) {
        setLoggedInUser(res.data.user);
      }
    })
    .catch(err => {
      console.log("Nessuna sessione attiva");
      setLoggedInUser(null);
    });
}, []);

  const handleLogout = () => {
    // Chiamiamo l'API di logout per distruggere il cookie nel backend
    axios.post('https://pizzeria-backend-xbfp.onrender.com/api/logout', { withCredentials: true })
      .then(() => {
        setLoggedInUser(null);
        window.location.href = '/login';
      });
  };

// ... IL RESTO DEL CODICE (il return con il <Router> ecc.) RIMANE IDENTICO A PRIMA

  return (
    <Router>
      <div>
        <nav className="navbar">
          <h2 style={{ color: 'white', margin: 0 }}>🍕 Pizzeria Bella Napoli</h2>
          <ul className="nav-links">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/menu">Menu</NavLink></li>
            
            {loggedInUser ? (
              <>
                <li><NavLink to="/prenotazioni">Le mie Prenotazioni</NavLink></li>
                <li><button onClick={handleLogout}>Logout ({loggedInUser})</button></li>
              </>
            ) : (
              <>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/register">Registrati</NavLink></li>
              </>
            )}
          </ul>
        </nav>
        
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/prenotazioni" element={<Prenotazioni loggedInUser={loggedInUser} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;