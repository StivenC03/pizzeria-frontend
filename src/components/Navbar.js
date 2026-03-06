import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar({ loggedInUser, handleLogout }) {
  return (
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
  );
}

export default Navbar;