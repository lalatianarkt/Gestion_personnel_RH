// src/pages/AddEmployee.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddEmployee() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Étape courante (1, 2 ou 3)
  const [employee, setEmployee] = useState({
    // Étape 1 - Personnel (selon table Employe)
    nom: "",
    prenom: "",
    sexe: "",
    dateNaissance: "",
    telephone: "",
    email: "",
    adresse: "",
    nomMere: "",
    nomPere: "",

    // Étape 2 - Contact d'urgence (emergency_contact)
    contactUrgence: "",
    emailUrgence: "",
    adresseUrgence: "",

    // Étape 3 - Informations professionnelles (infos_Professionnelles)
    matricule: "",
    dateEmbauche: "",

    // Étape 4 - Informations administratives (infos_Administratives)
    numCnaps: "",
    cin: "",
    nombreEnfants: 0,
    situationFamiliale: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
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
          {/* Indicateur d'étape */}
          <div className="progress mb-4" style={{ height: "8px" }}>
            <div
              className="progress-bar bg-primary"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>

          {/* Étape 1 : Informations personnelles (table Employe) */}
          {step === 1 && (
            <>
              <h5 className="text-primary mb-3">Informations personnelles</h5>
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
                    name="sexe"
                    className="form-select"
                    value={employee.sexe}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Choisir --</option>
                    <option value="M">Masculin</option>
                    <option value="F">Féminin</option>
                  </select>
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
                <div className="col-md-4 mb-3">
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

                <div className="col-md-12 mb-3">
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

          {/* Étape 2 : Contact d'urgence (table emergency_contact) */}
          {step === 2 && (
            <>
              <h5 className="text-warning mb-3">Contact d'urgence</h5>
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
                <div className="col-md-12 mb-3">
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

          {/* Étape 3 : Informations professionnelles (table infos_Professionnelles) */}
          {step === 3 && (
            <>
              <h5 className="text-info mb-3">Informations professionnelles</h5>
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
              </div>
            </>
          )}

          {/* Étape 4 : Informations administratives (table infos_Administratives) */}
          {step === 4 && (
            <>
              <h5 className="text-success mb-3">Informations administratives</h5>
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
                  >
                    <option value="">-- Choisir --</option>
                    <option value="Célibataire">Célibataire</option>
                    <option value="Marié(e)">Marié(e)</option>
                    <option value="Divorcé(e)">Divorcé(e)</option>
                    <option value="Veuf(ve)">Veuf(ve)</option>
                  </select>
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

            {step < 4 ? (
              <button className="btn btn-primary" onClick={nextStep}>
                Suivant ➡️
              </button>
            ) : (
              <button type="submit" className="btn btn-success" onClick={handleSubmit}>
                💾 Enregistrer l'employé
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;