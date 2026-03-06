import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';

// Import Stili
import './styles/App.css'; 

// Import Componenti
import Navbar from './components/Navbar';

// Import Pagine
import Home from './pages/Home';
import Menu from './pages/Menu';
import Login from './pages/Login';
import Register from './pages/Register';
import Prenotazioni from './pages/Prenotazioni';

axios.defaults.withCredentials = true;

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    axios.get('https://pizzeria-backend-xbfp.onrender.com/api/check-session')
      .then(res => {
        if (res.data.loggedIn) setLoggedInUser(res.data.username);
      })
      .catch(() => setLoggedInUser(null));
  }, []);

  const handleLogout = () => {
    axios.post('https://pizzeria-backend-xbfp.onrender.com/api/logout')
      .then(() => {
        setLoggedInUser(null);
        window.location.href = '/login';
      });
  };

  return (
    <Router>
      <div>
        {/* Usiamo il nuovo componente Navbar */}
        <Navbar loggedInUser={loggedInUser} handleLogout={handleLogout} />
        
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