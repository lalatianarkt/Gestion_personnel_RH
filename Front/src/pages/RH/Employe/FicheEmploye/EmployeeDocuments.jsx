// src/pages/EmployeeDocuments.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EmployeeDocuments() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer les documents depuis l'API
  useEffect(() => {
    const fetchEmployeeDocuments = async () => {
      try {
        setLoading(true);
        // Récupérer les documents de l'employé
        const response = await axios.get(`http://localhost:8080/api/documents/employe/${id}`);
        const documentsData = response.data;

        if (documentsData.length > 0) {
          // Prendre le premier document pour récupérer les infos de l'employé
          const firstDocument = documentsData[0];
          setEmployee({
            id: firstDocument.employe.id,
            nom: firstDocument.employe.nom,
            prenom: firstDocument.employe.prenom,
            matricule: firstDocument.employe.infosProfessionnelles?.matricule || 'N/A'
          });
        } else {
          // Si aucun document, récupérer les infos de l'employé depuis une autre API
          try {
            const empResponse = await axios.get(`http://localhost:8080/api/employes/${id}`);
            const empData = empResponse.data;
            setEmployee({
              id: empData.id,
              nom: empData.nom,
              prenom: empData.prenom,
              matricule: empData.infosProfessionnelles?.matricule || 'N/A'
            });
          } catch (empError) {
            console.error('Erreur lors de la récupération des infos employé:', empError);
          }
        }

        setDocuments(documentsData);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des documents:', err);
        setError('Erreur lors du chargement des documents');
        setLoading(false);
      }
    };

    fetchEmployeeDocuments();
  }, [id]);

  // Télécharger un document
  const handleDownload = async (document) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/documents/download/${document.id}`, {
        responseType: 'blob'
      });
      
      // Créer un URL pour le blob et déclencher le téléchargement
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', document.nomFichier);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Erreur lors du téléchargement:', err);
      alert('Erreur lors du téléchargement du document');
    }
  };

  // Voir un document
  const handleView = async (document) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/documents/view/${document.id}`, {
        responseType: 'blob'
      });
      
      // Créer un URL pour le blob et l'ouvrir dans un nouvel onglet
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
      
      // Nettoyer l'URL après un délai
      setTimeout(() => window.URL.revokeObjectURL(url), 100);
    } catch (err) {
      console.error('Erreur lors de l\'ouverture du document:', err);
      alert('Erreur lors de l\'ouverture du document');
    }
  };

  // Formater la taille du fichier
  const formatFileSize = (bytes) => {
    if (!bytes) return 'N/A';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  // Filtrer les documents par catégorie
  const getFilteredDocuments = () => {
    if (selectedCategory === 'all') {
      return documents;
    }
    
    return documents.filter(doc => {
      const typeIntitule = doc.typeDocument?.intitule?.toLowerCase() || '';
      
      switch (selectedCategory) {
        case 'cv':
          return typeIntitule.includes('cv');
        case 'contrat':
          return typeIntitule.includes('contrat');
        case 'diplome':
          return typeIntitule.includes('diplôme') || typeIntitule.includes('diplome');
        case 'attestation':
          return typeIntitule.includes('attestation');
        default:
          return true;
      }
    });
  };

  const filteredDocuments = getFilteredDocuments();

  if (loading) {
    return (
      <div className="container-fluid">
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
          <span className="ms-3">Chargement des documents...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid">
        <div className="alert alert-danger">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning">
          <i className="bi bi-person-x me-2"></i>
          Employé non trouvé
        </div>
      </div>
    );
  }

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
                  onClick={() => navigate('/dashboard-RH/employees')}
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
                  Documents ({filteredDocuments.length})
                </h5>
              </div>
              <div className="card-body p-0">
                {filteredDocuments.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="bi bi-folder-x display-4 text-muted"></i>
                    <p className="mt-3 text-muted">Aucun document trouvé</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-dark">
                        <tr>
                          <th>Nom du document</th>
                          <th>Type</th>
                          <th>Date d'upload</th>
                          <th>Taille</th>
                          <th width="150">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDocuments.map((document) => (
                          <tr key={document.id}>
                            <td>
                              <i className="bi bi-file-earmark-pdf text-danger me-2"></i>
                              {document.nomFichier}
                            </td>
                            <td>
                              <span className={`badge ${
                                document.typeDocument?.intitule?.toLowerCase().includes('cv') ? 'bg-info' :
                                document.typeDocument?.intitule?.toLowerCase().includes('contrat') ? 'bg-warning' :
                                document.typeDocument?.intitule?.toLowerCase().includes('diplôme') || 
                                document.typeDocument?.intitule?.toLowerCase().includes('diplome') ? 'bg-success' : 'bg-secondary'
                              }`}>
                                {document.typeDocument?.intitule || 'Non classé'}
                              </span>
                            </td>
                            <td>
                              {new Date(document.dateUpload).toLocaleDateString('fr-FR')}
                              <br />
                              <small className="text-muted">
                                {new Date(document.dateUpload).toLocaleTimeString('fr-FR')}
                              </small>
                            </td>
                            <td>
                              {/* Note: Vous devrez peut-être ajouter un champ taille dans votre entité */}
                              {formatFileSize(document.fileSize)}
                            </td>
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDocuments;