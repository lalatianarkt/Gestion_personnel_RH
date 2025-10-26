// src/pages/AddEmployee.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddEmployee() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [sexes, setSexes] = useState([]);
  const [postes, setPostes] = useState([]);
  const [typeContrats, setTypeContrats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [situationsFamiliales, setSituationsFamiliales] = useState([]);

  
  const [employee, setEmployee] = useState({
    // Étape 1 - Informations personnelles (table Employe)
    nom: "",
    prenom: "",
    sexeId: "",
    dateNaissance: "",
    telephone: "",
    email: "",
    adresse: "",
    nomMere: "",
    nomPere: "",
    lieuNaissance: "",

    // Étape 2 - Contact d'urgence (emergency_contact)
    contactUrgence: "",
    emailUrgence: "",
    adresseUrgence: "",

    // Étape 3 - Informations administratives (infos_Administratives)
    numCnaps: "",
    cin: "",
    nombreEnfants: 0,
    situationFamiliale: "",

    // Étape 4 - Informations professionnelles (infos_Professionnelles)
    matricule: "",
    dateEmbauche: "",

    // Étape 5 - Contrat (table Contrat)
    posteId: "",
    typeContratId: "",
    dateDebutContrat: "",
    dateFinContrat: "",
    dureeContrat: "",
    salaireBase: "",
  });

  // Récupérer les données depuis les APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        setDataLoading(true);
        
        // Récupérer les sexes
        const sexesResponse = await axios.get("http://localhost:8080/api/sexes");
        setSexes(sexesResponse.data);
        
        // Récupérer les postes
        const postesResponse = await axios.get("http://localhost:8080/api/postes");
        setPostes(postesResponse.data);
        
        // Récupérer les types de contrats
        const contratsResponse = await axios.get("http://localhost:8080/api/type-contrats");
        setTypeContrats(contratsResponse.data);

        // Récupérer les situations familiales
        const situationsResponse = await axios.get("http://localhost:8080/api/situation-familiale");
        setSituationsFamiliales(situationsResponse.data);

        
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        // Fallback en cas d'erreur
        setSexes([
          { id: 1, sexe: "Masculin", code: "M" },
          { id: 2, sexe: "Féminin", code: "F" }
        ]);
        setPostes([
          { id: "POST001", nom: "Développeur", description: "Développeur full-stack" },
          { id: "POST002", nom: "Manager", description: "Manager d'équipe" }
        ]);
        setTypeContrats([
          { id: "CONT001", intitule: "CDI", description: "Contrat à durée indéterminée" },
          { id: "CONT002", intitule: "CDD", description: "Contrat à durée déterminée" }
        ]);
        // setSituationsFamiliales
      } finally {
        setDataLoading(false);  
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      console.log("✅ Nouvel employé :", employee);
      
      // Ici vous enverrez les données à votre API Spring Boot
      // await axios.post("http://localhost:8080/api/employes", employee);
      
      alert("Employé ajouté avec succès !");
      navigate("/dashboard-RH/employees");
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'employé:", error);
      alert("Erreur lors de l'ajout de l'employé");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Ajouter un nouvel employé</h4>
        </div>
        <div className="card-body">
          {/* Indicateur d'étape */}
          <div className="progress mb-4" style={{ height: "8px" }}>
            <div
              className="progress-bar bg-primary"
              style={{ width: `${(step / 5) * 100}%` }}
            ></div>
          </div>

          {/* Étape 1 : Informations personnelles */}
          {step === 1 && (
            <>
              <h5 className="text-primary mb-3">
                <i className="bi bi-person me-2"></i>
                Informations personnelles
              </h5>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Nom *</label>
                  <input
                    type="text"
                    name="nom"
                    className="form-control"
                    value={employee.nom}
                    onChange={handleChange}
                    required
                  /> 
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Prénom *</label>
                  <input
                    type="text"
                    name="prenom"
                    className="form-control"
                    value={employee.prenom}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Sexe *</label>
                  <select
                    name="sexeId"
                    className="form-select"
                    value={employee.sexeId}
                    onChange={handleChange}
                    required
                    disabled={dataLoading}
                  >
                    <option value="">-- Choisir --</option>
                    {sexes.map((sexe) => (
                      <option key={sexe.id} value={sexe.id}>
                        {sexe.sexe} {sexe.code ? `(${sexe.code})` : ''}
                      </option>
                    ))}
                  </select>
                  {dataLoading && (
                    <div className="form-text">
                      <small>Chargement des sexes...</small>
                    </div>
                  )}
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">Date de naissance *</label>
                  <input
                    type="date"
                    name="dateNaissance"
                    className="form-control"
                    value={employee.dateNaissance}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Lieu de naissance *</label>
                  <input
                    type="text"
                    name="lieuNaissance"
                    className="form-control"
                    value={employee.lieuNaissance}
                    onChange={handleChange}
                    placeholder="Antananarivo"
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Téléphone *</label>
                  <input
                    type="text"
                    name="telephone"
                    className="form-control"
                    value={employee.telephone}
                    onChange={handleChange}
                    placeholder="0341234567"
                    maxLength="12"
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={employee.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Adresse *</label>
                  <input
                    type="text"
                    name="adresse"
                    className="form-control"
                    value={employee.adresse}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Nom de la mère</label>
                  <input
                    type="text"
                    name="nomMere"
                    className="form-control"
                    value={employee.nomMere}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Nom du père</label>
                  <input
                    type="text"
                    name="nomPere"
                    className="form-control"
                    value={employee.nomPere}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </>
          )}

          {/* Étape 2 : Contact d'urgence */}
          {step === 2 && (
            <>
              <h5 className="text-warning mb-3">
                <i className="bi bi-telephone me-2"></i>
                Contact d'urgence
              </h5>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Nom du contact d'urgence *</label>
                  <input
                    type="text"
                    name="contactUrgence"
                    className="form-control"
                    value={employee.contactUrgence}
                    onChange={handleChange}
                    placeholder="Marie RAZAFINDRAKOTO"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email du contact</label>
                  <input
                    type="email"
                    name="emailUrgence"
                    className="form-control"
                    value={employee.emailUrgence}
                    onChange={handleChange}
                    placeholder="marie.contact@email.com"
                  />
                </div>
                <div className="col-12 mb-3">
                  <label className="form-label">Adresse du contact</label>
                  <input
                    type="text"
                    name="adresseUrgence"
                    className="form-control"
                    value={employee.adresseUrgence}
                    onChange={handleChange}
                    placeholder="Antananarivo"
                  />
                </div>
              </div>
            </>
          )}

          {/* Étape 3 : Informations administratives */}
          {step === 3 && (
            <>
              <h5 className="text-info mb-3">
                <i className="bi bi-file-text me-2"></i>
                Informations administratives
              </h5>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Numéro CNAPS *</label>
                  <input
                    type="text"
                    name="numCnaps"
                    className="form-control"
                    value={employee.numCnaps}
                    onChange={handleChange}
                    placeholder="CNAPS001"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">CIN *</label>
                  <input
                    type="text"
                    name="cin"
                    className="form-control"
                    value={employee.cin}
                    onChange={handleChange}
                    placeholder="CIN123456"
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Situation familiale</label>
                  <select
                    name="situationFamiliale"
                    className="form-select"
                    value={employee.situationFamiliale}
                    onChange={handleChange}
                    disabled={dataLoading}
                  >
                    <option value="">-- Choisir --</option>
                    {situationsFamiliales.map((sf) => (
                      <option key={sf.id} value={sf.id}>
                        {sf.type}
                      </option>
                    ))}
                  </select>
                  {dataLoading && (
                    <div className="form-text">
                      <small>Chargement des situations familiales...</small>
                    </div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Nombre d'enfants</label>
                  <input
                    type="number"
                    name="nombreEnfants"
                    className="form-control"
                    value={employee.nombreEnfants}
                    onChange={handleChange}
                    min="0"
                  />
                </div>
              </div>
            </>
          )}

          {/* Étape 4 : Informations professionnelles */}
          {step === 4 && (
            <>
              <h5 className="text-success mb-3">
                <i className="bi bi-briefcase me-2"></i>
                Informations professionnelles
              </h5>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Matricule *</label>
                  <input
                    type="text"
                    name="matricule"
                    className="form-control"
                    value={employee.matricule}
                    onChange={handleChange}
                    placeholder="MAT001"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Date d'embauche *</label>
                  <input
                    type="date"
                    name="dateEmbauche"
                    className="form-control"
                    value={employee.dateEmbauche}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Salaire de base (Ar)</label>
                  <input
                    type="number"
                    name="salaireBase"
                    className="form-control"
                    value={employee.salaireBase}
                    onChange={handleChange}
                    placeholder="500000"
                    min="0"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Durée période d'essai (jours)</label>
                  <input
                    type="number"
                    name="dureeContrat"
                    className="form-control"
                    value={employee.dureeContrat}
                    onChange={handleChange}
                    placeholder="90"
                    min="0"
                  />
                </div>
              </div>
            </>
          )}

          {/* Étape 5 : Contrat */}
          {step === 5 && (
            <>
              <h5 className="text-secondary mb-3">
                <i className="bi bi-file-earmark-text me-2"></i>
                Contrat de travail
              </h5>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Poste *</label>
                  <select
                    name="posteId"
                    className="form-select"
                    value={employee.posteId}
                    onChange={handleChange}
                    required
                    disabled={dataLoading}
                  >
                    <option value="">-- Choisir un poste --</option>
                    {postes.map((poste) => (
                      <option key={poste.id} value={poste.id}>
                        {poste.nom}
                      </option>
                    ))}
                  </select>
                  {dataLoading && (
                    <div className="form-text">
                      <small>Chargement des postes...</small>
                    </div>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Type de contrat *</label>
                  <select
                    name="typeContratId"
                    className="form-select"
                    value={employee.typeContratId}
                    onChange={handleChange}
                    required
                    disabled={dataLoading}
                  >
                    <option value="">-- Choisir un type --</option>
                    {typeContrats.map((typeContrat) => (
                      <option key={typeContrat.id} value={typeContrat.id}>
                        {typeContrat.intitule}
                      </option>
                    ))}
                  </select>
                  {dataLoading && (
                    <div className="form-text">
                      <small>Chargement des types de contrat...</small>
                    </div>
                  )}
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">Date début contrat *</label>
                  <input
                    type="date"
                    name="dateDebutContrat"
                    className="form-control"
                    value={employee.dateDebutContrat}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Date fin contrat</label>
                  <input
                    type="date"
                    name="dateFinContrat"
                    className="form-control"
                    value={employee.dateFinContrat}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Durée (mois)</label>
                  <input
                    type="number"
                    name="dureeContrat"
                    className="form-control"
                    value={employee.dureeContrat}
                    onChange={handleChange}
                    placeholder="12"
                    min="1"
                  />
                </div>

                <div className="col-12">
                  <div className="alert alert-info">
                    <h6 className="alert-heading">
                      <i className="bi bi-info-circle me-2"></i>
                      Récapitulatif du contrat
                    </h6>
                    <div className="row small">
                      <div className="col-md-6">
                        <strong>Poste:</strong> {
                          postes.find(p => p.id === employee.posteId)?.nom || "Non sélectionné"
                        }
                      </div>
                      <div className="col-md-6">
                        <strong>Type de contrat:</strong> {
                          typeContrats.find(t => t.id === employee.typeContratId)?.intitule || "Non sélectionné"
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Boutons navigation */}
          <div className="d-flex justify-content-between mt-4">
            {step > 1 ? (
              <button 
                className="btn btn-outline-secondary" 
                onClick={prevStep}
                disabled={loading}
              >
                <i className="bi bi-arrow-left me-1"></i>
                Précédent
              </button>
            ) : (
              <button
                className="btn btn-outline-secondary"
                onClick={() => navigate("/dashboard-RH/employees")}
                disabled={loading}
              >
                <i className="bi bi-x me-1"></i>
                Annuler
              </button>
            )}

            {step < 5 ? (
              <button 
                className="btn btn-primary" 
                onClick={nextStep}
                disabled={loading || dataLoading}
              >
                {loading || dataLoading ? "Chargement..." : "Suivant"}
                <i className="bi bi-arrow-right ms-1"></i>
              </button>
            ) : (
              <button 
                type="submit" 
                className="btn btn-success" 
                onClick={handleSubmit}
                disabled={loading || dataLoading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-1"></i>
                    Enregistrer l'employé
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;