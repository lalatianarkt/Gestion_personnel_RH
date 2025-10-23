// src/pages/EmployeeDocuments.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EmployeeDocuments() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Données des documents
  const documentsData = {
    1: {
      id: 1,
      matricule: 'EMP001',
      nom: 'Dupont',
      prenom: 'Jean',
      documents: {
        cv: {
          name: 'CV_Jean_Dupont.pdf',
          date: '2024-01-15',
          size: '2.4 MB',
          type: 'cv'
        },
        contrat: {
          name: 'Contrat_CDI_Jean_Dupont.pdf',
          date: '2022-01-15',
          size: '1.8 MB',
          type: 'contrat'
        },
        diplomes: [
          {
            name: 'Diplome_Ingenieur_Informatique.pdf',
            date: '2015-06-30',
            size: '3.2 MB',
            type: 'diplome'
          },
          {
            name: 'Certification_React_Avance.pdf',
            date: '2023-03-15',
            size: '1.1 MB',
            type: 'diplome'
          }
        ],
        attestations: [
          {
            name: 'Attestation_Emploi_2024.pdf',
            date: '2024-01-10',
            size: '0.8 MB',
            type: 'attestation'
          },
          {
            name: 'Attestation_Formation_Agile.pdf',
            date: '2023-09-20',
            size: '1.2 MB',
            type: 'attestation'
          }
        ]
      }
    }
    // ... données pour les autres employés
  };

  useEffect(() => {
    setEmployee(documentsData[id]);
  }, [id]);

  if (!employee) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning">Employé non trouvé</div>
      </div>
    );
  }

  const handleDownload = (document) => {
    // Simulation de téléchargement
    console.log('Téléchargement:', document.name);
    // Ici, vous intégreriez votre logique de téléchargement réelle
  };

  const handleView = (document) => {
    // Ouvrir le PDF dans un nouvel onglet
    window.open(`/documents/${document.name}`, '_blank');
  };

  const getAllDocuments = () => {
    const allDocs = [];
    if (employee.documents.cv) allDocs.push({ ...employee.documents.cv, category: 'CV' });
    if (employee.documents.contrat) allDocs.push({ ...employee.documents.contrat, category: 'Contrat' });
    if (employee.documents.diplomes) allDocs.push(...employee.documents.diplomes.map(doc => ({ ...doc, category: 'Diplôme' })));
    if (employee.documents.attestations) allDocs.push(...employee.documents.attestations.map(doc => ({ ...doc, category: 'Attestation' })));
    
    return allDocs.filter(doc => 
      selectedCategory === 'all' || doc.type === selectedCategory
    );
  };

  const documents = getAllDocuments();

  return (
    <div className="employee-documents-page">
      <div className="container-fluid">
        {/* Header */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <button 
                  className="btn btn-outline-secondary me-3"
                  onClick={() => navigate('/employees')}
                >
                  <i className="bi bi-arrow-left me-1"></i>Retour
                </button>
                <h1 className="d-inline-block mb-0">
                  Documents de {employee.prenom} {employee.nom}
                  <small className="text-muted ms-2">({employee.matricule})</small>
                </h1>
              </div>
              <div className="btn-group">
                <button
                  className={`btn ${selectedCategory === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setSelectedCategory('all')}
                >
                  Tous
                </button>
                <button
                  className={`btn ${selectedCategory === 'cv' ? 'btn-info' : 'btn-outline-info'}`}
                  onClick={() => setSelectedCategory('cv')}
                >
                  CV
                </button>
                <button
                  className={`btn ${selectedCategory === 'contrat' ? 'btn-warning' : 'btn-outline-warning'}`}
                  onClick={() => setSelectedCategory('contrat')}
                >
                  Contrats
                </button>
                <button
                  className={`btn ${selectedCategory === 'diplome' ? 'btn-success' : 'btn-outline-success'}`}
                  onClick={() => setSelectedCategory('diplome')}
                >
                  Diplômes
                </button>
                <button
                  className={`btn ${selectedCategory === 'attestation' ? 'btn-secondary' : 'btn-outline-secondary'}`}
                  onClick={() => setSelectedCategory('attestation')}
                >
                  Attestations
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des documents */}
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header bg-light">
                <h5 className="card-title mb-0">
                  <i className="bi bi-folder me-2"></i>
                  Documents ({documents.length})
                </h5>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-dark">
                      <tr>
                        <th>Nom du document</th>
                        <th>Type</th>
                        <th>Date</th>
                        <th>Taille</th>
                        <th width="150">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documents.map((document, index) => (
                        <tr key={index}>
                          <td>
                            <i className="bi bi-file-earmark-pdf text-danger me-2"></i>
                            {document.name}
                          </td>
                          <td>
                            <span className={`badge ${
                              document.type === 'cv' ? 'bg-info' :
                              document.type === 'contrat' ? 'bg-warning' :
                              document.type === 'diplome' ? 'bg-success' : 'bg-secondary'
                            }`}>
                              {document.category}
                            </span>
                          </td>
                          <td>{new Date(document.date).toLocaleDateString('fr-FR')}</td>
                          <td>{document.size}</td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button
                                className="btn btn-outline-primary"
                                onClick={() => handleView(document)}
                                title="Voir le document"
                              >
                                <i className="bi bi-eye"></i>
                              </button>
                              <button
                                className="btn btn-outline-success"
                                onClick={() => handleDownload(document)}
                                title="Télécharger"
                              >
                                <i className="bi bi-download"></i>
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
      </div>
    </div>
  );
}

export default EmployeeDocuments;