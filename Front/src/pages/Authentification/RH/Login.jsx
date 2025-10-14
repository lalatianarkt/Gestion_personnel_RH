import React, { useState } from 'react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('employee');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Tentative de connexion:', { email, password, userType, rememberMe });
    
    // Redirection basée sur le type d'utilisateur
    switch(userType) {
      case 'rh':
        window.location.href = '/rh-dashboard';
        break;
      case 'manager':
        window.location.href = '/manager-dashboard';
        break;
      case 'employee':
        window.location.href = '/employee-dashboard';
        break;
      default:
        window.location.href = '/dashboard';
    }
  };

  return (
    <div className="login-page bg-body-secondary">
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="card-header">
            <a
              href="/"
              className="link-dark text-center link-offset-2 link-opacity-100 link-opacity-50-hover"
            >
              <h1 className="mb-0"><b>HR</b> Management</h1>
            </a>
          </div>
          <div className="card-body login-card-body">
            <p className="login-box-msg">Connectez-vous à votre espace</p>
            
            <form onSubmit={handleSubmit}>
              {/* Sélecteur du type d'utilisateur */}
              <div className="input-group mb-3">
                <div className="form-floating w-100">
                  <select
                    id="userType"
                    className="form-control"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    required
                  >
                    <option value="employee">Employé</option>
                    <option value="manager">Manager</option>
                    <option value="rh">Responsable RH</option>
                  </select>
                  <label htmlFor="userType">Type d'utilisateur</label>
                </div>
              </div>
              
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
                    <button type="submit" className="btn btn-primary">
                      Se connecter
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
              <a href="/register" className="text-center">
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