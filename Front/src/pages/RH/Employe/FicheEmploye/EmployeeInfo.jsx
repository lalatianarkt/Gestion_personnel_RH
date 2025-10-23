// src/pages/EmployeeInfo.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

function EmployeeInfo() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [infoType, setInfoType] = useState('personnel');
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Charger les données depuis le backend
  useEffect(() => {
    const typeFromNav = location.state?.infoType || 'personnel';
    setInfoType(typeFromNav);

    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/employes/${id}`);
        if (!response.ok) throw new Error("Erreur lors du chargement de l'employé");
        const data = await response.json();
        setEmployee(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id, location]);

  if (loading) {
    return (
      <div className="container-fluid text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning mt-4">Employé non trouvé</div>
      </div>
    );
  }

  // ✅ Affichage dynamique des sections selon le type sélectionné
  const renderInfoContent = () => {
    switch (infoType) {
      case 'personnel':
        return (
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header bg-info text-white">
                  <h5 className="card-title mb-0">État Civil</h5>
                </div>
                <div className="card-body">
                  <p><strong>Date de naissance:</strong> {employee.dateNaissance}</p>
                  <p><strong>Lieu de naissance:</strong> {employee.lieuNaissance}</p>
                  <p><strong>Nationalité:</strong> {employee.nationalite}</p>
                  <p><strong>Situation familiale:</strong> {employee.infosAdministratives?.situationFamiliale}</p>
                  <p><strong>Nombre d'enfants:</strong> {employee.infosAdministratives?.nombreEnfants}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card">
                <div className="card-header bg-info text-white">
                  <h5 className="card-title mb-0">Coordonnées</h5>
                </div>
                <div className="card-body">
                  <p><strong>Adresse:</strong> {employee.adresse}</p>
                  <p><strong>Téléphone:</strong> {employee.telephone}</p>
                  <p><strong>Email professionnel:</strong> {employee.email}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'administratif':
        return (
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header bg-warning text-dark">
                  <h5 className="card-title mb-0">Informations Administratives</h5>
                </div>
                <div className="card-body">
                  <p><strong>CIN:</strong> {employee.infosAdministratives?.cin}</p>
                  <p><strong>Numéro CNAPS:</strong> {employee.infosAdministratives?.numCnaps}</p>
                  <p><strong>Situation familiale:</strong> {employee.infosAdministratives?.situationFamiliale}</p>
                  <p><strong>Nombre d'enfants:</strong> {employee.infosAdministratives?.nombreEnfants}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'professionnel':
        return (
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header bg-success text-white">
                  <h5 className="card-title mb-0">Poste et Département</h5>
                </div>
                <div className="card-body">
                  <p><strong>Poste:</strong> {employee.poste}</p>
                  <p><strong>Département:</strong> {employee.departement}</p>
                  <p><strong>Date d'embauche:</strong> {employee.infosProfessionnelles?.dateEmbauche}</p>
                  <p><strong>Matricule:</strong> {employee.infosProfessionnelles?.matricule}</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Type d'information non reconnu</div>;
    }
  };

  return (
    <div className="employee-info-page">
      <div className="container-fluid">
        {/* Header */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <button 
                  className="btn btn-outline-secondary me-3"
                  onClick={() => navigate('/dashboard-RH/employees')}
                >
                  <i className="bi bi-arrow-left me-1"></i>Retour
                </button>
                <h1 className="d-inline-block mb-0">
                  {employee.prenom} {employee.nom}
                  <small className="text-muted ms-2">({employee.infosProfessionnelles?.matricule})</small>
                </h1>
              </div>
              <div className="btn-group">
                <button
                  className={`btn ${infoType === 'personnel' ? 'btn-info' : 'btn-outline-info'}`}
                  onClick={() => setInfoType('personnel')}
                >
                  Personnel
                </button>
                <button
                  className={`btn ${infoType === 'administratif' ? 'btn-warning' : 'btn-outline-warning'}`}
                  onClick={() => setInfoType('administratif')}
                >
                  Administratif
                </button>
                <button
                  className={`btn ${infoType === 'professionnel' ? 'btn-success' : 'btn-outline-success'}`}
                  onClick={() => setInfoType('professionnel')}
                >
                  Professionnel
                </button>
              </div>
            </div>
            <p className="text-muted mt-2">
              Informations {infoType === 'personnel' ? 'personnelles' : infoType === 'administratif' ? 'administratives' : 'professionnelles'}
            </p>
          </div>
        </div>

        {renderInfoContent()}
      </div>
    </div>
  );
}

export default EmployeeInfo;
