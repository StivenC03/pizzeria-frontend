import React from 'react';

function Home() {
  return (
    <div>
      <div className="home-header">
        <h1 style={{ color: '#d32f2f', fontSize: '2.5em', margin: '0 0 10px 0' }}>Benvenuti a Pizzeria Bella Napoli!</h1>
        <p style={{ fontSize: '1.2em', color: '#555' }}>
          La vera pizza artigianale, cotta nel forno a legna, ora anche online!
        </p>
      </div>

      <div className="info-section">
        <div className="info-box">
          <h3>📍 Dove Siamo</h3>
          <p>Corso Vittorio Emanuele, 1<br/>70125 Bari (BA)<br/>Italia</p>
        </div>
        
        <div className="info-box">
          <h3>🕒 Orari di Apertura</h3>
          <p><strong>Lun - Dom:</strong> 18:00 - 00:00<br/>
          <em>Martedì: Chiuso</em></p>
        </div>
        
        <div className="info-box">
          <h3>📞 Contatti</h3>
          <p><strong>Tel:</strong> 02 1234 5678<br/>
          <strong>Email:</strong> info@pizzeriabellanapoliofficial.it<br/>
          <strong>Instagram:</strong> @pizzeriabellanapoli_official</p>
        </div>
      </div>

      <div style={{ marginTop: '40px', textAlign: 'center', fontWeight: 'bold' }}>
        <p>Utilizza la barra in alto per sfogliare il nostro Menu o per accedere e prenotare un tavolo!</p>
      </div>
    </div>
  );
}

export default Home;