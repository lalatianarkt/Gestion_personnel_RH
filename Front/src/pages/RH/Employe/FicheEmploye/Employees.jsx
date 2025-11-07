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

  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  // 🔹 Charger les employés depuis le backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/employes');
        // Maintenant response.data contient des EmployeInfosDTO
        setEmployees(response.data);
        console.log("Données reçues:", response.data);
      } catch (error) {
        console.error(error);
        setMessage('❌ Erreur lors du chargement des employés');
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  // 🔹 Filtrage des employés - ADAPTÉ À LA NOUVELLE STRUCTURE
  const filteredEmployees = useMemo(() => {
    return employees.filter(empDto => {
      const employe = empDto.employe || {};
      const infosPro = empDto.infosProfessionnelles || {};
      
      const matricule = employe.matricule || '';
      const departement = infosPro.departement?.nom || '';
      const poste = infosPro.poste?.nom || '';

      return (
        matricule.toLowerCase().includes(searchTerm.matricule.toLowerCase()) &&
        employe.nom?.toLowerCase().includes(searchTerm.nom.toLowerCase()) &&
        employe.prenom?.toLowerCase().includes(searchTerm.prenom.toLowerCase()) &&
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

  // 🔹 Ouvrir le modal pour modifier les infos personnelles
  const openModal = async (id) => {
    setModalLoading(true);
    setShowModal(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/employes/${id}`);
      // La réponse contient maintenant un EmployeInfosDTO
      const employeeData = response.data.employe; // Prendre l'employé du DTO
      setSelectedEmployee(employeeData);
    } catch (error) {
      console.error(error);
      setMessage('❌ Erreur lors de la récupération de l\'employé');
      setShowModal(false);
    } finally {
      setModalLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
  };

  const handleModalChange = (field, value) => {
    setSelectedEmployee(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envoyer uniquement les infos personnelles de l'employé
      const updatedData = {
        nom: selectedEmployee.nom,
        prenom: selectedEmployee.prenom,
        dateNaissance: selectedEmployee.dateNaissance,
        telephone: selectedEmployee.telephone,
        email: selectedEmployee.email,
        adresse: selectedEmployee.adresse,
        nomPere: selectedEmployee.nomPere,
        nomMere: selectedEmployee.nomMere,
        lieuNaissance: selectedEmployee.lieuNaissance,
        matricule: selectedEmployee.matricule
      };
      
      await axios.put(`http://localhost:8080/api/employes/${selectedEmployee.id}`, updatedData);
      
      // Mettre à jour localement
      setEmployees(prev => prev.map(empDto => 
        empDto.employe?.id === selectedEmployee.id 
          ? { ...empDto, employe: { ...empDto.employe, ...updatedData } }
          : empDto
      ));
      
      closeModal();
      alert('✅ Employé modifié avec succès');
    } catch (error) {
      console.error(error);
      alert('Erreur lors de la modification: ' + (error.response?.data || error.message));
    }
  };

  if (loading) return <div className="text-center mt-5">Chargement des employés...</div>;
  if (message) return <div className="alert alert-danger text-center mt-3">{message}</div>;

  return (
    <div className="employees-page">
      <style>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(2px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modalContent {
          background: white;
          padding: 30px;
          border-radius: 10px;
          max-width: 500px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }
        .modalContent input, .modalContent select {
          width: 100%;
          padding: 8px;
          margin-bottom: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .modalContent button {
          cursor: pointer;
          padding: 8px 16px;
          margin-right: 10px;
          border: none;
          border-radius: 4px;
        }
      `}</style>

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
            <h3 className="card-title mb-0">Recherche Multicritère</h3>
          </div>
          <div className="card-body">
            <div className="row g-3">
              {['matricule', 'nom', 'prenom', 'departement', 'poste'].map((field, idx) => (
                <div className="col-md-2" key={idx}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={searchTerm[field]}
                    onChange={(e) => handleSearchChange(field, e.target.value)}
                  />
                </div>
              ))}
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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map(empDto => {
                    const employe = empDto.employe || {};
                    const infosPro = empDto.infosProfessionnelles || {};
                    
                    return (
                      <tr key={employe.id}>
                        <td>{employe.matricule || '-'}</td>
                        <td>{employe.nom} {employe.prenom}</td>
                        <td>{infosPro.departement?.nom || '-'}</td>
                        <td>{infosPro.poste?.nom || '-'}</td>
                        <td>
                          <a href={`mailto:${employe.email}`}>
                            {employe.email}
                          </a>
                        </td>
                        <td>{employe.telephone}</td>
                        <td>
                          {infosPro.dateEmbauche 
                            ? new Date(infosPro.dateEmbauche).toLocaleDateString('fr-FR')
                            : '-'
                          }
                        </td>
                        <td>
                          <div className="btn-group-vertical btn-group-sm w-100">
                            <div className="btn-group mb-1">
                              <button 
                                className="btn btn-outline-info" 
                                onClick={() => viewEmployeeInfo(employe.id, 'personnel')}
                              >
                                Personnel
                              </button>
                              <button 
                                className="btn btn-outline-warning" 
                                onClick={() => viewEmployeeInfo(employe.id, 'administratif')}
                              >
                                Admin
                              </button>
                              <button 
                                className="btn btn-outline-success" 
                                onClick={() => viewEmployeeInfo(employe.id, 'professionnel')}
                              >
                                Pro
                              </button>
                            </div>
                            <div className="btn-group">
                              <button 
                                className="btn btn-outline-primary" 
                                onClick={() => viewEmployeeDocuments(employe.id)}
                              >
                                Documents
                              </button>
                              <button 
                                className="btn btn-outline-secondary" 
                                onClick={() => openModal(employe.id)}
                              >
                                Modifier
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal modification infos personnelles */}
      {showModal && selectedEmployee && (
        <div className="modal" onClick={(e) => { if(e.target === e.currentTarget) closeModal(); }}>
          <div className="modalContent">
            {modalLoading ? (
              <div className="text-center">Chargement...</div>
            ) : (
              <>
                <h3>Modifier les informations personnelles</h3>
                <form onSubmit={handleModalSubmit}>
                  <input 
                    type="text" 
                    value={selectedEmployee.nom || ''} 
                    onChange={(e) => handleModalChange('nom', e.target.value)} 
                    placeholder="Nom" 
                    required 
                  />
                  <input 
                    type="text" 
                    value={selectedEmployee.prenom || ''} 
                    onChange={(e) => handleModalChange('prenom', e.target.value)} 
                    placeholder="Prénom" 
                    required 
                  />
                  <input 
                    type="date" 
                    value={selectedEmployee.dateNaissance || ''} 
                    onChange={(e) => handleModalChange('dateNaissance', e.target.value)} 
                    placeholder="Date de naissance" 
                    required 
                  />
                  <input 
                    type="text" 
                    value={selectedEmployee.telephone || ''} 
                    onChange={(e) => handleModalChange('telephone', e.target.value)} 
                    placeholder="Téléphone" 
                  />
                  <input 
                    type="email" 
                    value={selectedEmployee.email || ''} 
                    onChange={(e) => handleModalChange('email', e.target.value)} 
                    placeholder="Email" 
                  />
                  <input 
                    type="text" 
                    value={selectedEmployee.adresse || ''} 
                    onChange={(e) => handleModalChange('adresse', e.target.value)} 
                    placeholder="Adresse" 
                  />
                  <input 
                    type="text" 
                    value={selectedEmployee.lieuNaissance || ''} 
                    onChange={(e) => handleModalChange('lieuNaissance', e.target.value)} 
                    placeholder="Lieu de naissance" 
                  />
                  <input 
                    type="text" 
                    value={selectedEmployee.matricule || ''} 
                    onChange={(e) => handleModalChange('matricule', e.target.value)} 
                    placeholder="Matricule" 
                  />
                  <input 
                    type="text" 
                    value={selectedEmployee.nomPere || ''} 
                    onChange={(e) => handleModalChange('nomPere', e.target.value)} 
                    placeholder="Nom du père" 
                  />
                  <input 
                    type="text" 
                    value={selectedEmployee.nomMere || ''} 
                    onChange={(e) => handleModalChange('nomMere', e.target.value)} 
                    placeholder="Nom de la mère" 
                  />
                  <div className="mt-3">
                    <button type="submit" className="btn btn-success me-2">
                      Enregistrer
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={closeModal}>
                      Fermer
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Employees;