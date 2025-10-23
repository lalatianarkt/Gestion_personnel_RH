// src/pages/Employees.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

function Employees() {
  const navigate = useNavigate();
  
  // Données exemple des employés
  const [employees] = useState([
    {

      // employee.personnel.dateNaissance
      // employee.personnel.lieuNaissance
      id: 1,
      matricule: 'EMP001',
      nom: 'Dupont',
      prenom: 'Jean',
      departement: 'IT',
      poste: 'Développeur Fullstack',
      email: 'jean.dupont@entreprise.com',
      telephone: '+33 1 23 45 67 89',
      dateEmbauche: '2022-01-15'
    },
    { 
      id: 2,
      matricule: 'EMP002',
      nom: 'Martin',
      prenom: 'Marie',
      departement: 'RH',
      poste: 'Responsable RH',
      email: 'marie.martin@entreprise.com',
      telephone: '+33 1 23 45 67 90',
      dateEmbauche: '2021-03-20'
    },
    {
      id: 3,
      matricule: 'EMP003',
      nom: 'Bernard',
      prenom: 'Pierre',
      departement: 'Finance',
      poste: 'Comptable',
      email: 'pierre.bernard@entreprise.com',
      telephone: '+33 1 23 45 67 91',
      dateEmbauche: '2020-11-10'
    }
  ]);

  // État pour la recherche
  const [searchTerm, setSearchTerm] = useState({
    matricule: '',
    nom: '',
    prenom: '',
    departement: '',
    poste: ''
  });

  // Filtrage des employés
  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      return (
        employee.matricule.toLowerCase().includes(searchTerm.matricule.toLowerCase()) &&
        employee.nom.toLowerCase().includes(searchTerm.nom.toLowerCase()) &&
        employee.prenom.toLowerCase().includes(searchTerm.prenom.toLowerCase()) &&
        employee.departement.toLowerCase().includes(searchTerm.departement.toLowerCase()) &&
        employee.poste.toLowerCase().includes(searchTerm.poste.toLowerCase())
      );
    });
  }, [employees, searchTerm]);

  const handleSearchChange = (field, value) => {
    setSearchTerm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetSearch = () => {
    setSearchTerm({
      matricule: '',
      nom: '',
      prenom: '',
      departement: '',
      poste: ''
    });
  };

  const viewEmployeeInfo = (employeeId, infoType) => {
    console.log("ato ah lalaTiananaa");
    navigate(`/dashboard-RH/employees/${employeeId}/personnel`, { 
      state: { infoType: infoType } 
    });
  };

  const viewEmployeeDocuments = (employeeId) => {
    navigate(`/dashboard-RH/employees/${employeeId}/documents`);
  };

  return (
    <div className="employees-page">
      <div className="container-fluid">
        <div className="row mb-4">
          <div className="col-12">
            <h1>Gestion des Employés</h1>
            <p className="text-muted">Recherchez et gérez les informations des employés</p>
          </div>
        </div>

        {/* Formulaire de recherche */}
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h3 className="card-title mb-0">
              <i className="bi bi-search me-2"></i>
              Recherche Multicritère
            </h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-2">
                <div className="form-group">
                  <label className="form-label">Matricule</label>
                  <input
                    type="text"
                    className="form-control"
                    value={searchTerm.matricule}
                    onChange={(e) => handleSearchChange('matricule', e.target.value)}
                    placeholder="EMP001..."
                  />
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <label className="form-label">Nom</label>
                  <input
                    type="text"
                    className="form-control"
                    value={searchTerm.nom}
                    onChange={(e) => handleSearchChange('nom', e.target.value)}
                    placeholder="Dupont..."
                  />
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <label className="form-label">Prénom</label>
                  <input
                    type="text"
                    className="form-control"
                    value={searchTerm.prenom}
                    onChange={(e) => handleSearchChange('prenom', e.target.value)}
                    placeholder="Jean..."
                  />
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <label className="form-label">Département</label>
                  <select
                    className="form-control"
                    value={searchTerm.departement}
                    onChange={(e) => handleSearchChange('departement', e.target.value)}
                  >
                    <option value="">Tous</option>
                    <option value="IT">IT</option>
                    <option value="RH">RH</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group">
                  <label className="form-label">Poste</label>
                  <input
                    type="text"
                    className="form-control"
                    value={searchTerm.poste}
                    onChange={(e) => handleSearchChange('poste', e.target.value)}
                    placeholder="Développeur..."
                  />
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group d-flex align-items-end">
                  <button 
                    className="btn btn-outline-secondary w-100"
                    onClick={resetSearch}
                  >
                    <i className="bi bi-arrow-clockwise me-1"></i>
                    Réinitialiser
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tableau des employés */}
        <div className="card mt-4">
          <div className="card-header bg-light">
            <h3 className="card-title mb-0">
              <i className="bi bi-people me-2"></i>
              Liste des Employés ({filteredEmployees.length} résultat(s))
            </h3>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped table-hover mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>Matricule</th>
                    <th>Nom & Prénom</th>
                    <th>Département</th>
                    <th>Poste</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                    <th>Date d'embauche</th>
                    <th width="200">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map(employee => (
                    <tr key={employee.id}>
                      <td>
                        <strong className="text-primary">{employee.matricule}</strong>
                      </td>
                      <td>
                        <strong>{employee.nom} {employee.prenom}</strong>
                      </td>
                      <td>
                        <span className="badge bg-info">{employee.departement}</span>
                      </td>
                      <td>{employee.poste}</td>
                      <td>
                        <a href={`mailto:${employee.email}`} className="text-decoration-none">
                          {employee.email}
                        </a>
                      </td>
                      <td>{employee.telephone}</td>
                      <td>{new Date(employee.dateEmbauche).toLocaleDateString('fr-FR')}</td>
                      <td>
                        <div className="btn-group-vertical btn-group-sm w-100">
                          <div className="btn-group">
                            <button
                              className="btn btn-outline-info"
                              onClick={() => viewEmployeeInfo(employee.id, 'personnel')}
                              title="Informations personnelles"
                            >
                              <i className="bi bi-person me-1"></i>Personnel
                            </button>
                            <button
                              className="btn btn-outline-warning"
                              onClick={() => viewEmployeeInfo(employee.id, 'administratif')}
                              title="Informations administratives"
                            >
                              <i className="bi bi-clipboard-data me-1"></i>Admin
                            </button>
                            <button
                              className="btn btn-outline-success"
                              onClick={() => viewEmployeeInfo(employee.id, 'professionnel')}
                              title="Informations professionnelles"
                            >
                              <i className="bi bi-briefcase me-1"></i>Pro
                            </button>
                          </div>
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => viewEmployeeDocuments(employee.id)}
                            title="Voir tous les documents"
                          >
                            <i className="bi bi-folder me-1"></i>Documents
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employees; 

