import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Menu() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axios.get('https://pizzeria-backend-xbfp.onrender.com/api/menu')
      .then(response => {
        setMenu(response.data);
      })
      .catch(error => console.error("Errore nel recupero del menu:", error));
  }, []);

  // Separiamo i prodotti in base alla loro categoria
  const pizze = menu.filter(item => item.categoria === 'Pizze');
  const antipasti = menu.filter(item => item.categoria === 'Antipasti');
  const bevande = menu.filter(item => item.categoria === 'Bevande');

  return (
    <div>
      <h2 style={{ textAlign: 'center', color: '#333', fontSize: '2em' }}>Cosa vuoi mangiare oggi?</h2>
      
      {/* SEZIONE PIZZE (Con Immagini) */}
      <h3 className="categoria-titolo">🍕 Pizze Cotte a Legna</h3>
      <div className="menu-grid">
        {pizze.map(pizza => (
          <div key={pizza._id} className="menu-card">
            <img src={pizza.immagine} alt={pizza.nome} className="menu-img" />
            <div className="menu-info">
              <h4>{pizza.nome}</h4>
              <p>{pizza.descrizione}</p>
              <div className="prezzo">€ {pizza.prezzo.toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>

      {/* SEZIONE ANTIPASTI */}
      <h3 className="categoria-titolo">🍟 Fritti e Antipasti</h3>
      <ul className="menu-list">
        {antipasti.map(item => (
          <li key={item._id}>
            <div>
              <strong>{item.nome}</strong> <br/>
              <small style={{ color: '#666' }}>{item.descrizione}</small>
            </div>
            <div className="prezzo">€ {item.prezzo.toFixed(2)}</div>
          </li>
        ))}
      </ul>

      {/* SEZIONE BEVANDE */}
      <h3 className="categoria-titolo">🥤 Bevande</h3>
      <ul className="menu-list">
        {bevande.map(item => (
          <li key={item._id}>
            <div>
              <strong>{item.nome}</strong> <br/>
              <small style={{ color: '#666' }}>{item.descrizione}</small>
            </div>
            <div className="prezzo">€ {item.prezzo.toFixed(2)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;