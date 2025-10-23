// src/pages/Employees.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Employees() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const [searchTerm, setSearchTerm] = useState({
    matricule: '',
    nom: '',
    prenom: '',
    departement: '',
    poste: ''
  });

  // 🔹 Charger les employés depuis le backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/employes');
        setEmployees(response.data);
        // console.log("employe", response.data);
      } catch (error) {
        console.error(error);
        setMessage('❌ Erreur lors du chargement des employés');
      } finally {
        setLoading(false);
      }
    }; 
    fetchEmployees();
  }, []);

  // 🔹 Filtrage des employés
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matricule = emp.infosProfessionnelles?.matricule || '';
      const departement = emp.departement || '';
      const poste = emp.poste || '';

      return (
        matricule.toLowerCase().includes(searchTerm.matricule.toLowerCase()) &&
        emp.nom.toLowerCase().includes(searchTerm.nom.toLowerCase()) &&
        emp.prenom.toLowerCase().includes(searchTerm.prenom.toLowerCase()) &&
        departement.toLowerCase().includes(searchTerm.departement.toLowerCase()) &&
        poste.toLowerCase().includes(searchTerm.poste.toLowerCase())
      );
    });
  }, [employees, searchTerm]);

  const handleSearchChange = (field, value) => {
    setSearchTerm(prev => ({ ...prev, [field]: value }));
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
    navigate(`/dashboard-RH/employees/${employeeId}/${infoType}`);
  };

  const viewEmployeeDocuments = (employeeId) => {
    navigate(`/dashboard-RH/employees/${employeeId}/documents`);
  };

  if (loading) {
    return <div className="text-center mt-5">Chargement des employés...</div>;
  }

  if (message) {
    return <div className="alert alert-danger text-center mt-3">{message}</div>;
  }

  return (
    <div className="employees-page">
      <div className="container-fluid">
        <div className="row mb-4">
          <div className="col-12">
            <h1>Gestion des Employés</h1>
            <p className="text-muted">Recherchez et gérez les informations des employés</p>
          </div>
        </div>

        {/* Recherche */}
        <div className="card mb-4">
          <div className="card-header bg-primary text-white">
            <h3 className="card-title mb-0">
              <i className="bi bi-search me-2"></i>
              Recherche Multicritère
            </h3>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Matricule"
                  value={searchTerm.matricule}
                  onChange={(e) => handleSearchChange('matricule', e.target.value)}
                />
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nom"
                  value={searchTerm.nom}
                  onChange={(e) => handleSearchChange('nom', e.target.value)}
                />
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Prénom"
                  value={searchTerm.prenom}
                  onChange={(e) => handleSearchChange('prenom', e.target.value)}
                />
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Département"
                  value={searchTerm.departement}
                  onChange={(e) => handleSearchChange('departement', e.target.value)}
                />
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Poste"
                  value={searchTerm.poste}
                  onChange={(e) => handleSearchChange('poste', e.target.value)}
                />
              </div>
              <div className="col-md-2">
                <button className="btn btn-outline-secondary w-100" onClick={resetSearch}>
                  Réinitialiser
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tableau */}
        <div className="card">
          <div className="card-header bg-light">
            <h3 className="card-title mb-0">
              <i className="bi bi-people me-2"></i>
              Liste des Employés ({filteredEmployees.length})
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
                    <th>Contact d’urgence</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map(emp => (
                    <tr key={emp.id}>
                      <td>{emp.infosProfessionnelles?.matricule}</td>
                      <td>{emp.nom} {emp.prenom}</td>
                      <td>{emp.departement || '-'}</td>
                      <td>{emp.poste || '-'}</td>
                      <td><a href={`mailto:${emp.email}`}>{emp.email}</a></td>
                      <td>{emp.telephone}</td>
                      <td>{emp.infosProfessionnelles?.dateEmbauche ? new Date(emp.infosProfessionnelles.dateEmbauche).toLocaleDateString('fr-FR') : ''}</td>
                      <td>
                        {emp.emergencyContact
                          ? `${emp.emergencyContact.contact} (${emp.emergencyContact.email})`
                          : '-'}
                      </td>
                      <td>
                        <div className="btn-group-vertical btn-group-sm w-100">
                          <div className="btn-group">
                            <button className="btn btn-outline-info" onClick={() => viewEmployeeInfo(emp.id, 'personnel')}>Personnel</button>
                            <button className="btn btn-outline-warning" onClick={() => viewEmployeeInfo(emp.id, 'administratif')}>Admin</button>
                            <button className="btn btn-outline-success" onClick={() => viewEmployeeInfo(emp.id, 'professionnel')}>Pro</button>
                          </div>
                          <button className="btn btn-outline-primary" onClick={() => viewEmployeeDocuments(emp.id)}>Documents</button>
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
