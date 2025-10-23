// src/pages/EmployeeInfo.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

function EmployeeInfo() {
  // const { id } = useParams();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [infoType, setInfoType] = useState('personnel');
  const [employee, setEmployee] = useState(null);

  // Données complètes des employés
  const employeesData = {
    1: {
      id: 1,
      matricule: 'EMP001',
      nom: 'Dupont',
      prenom: 'Jean',
      departement: 'IT',
      poste: 'Développeur Fullstack',
      // Informations personnelles
      personnel: {
        dateNaissance: '1990-05-15',
        lieuNaissance: 'Paris',
        nationalite: 'Française',
        situationFamiliale: 'Marié',
        enfants: 2,
        adresse: '123 Avenue des Champs-Élysées, 75008 Paris',
        telephonePerso: '+33 6 12 34 56 78',
        emailPerso: 'jean.dupont.perso@gmail.com'
      },
      // Informations administratives
      administratif: {
        numeroSecuriteSociale: '1 90 05 15 123 456 78',
        matriculeInterne: 'INT-2022-001',
        dateEmbauche: '2022-01-15',
        typeContrat: 'CDI',
        dureeContrat: 'Indéterminée',
        salaireBase: '45000 €',
        banque: 'BNP Paribas',
        iban: 'FR76 3000 4000 0100 1234 5678 900'
      },
      // Informations professionnelles
      professionnel: {
        posteActuel: 'Développeur Fullstack',
        departement: 'IT',
        manager: 'Sophie Laurent',
        datePromotion: '2023-06-01',
        ancienPoste: 'Développeur Frontend',
        competences: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
        formations: ['Certification AWS', 'Formation Agile'],
        evaluations: ['Excellente - 2023', 'Très bonne - 2022']
      }
    },
    2: {
      id: 2,
      matricule: 'EMP002',
      nom: 'Martin',
      prenom: 'Marie',
      departement: 'IT',
      poste: 'Développeur Fullstack',
      // Informations personnelles
      personnel: {
        dateNaissance: '1990-05-15',
        lieuNaissance: 'Paris',
        nationalite: 'Française',
        situationFamiliale: 'Marié',
        enfants: 2,
        adresse: '123 Avenue des Champs-Élysées, 75008 Paris',
        telephonePerso: '+33 6 12 34 56 78',
        emailPerso: 'jean.dupont.perso@gmail.com'
      },
      // Informations administratives
      administratif: {
        numeroSecuriteSociale: '1 90 05 15 123 456 78',
        matriculeInterne: 'INT-2022-001',
        dateEmbauche: '2022-01-15',
        typeContrat: 'CDI',
        dureeContrat: 'Indéterminée',
        salaireBase: '45000 €',
        banque: 'BNP Paribas',
        iban: 'FR76 3000 4000 0100 1234 5678 900'
      },
      // Informations professionnelles
      professionnel: {
        posteActuel: 'Développeur Fullstack',
        departement: 'IT',
        manager: 'Sophie Laurent',
        datePromotion: '2023-06-01',
        ancienPoste: 'Développeur Frontend',
        competences: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
        formations: ['Certification AWS', 'Formation Agile'],
        evaluations: ['Excellente - 2023', 'Très bonne - 2022']
      }
    }
  };

  useEffect(() => {
    // Récupérer le type d'info depuis la navigation
    const typeFromNav = location.state?.infoType || 'personnel';
    setInfoType(typeFromNav);
    
    // Récupérer les données de l'employé
    setEmployee(employeesData[id]);
  }, [id, location]);

  if (!employee) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning">Employé non trouvé</div>
      </div>
    );
  }

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
                  <p><strong>Date de naissance:</strong> {new Date(employee.personnel.dateNaissance).toLocaleDateString('fr-FR')}</p>
                  <p><strong>Lieu de naissance:</strong> {employee.personnel.lieuNaissance}</p>
                  <p><strong>Nationalité:</strong> {employee.personnel.nationalite}</p>
                  <p><strong>Situation familiale:</strong> {employee.personnel.situationFamiliale}</p>
                  <p><strong>Nombre d'enfants:</strong> {employee.personnel.enfants}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-header bg-info text-white">
                  <h5 className="card-title mb-0">Coordonnées</h5>
                </div>
                <div className="card-body">
                  <p><strong>Adresse:</strong> {employee.personnel.adresse}</p>
                  <p><strong>Téléphone personnel:</strong> {employee.personnel.telephonePerso}</p>
                  <p><strong>Email personnel:</strong> {employee.personnel.emailPerso}</p>
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
                  <h5 className="card-title mb-0">Informations Sociales</h5>
                </div>
                <div className="card-body">
                  <p><strong>Numéro de sécurité sociale:</strong> {employee.administratif.numeroSecuriteSociale}</p>
                  <p><strong>Matricule interne:</strong> {employee.administratif.matriculeInterne}</p>
                </div>
              </div>
              <div className="card mt-3">
                <div className="card-header bg-warning text-dark">
                  <h5 className="card-title mb-0">Contrat</h5>
                </div>
                <div className="card-body">
                  <p><strong>Date d'embauche:</strong> {new Date(employee.administratif.dateEmbauche).toLocaleDateString('fr-FR')}</p>
                  <p><strong>Type de contrat:</strong> {employee.administratif.typeContrat}</p>
                  <p><strong>Durée:</strong> {employee.administratif.dureeContrat}</p>
                  <p><strong>Salaire de base:</strong> {employee.administratif.salaireBase}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-header bg-warning text-dark">
                  <h5 className="card-title mb-0">Informations Bancaires</h5>
                </div>
                <div className="card-body">
                  <p><strong>Banque:</strong> {employee.administratif.banque}</p>
                  <p><strong>IBAN:</strong> {employee.administratif.iban}</p>
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
                  <h5 className="card-title mb-0">Poste Actuel</h5>
                </div>
                <div className="card-body">
                  <p><strong>Poste:</strong> {employee.professionnel.posteActuel}</p>
                  <p><strong>Département:</strong> {employee.professionnel.departement}</p>
                  <p><strong>Manager:</strong> {employee.professionnel.manager}</p>
                  <p><strong>Date de promotion:</strong> {new Date(employee.professionnel.datePromotion).toLocaleDateString('fr-FR')}</p>
                  <p><strong>Ancien poste:</strong> {employee.professionnel.ancienPoste}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-header bg-success text-white">
                  <h5 className="card-title mb-0">Compétences</h5>
                </div>
                <div className="card-body">
                  {employee.professionnel.competences.map((competence, index) => (
                    <span key={index} className="badge bg-primary me-1 mb-1">{competence}</span>
                  ))}
                </div>
              </div>
              <div className="card mt-3">
                <div className="card-header bg-success text-white">
                  <h5 className="card-title mb-0">Évaluations</h5>
                </div>
                <div className="card-body">
                  {employee.professionnel.evaluations.map((evaluation, index) => (
                    <p key={index} className="mb-1">{evaluation}</p>
                  ))}
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
        {/* Header avec navigation */}
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
                  <small className="text-muted ms-2">({employee.matricule})</small>
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

        {/* Contenu des informations */}
        {renderInfoContent()}
      </div>
    </div>
  );
}

export default EmployeeInfo;