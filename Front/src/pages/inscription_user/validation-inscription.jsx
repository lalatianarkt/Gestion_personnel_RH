import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ValidationInscription = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const emailFromQuery = queryParams.get('email'); // récupère l'email depuis l'URL

  const [email, setEmail] = useState(emailFromQuery || '');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEmailField, setShowEmailField] = useState(false);
  const [timer, setTimer] = useState(null); // timer en secondes

  // Compte à rebours du token
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Confirmer le token
  const handleConfirm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/api/users/confirmUser', {
        email,
        token
      });
      setMessage(response.data.message || '✅ Compte confirmé avec succès !');
      setTimer(null); // stoppe le timer après succès
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message
          ? `❌ ${error.response.data.message}`
          : '❌ Erreur lors de la validation.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Renvoyer le token
  const handleResend = async () => {
    if (!email) {
      setShowEmailField(true);
      setMessage("Veuillez saisir votre email pour renvoyer le code.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/users/sendToken', { email });
      setMessage(response.data.message || '📩 Un nouveau token vous a été envoyé par email.');
      setTimer(30); // démarre le compte à rebours de 30 secondes
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message
          ? `❌ ${error.response.data.message}`
          : "❌ Erreur lors de l'envoi du nouveau token."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '500px',
      margin: 'auto',
      padding: '2rem',
      border: '1px solid #ddd',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h2>Validation d'inscription</h2>
      <p>Entrez le code reçu par email pour activer votre compte.</p>

      {message && <p style={{ color: message.startsWith('❌') ? 'red' : 'green' }}>{message}</p>}

      {/* Affichage du timer si actif */}
      {timer !== null && timer > 0 && (
        <p style={{ fontWeight: 'bold' }}>⏳ Token valide encore : {timer} secondes</p>
      )}

      <form onSubmit={handleConfirm}>
        {showEmailField && (
          <div style={{ marginBottom: '1rem' }}>
            <label>Email :</label><br />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="Entrez votre email"
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </div>
        )}

        <div style={{ marginBottom: '1rem' }}>
          <label>Code de confirmation :</label><br />
          <input
            type="text"
            value={token}
            onChange={e => setToken(e.target.value)}
            required
            placeholder="Entrez le token reçu par email"
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            type="submit"
            disabled={loading || (timer !== null && timer === 0)}
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              padding: '0.6rem 1.2rem',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {loading ? 'Validation...' : 'Confirmer'}
          </button>

          <button
            type="button"
            onClick={handleResend}
            disabled={loading}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '0.6rem 1.2rem',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {loading ? 'Envoi...' : 'Renvoyer le code'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ValidationInscription;
