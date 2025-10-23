// src/pages/AddEmployee.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddEmployee() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Étape courante (1, 2 ou 3)
  const [employee, setEmployee] = useState({
    // Étape 1 - Personnel
    nom: "",
    prenom: "",
    dateNaissance: "",
    lieuNaissance: "",
    nationalite: "",
    situationFamiliale: "",
    enfants: 0,
    adresse: "",
    telephonePerso: "",
    emailPerso: "",

    // Étape 2 - Administratif
    matricule: "",
    departement: "",
    poste: "",
    dateEmbauche: "",
    typeContrat: "",
    dureeContrat: "",
    salaireBase: "",
    numeroSecuriteSociale: "",
    matriculeInterne: "",

    // Étape 3 - Professionnel
    manager: "",
    datePromotion: "",
    ancienPoste: "",
    competences: "",
    formations: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("✅ Nouvel employé :", employee);
    alert("Employé ajouté avec succès !");
    navigate("/dashboard-RH/employees");
  };

  return (
    <div className="container-fluid mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Ajouter un nouvel employé</h4>
        </div>
        <div className="card-body">
          {/* Indicateur d’étape */}
          <div className="progress mb-4" style={{ height: "8px" }}>
            <div
              className="progress-bar bg-primary"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>

          {/* Étape 1 : Informations personnelles */}
          {step === 1 && (
            <>
              <h5 className="text-primary mb-3">Informations personnelles</h5>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Nom</label>
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
                  <label className="form-label">Prénom</label>
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
                  <label className="form-label">Date de naissance</label>
                  <input
                    type="date"
                    name="dateNaissance"
                    className="form-control"
                    value={employee.dateNaissance}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">Lieu de naissance</label>
                  <input
                    type="text"
                    name="lieuNaissance"
                    className="form-control"
                    value={employee.lieuNaissance}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Nationalité</label>
                  <input
                    type="text"
                    name="nationalite"
                    className="form-control"
                    value={employee.nationalite}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Situation familiale</label>
                  <select
                    name="situationFamiliale"
                    className="form-select"
                    value={employee.situationFamiliale}
                    onChange={handleChange}
                  >
                    <option value="">-- Choisir --</option>
                    <option value="Célibataire">Célibataire</option>
                    <option value="Marié">Marié</option>
                    <option value="Divorcé">Divorcé</option>
                    <option value="Veuf">Veuf</option>
                  </select>
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">Nombre d'enfants</label>
                  <input
                    type="number"
                    name="enfants"
                    className="form-control"
                    value={employee.enfants}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-8 mb-3">
                  <label className="form-label">Adresse</label>
                  <input
                    type="text"
                    name="adresse"
                    className="form-control"
                    value={employee.adresse}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Téléphone</label>
                  <input
                    type="text"
                    name="telephonePerso"
                    className="form-control"
                    value={employee.telephonePerso}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email personnel</label>
                  <input
                    type="email"
                    name="emailPerso"
                    className="form-control"
                    value={employee.emailPerso}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </>
          )}

          {/* Étape 2 : Informations administratives */}
          {step === 2 && (
            <>
              <h5 className="text-warning mb-3">Informations administratives</h5>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Matricule</label>
                  <input
                    type="text"
                    name="matricule"
                    className="form-control"
                    value={employee.matricule}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Département</label>
                  <input
                    type="text"
                    name="departement"
                    className="form-control"
                    value={employee.departement}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Poste</label>
                  <input
                    type="text"
                    name="poste"
                    className="form-control"
                    value={employee.poste}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">Date d'embauche</label>
                  <input
                    type="date"
                    name="dateEmbauche"
                    className="form-control"
                    value={employee.dateEmbauche}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Type de contrat</label>
                  <select
                    name="typeContrat"
                    className="form-select"
                    value={employee.typeContrat}
                    onChange={handleChange}
                  >
                    <option value="">-- Sélectionner --</option>
                    <option value="CDI">CDI</option>
                    <option value="CDD">CDD</option>
                    <option value="Stage">Stage</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Durée contrat</label>
                  <input
                    type="text"
                    name="dureeContrat"
                    className="form-control"
                    value={employee.dureeContrat}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">Salaire de base</label>
                  <input
                    type="text"
                    name="salaireBase"
                    className="form-control"
                    value={employee.salaireBase}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">N° Sécurité Sociale</label>
                  <input
                    type="text"
                    name="numeroSecuriteSociale"
                    className="form-control"
                    value={employee.numeroSecuriteSociale}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Matricule interne</label>
                  <input
                    type="text"
                    name="matriculeInterne"
                    className="form-control"
                    value={employee.matriculeInterne}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </>
          )}

          {/* Étape 3 : Informations professionnelles */}
          {step === 3 && (
            <>
              <h5 className="text-success mb-3">Informations professionnelles</h5>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Manager</label>
                  <input
                    type="text"
                    name="manager"
                    className="form-control"
                    value={employee.manager}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Date de promotion</label>
                  <input
                    type="date"
                    name="datePromotion"
                    className="form-control"
                    value={employee.datePromotion}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Ancien poste</label>
                  <input
                    type="text"
                    name="ancienPoste"
                    className="form-control"
                    value={employee.ancienPoste}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Compétences (séparées par des virgules)</label>
                  <input
                    type="text"
                    name="competences"
                    className="form-control"
                    value={employee.competences}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">Formations</label>
                  <textarea
                    name="formations"
                    className="form-control"
                    rows="2"
                    value={employee.formations}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </>
          )}

          {/* Boutons navigation */}
          <div className="d-flex justify-content-between mt-4">
            {step > 1 ? (
              <button className="btn btn-outline-secondary" onClick={prevStep}>
                ⬅️ Précédent
              </button>
            ) : (
              <button
                className="btn btn-outline-secondary"
                onClick={() => navigate("/dashboard-RH/employees")}
              >
                Annuler
              </button>
            )}

            {step < 3 ? (
              <button className="btn btn-primary" onClick={nextStep}>
                Suivant ➡️
              </button>
            ) : (
              <button type="submit" className="btn btn-success" onClick={handleSubmit}>
                💾 Enregistrer
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;
