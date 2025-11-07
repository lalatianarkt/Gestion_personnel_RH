// src/pages/EmployeeInfo.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EmployeeInfo() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [infoType, setInfoType] = useState('personnel');
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // États pour les modals d'édition
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [currentEditType, setCurrentEditType] = useState('');

  // ✅ Charger les données depuis le backend
  useEffect(() => {
    const typeFromNav = location.state?.infoType || 'personnel';
    setInfoType(typeFromNav);

    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/employes/${id}`);
        setEmployeeData(response.data);
        console.log("Données employé reçues:", response.data);
      } catch (error) {
        console.error("Erreur lors du chargement de l'employé:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id, location]);

  // ✅ CORRECTION : Fonction optimisée pour gérer les changements
  const handleInputChange = (field, value) => {
    // Mise à jour synchrone avec fonction callback
    setEditData(prevData => {
      const newData = {
        ...prevData,
        [field]: value
      };
      return newData;
    });
  };

  // ✅ Fonction pour ouvrir le modal d'édition selon le type
  const openEditModal = (type) => {
    setCurrentEditType(type);
    
    let initialData = {};
    
    switch (type) {
      case 'personnel':
        initialData = {
          nom: employeeData.employe.nom || '',
          prenom: employeeData.employe.prenom || '',
          dateNaissance: employeeData.employe.dateNaissance || '',
          lieuNaissance: employeeData.employe.lieuNaissance || '',
          telephone: employeeData.employe.telephone || '',
          email: employeeData.employe.email || '',
          adresse: employeeData.employe.adresse || '',
          nomMere: employeeData.employe.nomMere || '',
          nomPere: employeeData.employe.nomPere || '',
          matricule: employeeData.employe.matricule || ''
        };
        break;
      
      case 'administratif':
        initialData = {
          cin: employeeData.employe.infosAdministratives?.cin || '',
          numCnaps: employeeData.employe.infosAdministratives?.numCnaps || '',
          nombreEnfants: employeeData.employe.infosAdministratives?.nombreEnfants || 0,
          situationFamilialeId: employeeData.employe.infosAdministratives?.situationFamiliale?.id || ''
        };
        break;
      
      case 'professionnel':
        initialData = {
          dateEmbauche: employeeData.infosProfessionnelles?.dateEmbauche || '',
          posteId: employeeData.infosProfessionnelles?.poste?.id || '',
          departementId: employeeData.infosProfessionnelles?.departement?.id || '',
          typeContratId: employeeData.infosProfessionnelles?.typeContrat?.id || '',
          managerId: employeeData.infosProfessionnelles?.manager?.id || ''
        };
        break;
      
      case 'contact':
        initialData = {
          nom: employeeData.employe.emergencyContact?.nom || '',
          contact: employeeData.employe.emergencyContact?.contact || '',
          email: employeeData.employe.emergencyContact?.email || '',
          adresse: employeeData.employe.emergencyContact?.adresse || ''
        };
        break;
      
      default:
        break;
    }
    
    // Réinitialiser complètement l'état
    setEditData(initialData);
    setEditModal(true);
  };

  // ✅ Fonction de sauvegarde unique
  const saveInfo = async () => {
    try {
      switch (currentEditType) {
        case 'personnel':
          await axios.put(`http://localhost:8080/api/employes/${id}`, editData);
          setEmployeeData(prev => ({
            ...prev,
            employe: { ...prev.employe, ...editData }
          }));
          break;
        
        case 'administratif':
          await axios.put(`http://localhost:8080/api/infos-administratives/${employeeData.employe.infosAdministratives.id}`, editData);
          setEmployeeData(prev => ({
            ...prev,
            employe: {
              ...prev.employe,
              infosAdministratives: { ...prev.employe.infosAdministratives, ...editData }
            }
          }));
          break;
        
        case 'professionnel':
          await axios.put(`http://localhost:8080/api/infos-professionnelles/${employeeData.infosProfessionnelles.id}`, editData);
          setEmployeeData(prev => ({
            ...prev,
            infosProfessionnelles: { ...prev.infosProfessionnelles, ...editData }
          }));
          break;
        
        case 'contact':
          await axios.put(`http://localhost:8080/api/emergency-contact/${employeeData.employe.emergencyContact.id}`, editData);
          setEmployeeData(prev => ({
            ...prev,
            employe: {
              ...prev.employe,
              emergencyContact: { ...prev.employe.emergencyContact, ...editData }
            }
          }));
          break;
        
        default:
          break;
      }
      
      setEditModal(false);
      alert(`✅ Informations ${getEditTypeLabel()} modifiées avec succès`);
    } catch (error) {
      console.error(`Erreur modification ${currentEditType}:`, error);
      alert('❌ Erreur lors de la modification');
    }
  };

  // ✅ Fonction utilitaire pour obtenir le libellé du type d'édition
  const getEditTypeLabel = () => {
    switch (currentEditType) {
      case 'personnel': return 'personnelles';
      case 'administratif': return 'administratives';
      case 'professionnel': return 'professionnelles';
      case 'contact': return 'du contact d\'urgence';
      default: return '';
    }
  };

  // ✅ Fonction utilitaire pour afficher les valeurs d'objets imbriqués
  const safeDisplay = (obj, property, subProperty = null) => {
    if (!obj || obj[property] === undefined || obj[property] === null) return 'N/A';
    
    if (subProperty && obj[property] && obj[property][subProperty] !== undefined) {
      return obj[property][subProperty];
    }
    
    if (typeof obj[property] === 'object') {
      return obj[property].type || obj[property].sexe || obj[property].nationalite || obj[property].nom || 'N/A';
    }
    
    return obj[property];
  };

  if (loading) {
    return (
      <div className="container-fluid text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  if (!employeeData || !employeeData.employe) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning mt-4">Employé non trouvé</div>
      </div>
    );
  }

  const employe = employeeData.employe;
  const infosPro = employeeData.infosProfessionnelles;

  // ✅ Affichage dynamique des sections selon le type sélectionné
  const renderInfoContent = () => {
    switch (infoType) {
      case 'personnel':
        return (
          <div className="row">
            <div className="col-12 mb-3">
              <div className="d-flex justify-content-end">
                <button className="btn btn-primary" onClick={() => openEditModal('personnel')}>
                  ✏️ Modifier les informations personnelles
                </button>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="card">
                <div className="card-header bg-info text-white">
                  <h5 className="card-title mb-0">État Civil</h5>
                </div>
                <div className="card-body">
                  <p><strong>Nom:</strong> {employe.nom || 'N/A'}</p>
                  <p><strong>Prénom:</strong> {employe.prenom || 'N/A'}</p>
                  <p><strong>Date de naissance:</strong> {employe.dateNaissance || 'N/A'}</p>
                  <p><strong>Lieu de naissance:</strong> {employe.lieuNaissance || 'N/A'}</p>
                  <p><strong>Nationalité:</strong> {safeDisplay(employe, 'nationalite', 'nationalite')}</p>
                  <p><strong>Sexe:</strong> {safeDisplay(employe, 'sexe', 'sexe')}</p>
                  <p><strong>Situation familiale:</strong> {safeDisplay(employe.infosAdministratives?.situationFamiliale, 'type')}</p>
                  <p><strong>Nombre d'enfants:</strong> {employe.infosAdministratives?.nombreEnfants ?? 'N/A'}</p>
                  <p><strong>Nom de la mère:</strong> {employe.nomMere || 'N/A'}</p>
                  <p><strong>Nom du père:</strong> {employe.nomPere || 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card">
                <div className="card-header bg-info text-white">
                  <h5 className="card-title mb-0">Coordonnées</h5>
                </div>
                <div className="card-body">
                  <p><strong>Matricule:</strong> {employe.matricule || 'N/A'}</p>
                  <p><strong>Adresse:</strong> {employe.adresse || 'N/A'}</p>
                  <p><strong>Téléphone:</strong> {employe.telephone || 'N/A'}</p>
                  <p><strong>Email:</strong> {employe.email || 'N/A'}</p>
                </div>
              </div>
              
              {/* Contact d'urgence */}
              <div className="card mt-3">
                <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">Contact d'urgence</h5>
                  <button className="btn btn-sm btn-light" onClick={() => openEditModal('contact')}>
                    ✏️ Modifier
                  </button>
                </div>
                <div className="card-body">
                  <p><strong>Nom:</strong> {employe.emergencyContact?.nom || 'N/A'}</p>
                  <p><strong>Téléphone:</strong> {employe.emergencyContact?.contact || 'N/A'}</p>
                  <p><strong>Email:</strong> {employe.emergencyContact?.email || 'N/A'}</p>
                  <p><strong>Adresse:</strong> {employe.emergencyContact?.adresse || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'administratif':
        return (
          <div className="row">
            <div className="col-12 mb-3">
              <div className="d-flex justify-content-end">
                <button className="btn btn-warning" onClick={() => openEditModal('administratif')}>
                  ✏️ Modifier les informations administratives
                </button>
              </div>
            </div>
            
            <div className="col-md-8">
              <div className="card">
                <div className="card-header bg-warning text-dark">
                  <h5 className="card-title mb-0">Informations Administratives</h5>
                </div>
                <div className="card-body">
                  <p><strong>CIN:</strong> {employe.infosAdministratives?.cin || 'N/A'}</p>
                  <p><strong>Numéro CNAPS:</strong> {employe.infosAdministratives?.numCnaps || 'N/A'}</p>
                  <p><strong>Situation familiale:</strong> {safeDisplay(employe.infosAdministratives?.situationFamiliale, 'type')}</p>
                  <p><strong>Nombre d'enfants:</strong> {employe.infosAdministratives?.nombreEnfants ?? 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'professionnel':
        return (
          <div className="row">
            <div className="col-12 mb-3">
              <div className="d-flex justify-content-end">
                <button className="btn btn-success" onClick={() => openEditModal('professionnel')}>
                  ✏️ Modifier les informations professionnelles
                </button>
              </div>
            </div>
            
            <div className="col-md-8">
              <div className="card">
                <div className="card-header bg-success text-white">
                  <h5 className="card-title mb-0">Informations Professionnelles</h5>
                </div>
                <div className="card-body">
                  <p><strong>Date d'embauche:</strong> {infosPro?.dateEmbauche || 'N/A'}</p>
                  <p><strong>Poste:</strong> {infosPro?.poste?.nom || 'N/A'}</p>
                  <p><strong>Département:</strong> {infosPro?.departement?.nom || 'N/A'}</p>
                  <p><strong>Type de contrat:</strong> {infosPro?.typeContrat?.intitule || 'N/A'}</p>
                  <p><strong>Manager:</strong> {infosPro?.manager ? `${infosPro.manager.employe?.prenom} ${infosPro.manager.employe?.nom}` : 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div className="alert alert-warning">Type d'information non reconnu</div>;
    }
  };

  // ✅ Composant modal d'édition unique - CORRECTION COMPLÈTE
  // ✅ COMPOSANT EDITMODAL CORRIGÉ - REMPLACEZ LE COMPOSANT EXISTANT
const EditModal = () => {
  const [localData, setLocalData] = useState(editData);
  
  // ✅ CORRECTION : Références séparées pour chaque type de formulaire
  const personnelInputRef = useRef(null);
  const adminInputRef = useRef(null);
  const proInputRef = useRef(null);
  const contactInputRef = useRef(null);

  // ✅ Obtenir la référence appropriée selon le type
  const getCurrentInputRef = () => {
    switch (currentEditType) {
      case 'personnel': return personnelInputRef;
      case 'administratif': return adminInputRef;
      case 'professionnel': return proInputRef;
      case 'contact': return contactInputRef;
      default: return { current: null };
    }
  };

  // ✅ Synchroniser localData avec editData quand editData change
  useEffect(() => {
    setLocalData(editData);
  }, [editData]);

  // ✅ CORRECTION : Focus automatique sur le premier input du type courant
  useEffect(() => {
    if (editModal) {
      const currentRef = getCurrentInputRef();
      // Petit délai pour s'assurer que le modal est complètement rendu
      setTimeout(() => {
        currentRef.current?.focus();
      }, 100);
    }
  }, [editModal, currentEditType]);

  // ✅ Gestionnaire de changement local immédiat
  const handleLocalChange = (field, value) => {
    const newLocalData = {
      ...localData,
      [field]: value
    };
    setLocalData(newLocalData);
    setEditData(newLocalData);
  };

  const renderFormFields = () => {
    switch (currentEditType) {
      case 'personnel':
        return (
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Nom</label>
                <input 
                  ref={personnelInputRef} // ✅ RÉFÉRENCE SPÉCIFIQUE
                  type="text" 
                  className="form-control" 
                  value={localData.nom || ''} 
                  onChange={(e) => handleLocalChange('nom', e.target.value)} 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Prénom</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={localData.prenom || ''} 
                  onChange={(e) => handleLocalChange('prenom', e.target.value)} 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Date de naissance</label>
                <input 
                  type="date" 
                  className="form-control" 
                  value={localData.dateNaissance || ''} 
                  onChange={(e) => handleLocalChange('dateNaissance', e.target.value)} 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Lieu de naissance</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={localData.lieuNaissance || ''} 
                  onChange={(e) => handleLocalChange('lieuNaissance', e.target.value)} 
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Téléphone</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={localData.telephone || ''} 
                  onChange={(e) => handleLocalChange('telephone', e.target.value)} 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  value={localData.email || ''} 
                  onChange={(e) => handleLocalChange('email', e.target.value)} 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Adresse</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={localData.adresse || ''} 
                  onChange={(e) => handleLocalChange('adresse', e.target.value)} 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Matricule</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={localData.matricule || ''} 
                  onChange={(e) => handleLocalChange('matricule', e.target.value)} 
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Nom du père</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={localData.nomPere || ''} 
                  onChange={(e) => handleLocalChange('nomPere', e.target.value)} 
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Nom de la mère</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={localData.nomMere || ''} 
                  onChange={(e) => handleLocalChange('nomMere', e.target.value)} 
                />
              </div>
            </div>
          </div>
        );
          
      case 'administratif':
        return (
          <>
            <div className="mb-3">
              <label className="form-label">CIN</label>
              <input 
                ref={adminInputRef} // ✅ RÉFÉRENCE SPÉCIFIQUE
                type="text" 
                className="form-control" 
                value={localData.cin || ''} 
                onChange={(e) => handleLocalChange('cin', e.target.value)} 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Numéro CNAPS</label>
              <input 
                type="text" 
                className="form-control" 
                value={localData.numCnaps || ''} 
                onChange={(e) => handleLocalChange('numCnaps', e.target.value)} 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Nombre d'enfants</label>
              <input 
                type="number" 
                className="form-control" 
                value={localData.nombreEnfants || 0} 
                onChange={(e) => handleLocalChange('nombreEnfants', parseInt(e.target.value) || 0)} 
              />
            </div>
          </>
        );
          
      case 'professionnel':
        return (
          <>
            <div className="mb-3">
              <label className="form-label">Date d'embauche</label>
              <input 
                ref={proInputRef} // ✅ RÉFÉRENCE SPÉCIFIQUE
                type="date" 
                className="form-control" 
                value={localData.dateEmbauche || ''} 
                onChange={(e) => handleLocalChange('dateEmbauche', e.target.value)} 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Poste ID</label>
              <input 
                type="text" 
                className="form-control" 
                value={localData.posteId || ''} 
                onChange={(e) => handleLocalChange('posteId', e.target.value)} 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Département ID</label>
              <input 
                type="text" 
                className="form-control" 
                value={localData.departementId || ''} 
                onChange={(e) => handleLocalChange('departementId', e.target.value)} 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Type de contrat ID</label>
              <input 
                type="text" 
                className="form-control" 
                value={localData.typeContratId || ''} 
                onChange={(e) => handleLocalChange('typeContratId', e.target.value)} 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Manager ID</label>
              <input 
                type="text" 
                className="form-control" 
                value={localData.managerId || ''} 
                onChange={(e) => handleLocalChange('managerId', e.target.value)} 
              />
            </div>
          </>
        );
          
      case 'contact':
        return (
          <>
            <div className="mb-3">
              <label className="form-label">Nom</label>
              <input 
                ref={contactInputRef} // ✅ RÉFÉRENCE SPÉCIFIQUE
                type="text" 
                className="form-control" 
                value={localData.nom || ''} 
                onChange={(e) => handleLocalChange('nom', e.target.value)} 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Téléphone</label>
              <input 
                type="text" 
                className="form-control" 
                value={localData.contact || ''} 
                onChange={(e) => handleLocalChange('contact', e.target.value)} 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input 
                type="email" 
                className="form-control" 
                value={localData.email || ''} 
                onChange={(e) => handleLocalChange('email', e.target.value)} 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Adresse</label>
              <input 
                type="text" 
                className="form-control" 
                value={localData.adresse || ''} 
                onChange={(e) => handleLocalChange('adresse', e.target.value)} 
              />
            </div>
          </>
        );
          
      default:
        return null;
    }
  };

  return (
    <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modifier les informations {getEditTypeLabel()}</h5>
            <button type="button" className="btn-close" onClick={() => setEditModal(false)}></button>
          </div>
          <div className="modal-body">
            {renderFormFields()}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setEditModal(false)}>Annuler</button>
            <button type="button" className="btn btn-primary" onClick={saveInfo}>Enregistrer</button>
          </div>
        </div>
      </div>
    </div>
  );
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
                  {employe.prenom} {employe.nom}
                  <small className="text-muted ms-2">({employe.matricule || 'N/A'})</small>
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

        {/* Modal d'édition unique */}
        {editModal && <EditModal />}
      </div>
    </div>
  );
}

export default EmployeeInfo;