import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('employee'); // optionnel si tu gères différents types
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const user = { email, password, userType, rememberMe };

    try {
      const response = await axios.post('http://localhost:8080/api/users/auth', user);

      if(response.data.token){
      // // exemple : le backend renvoie un token ou un message
      // if (response.data.token) {
      //   // tu peux stocker le token dans localStorage ou cookie si rememberMe
      //   if (rememberMe) {
      //     localStorage.setItem('token', response.data.token);
      //   } else {
      //     sessionStorage.setItem('token', response.data.token);
      //   }
      console.log("atoooooooo++++++++++++");
      // console.log(response.data);
        // 🔁 Redirection vers la page de validation via JS natif
        window.location.href = response.data.path;
        setMessage('✅ Connexion réussie !');
        // redirection vers dashboard
        // navigate('/dashboard');
      } else {
        setMessage(response.data.message || '✅ Connexion réussie !');
      }
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message
          ? `❌ ${error.response.data.message}`
          : '❌ Erreur lors de la connexion.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page bg-body-secondary">
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="card-header">
            <a href="/" className="link-dark text-center link-offset-2 link-opacity-100 link-opacity-50-hover">
              <h1 className="mb-0"><b>HR</b> Management</h1>
            </a>
          </div>
          <div className="card-body login-card-body">
            <p className="login-box-msg">Connectez-vous à votre espace</p>

            {message && <p style={{ color: message.startsWith('❌') ? 'red' : 'green' }}>{message}</p>}

            <form onSubmit={handleSubmit}>
              {/* Champ email */}
              <div className="input-group mb-3">
                <div className="form-floating">
                  <input
                    id="loginEmail"
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemple@entreprise.com"
                    required
                  />
                  <label htmlFor="loginEmail">Email professionnel</label>
                </div>
                <div className="input-group-text">
                  <span className="bi bi-envelope"></span>
                </div>
              </div>

              {/* Champ mot de passe */}
              <div className="input-group mb-3">
                <div className="form-floating">
                  <input
                    id="loginPassword"
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                  <label htmlFor="loginPassword">Mot de passe</label>
                </div>
                <div className="input-group-text">
                  <span className="bi bi-lock-fill"></span>
                </div>
              </div>

              {/* Ligne remember me + connexion */}
              <div className="row">
                <div className="col-8 d-inline-flex align-items-center">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexCheckDefault"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                      Se souvenir de moi
                    </label>
                  </div>
                </div>
                <div className="col-4">
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? 'Connexion...' : 'Se connecter'}
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Séparateur */}
            <div className="social-auth-links text-center mb-3 d-grid gap-2">
              <p>- OU -</p>
            </div>

            {/* Liens utiles */}
            <p className="mb-1">
              <a href="/forgot-password">Mot de passe oublié ?</a>
            </p>
            <p className="mb-0">
              <a href="/inscription" className="text-center">
                Demander un compte
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
