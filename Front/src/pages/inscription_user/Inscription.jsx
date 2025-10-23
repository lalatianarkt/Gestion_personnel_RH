import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import ici
import axios from 'axios';

const Inscription = () => {
  const navigate = useNavigate(); // ✅ Initialisation ici
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [typeUsers, setTypeUsers] = useState([]);
  const [selectedTypeUser, setSelectedTypeUser] = useState('');
  const [matricule, setMatricule] = useState('');
  const [message, setMessage] = useState('');

  // Récupération des type_user depuis le backend
  useEffect(() => {
    axios.get('http://localhost:8080/api/typeUsers')
      .then(response => {
        setTypeUsers(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des types d\'utilisateur:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Préparer l'objet à envoyer
    const newUser = {
      email,
      password,
      typeUser: { id: selectedTypeUser },
      employe: { infosProfessionnelles: { matricule } }
    };

    try {
      const response = await axios.post('http://localhost:8080/api/users/sendToken', newUser);
      setMessage('Inscription réussie !');
      // Reset du formulaire
      setEmail('');
      setPassword('');
      setSelectedTypeUser('');
      setMatricule('');

      // 🔁 Redirection vers la page de validation via JS natif
      window.location.href = `/inscription/validation?email=${encodeURIComponent(email)}`;

    } catch (error) {
      console.error(error);
      setMessage('Erreur lors de l\'inscription.');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '2rem' }}>
      <h2>Inscription Utilisateur</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Mot de passe:</label><br />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Type d'utilisateur:</label><br />
          <select
            value={selectedTypeUser}
            onChange={e => setSelectedTypeUser(e.target.value)}
            required
          >
            <option value="">-- Sélectionnez --</option>
            {typeUsers.map(type => (
              <option key={type.id} value={type.id}>{type.type}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Matricule employé:</label><br />
          <input
            type="text"
            value={matricule}
            onChange={e => setMatricule(e.target.value)}
            required
          />
        </div>

        <button type="submit">Confirmer</button>
      </form>
    </div>
  );
};

export default Inscription;
