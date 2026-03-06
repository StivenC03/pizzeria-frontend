import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 1. DEFINISCI QUI IL TUO LINK DI RENDER (UNA VOLTA SOLA PER TUTTI)
const API_URL = "https://pizzeria-backend-xbfp.onrender.com"; 

function Prenotazioni({ loggedInUser }) {
  const [prenotazioni, setPrenotazioni] = useState([]);
  const [data, setData] = useState('');
  const [orario, setOrario] = useState('20:00');
  const [persone, setPersone] = useState('');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const dataDiOggi = new Date().toISOString().split('T')[0];

  // AGGIUNTO: withCredentials per mantenere il login
  const fetchPrenotazioni = () => {
    if (loggedInUser) {
      axios.get(`${API_URL}/api/prenotazioni/${loggedInUser}`, { withCredentials: true })
        .then(response => setPrenotazioni(response.data))
        .catch(error => console.error("Errore recupero prenotazioni:", error));
    }
  };

  useEffect(() => {
    fetchPrenotazioni();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInUser]);

  const handlePrenota = (e) => {
    e.preventDefault();
    setMessage('');
    setErrorMsg('');
    
    // AGGIUNTO: withCredentials e URL corretto
    axios.post(`${API_URL}/api/prenotazioni`, {
      username: loggedInUser,
      data: data,
      orario: orario,
      persone: persone
    }, { withCredentials: true })
    .then(response => {
      setMessage(response.data.message);
      setData('');
      setOrario('20:00');
      setPersone('');
      fetchPrenotazioni();
      setTimeout(() => setMessage(''), 3000); 
    })
    .catch(error => {
      if (error.response) {
        setErrorMsg(error.response.data.message);
        setTimeout(() => setErrorMsg(''), 4000);
      } else {
        setErrorMsg("Errore durante la connessione al server");
      }
    });
  };

  const handleCancella = (id) => {
    // AGGIUNTO: withCredentials e URL corretto
    axios.delete(`${API_URL}/api/prenotazioni/${id}`, { withCredentials: true })
      .then(response => {
        fetchPrenotazioni(); 
      })
      .catch(error => console.error("Errore cancellazione:", error));
  };

  if (!loggedInUser) {
    return <h2 style={{color: 'black', textAlign: 'center', marginTop: '50px'}}>Devi effettuare il login per vedere questa pagina.</h2>;
  }

  return (
    <div className="container">
      <h2>Benvenuto/a, {loggedInUser}!</h2>
      <p>Gestisci qui le tue prenotazioni.</p>
      
      <div className="card" style={{ flexDirection: 'column', alignItems: 'flex-start', marginBottom: '30px' }}>
        <h3>Nuova Prenotazione</h3>
        <form onSubmit={handlePrenota} style={{ width: '100%' }}>
          
          <div className="form-group">
            <label>Data della prenotazione: </label>
            <input 
              type="date" 
              value={data} 
              min={dataDiOggi} 
              onChange={(e) => setData(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Fascia Oraria: </label>
            <select 
              value={orario} 
              onChange={(e) => setOrario(e.target.value)} 
              required
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="18:00">18:00 - 19:00</option>
              <option value="19:00">19:00 - 20:00</option>
              <option value="20:00">20:00 - 21:00</option>
              <option value="21:00">21:00 - 22:00</option>
              <option value="22:00">22:00 - 23:00</option>
              <option value="23:00">23:00 - 00:00</option>
            </select>
          </div>

          <div className="form-group">
            <label>Numero di persone: </label>
            <input 
              type="number" 
              min="1" 
              value={persone} 
              onChange={(e) => setPersone(e.target.value)} 
              required 
            />
          </div>
          
          <button type="submit" className="btn">Prenota Tavolo</button>
        </form>

        {message && <p style={{ color: 'green', marginTop: '15px', fontWeight: 'bold' }}>{message}</p>}
        {errorMsg && <p style={{ color: '#d32f2f', marginTop: '15px', fontWeight: 'bold' }}>{errorMsg}</p>}
      </div>

      <h3>Le tue prenotazioni attive:</h3>
      {prenotazioni.length === 0 ? (
        <p>Non hai ancora effettuato prenotazioni.</p>
      ) : (
        prenotazioni.map((pren) => (
          <div key={pren._id} className="card">
            <div>
              <strong>Data:</strong> {pren.data} <br/>
              <strong>Orario:</strong> {pren.orario} <br/>
              <strong>Persone:</strong> {pren.persone}
            </div>
            <button className="btn btn-danger" onClick={() => handleCancella(pren._id)}>Cancella</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Prenotazioni;