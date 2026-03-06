import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Prenotazioni({ loggedInUser }) {
  const [prenotazioni, setPrenotazioni] = useState([]);
  const [data, setData] = useState('');
  const [orario, setOrario] = useState('20:00'); // Impostiamo le 20:00 come default
  const [persone, setPersone] = useState('');
  
  // Stati per messaggi di successo ed errore separati
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const dataDiOggi = new Date().toISOString().split('T')[0];

  const fetchPrenotazioni = () => {
    if (loggedInUser) {
      axios.get(`http://localhost:3001/api/prenotazioni/${loggedInUser}`)
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
    
    axios.post('http://localhost:3001/api/prenotazioni', {
      username: loggedInUser,
      data: data,
      orario: orario,
      persone: persone
    })
    .then(response => {
      setMessage(response.data.message);
      setData('');
      setOrario('20:00'); // Resetta l'orario
      setPersone('');
      fetchPrenotazioni();
      
      setTimeout(() => setMessage(''), 3000); 
    })
    .catch(error => {
      // Gestiamo l'errore che ci manda il backend (es. doppia prenotazione)
      if (error.response) {
        setErrorMsg(error.response.data.message);
        setTimeout(() => setErrorMsg(''), 4000); // Fa sparire l'errore dopo 4 secondi
      } else {
        setErrorMsg("Errore durante la connessione al server");
      }
    });
  };

  const handleCancella = (id) => {
    axios.delete(`https://pizzeria-backend-xbfp.onrender.com/api/prenotazioni/${id}`)
      .then(response => {
        fetchPrenotazioni(); 
      })
      .catch(error => console.error("Errore cancellazione:", error));
  };

  if (!loggedInUser) {
    return <h2>Devi effettuare il login per vedere questa pagina.</h2>;
  }

  return (
    <div>
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
            <label>Fascia Oraria (Turni di 1 ora): </label>
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

        {/* Messaggi di esito dinamici */}
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