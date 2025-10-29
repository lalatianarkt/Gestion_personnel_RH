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
  const [situationsFamiliales, setSituationsFamiliales] = useState([]);
  const [departements, setDepartements] = useState([]);
  const [nationalites, setNationalites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  const [employee, setEmployee] = useState({
    // Informations personnelles
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
    nationaliteId: "",

    // Contact d'urgence
    contactUrgence: "",
    emailUrgence: "",
    adresseUrgence: "",
    telephoneUrgence: "",

    // Informations administratives
    numCnaps: "",
    cin: "",
    nombreEnfants: 0,
    situationFamilialeId: "",

    // Informations professionnelles
    // matricule: "",
    dateEmbauche: "",
    salaireBase: "",
    typeContratId: "",
    posteId: "",
    departementId: "",
    dateDebut: "",
    dateFin: "",
  });

  // Récupérer les données depuis les APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        setDataLoading(true);

        const [
          sexesResponse,
          postesResponse,
          contratsResponse,
          situationsResponse,
          departementsResponse,
          nationalitesResponse,
        ] = await Promise.all([
          axios.get("http://localhost:8080/api/sexes"),
          axios.get("http://localhost:8080/api/postes"),
          axios.get("http://localhost:8080/api/type-contrats"),
          axios.get("http://localhost:8080/api/situation-familiale"),
          axios.get("http://localhost:8080/api/departements"),
          axios.get("http://localhost:8080/api/nationalites"),
        ]);

        setSexes(sexesResponse.data);
        setPostes(postesResponse.data);
        setTypeContrats(contratsResponse.data);
        setSituationsFamiliales(situationsResponse.data);
        setDepartements(departementsResponse.data);
        setNationalites(nationalitesResponse.data);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
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

      const payload = {
        employe: {
          nom: employee.nom,
          prenom: employee.prenom,
          dateNaissance: employee.dateNaissance,
          telephone: employee.telephone,
          email: employee.email,
          adresse: employee.adresse,
          nomMere: employee.nomMere,
          nomPere: employee.nomPere,
          // lieuNaissance: employee.lieuNaissance,
        },
        sexe: { id: parseInt(employee.sexeId) },
        nationalite: {
          id: parseInt(employee.nationaliteId) ,
        }, 
        emergencyContact: {
          nom: employee.contactUrgence,
          email: employee.emailUrgence,
          adresse: employee.adresseUrgence,
          contact: employee.telephoneUrgence || "",
        },
        infosAdministratives: {
          numCnaps: employee.numCnaps,
          cin: employee.cin,
          nombreEnfants: employee.nombreEnfants,
          situationFamiliale: { id: parseInt(employee.situationFamilialeId) },
        }, 
        infosProfessionnelles: {
          // matricule: employee.matricule,
          dateEmbauche: employee.dateEmbauche,
          // salaireBase: employee.salaireBase,
          typeContrat: { id: parseInt(employee.typeContratId) },
        },
        poste: { id: employee.posteId },
        departement: { id: employee.departementId },
        posteEmploye: {
          dateDebut: employee.dateDebut,
          dateFin: employee.dateFin,
        },
      };  

      console.log("✅ Payload envoyé :", payload);

      await axios.post("http://localhost:8080/api/employes", payload);

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
          <div className="progress mb-4" style={{ height: "8px" }}>
            <div className="progress-bar bg-primary" style={{ width: `${(step / 5) * 100}%` }}></div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Étape 1 : Informations personnelles */}
            {step === 1 && (
              <div>
                <h5 className="text-primary mb-3">Informations personnelles</h5>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label>Nom *</label>
                    <input type="text" name="nom" className="form-control" value={employee.nom} onChange={handleChange} required />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label>Prénom *</label>
                    <input type="text" name="prenom" className="form-control" value={employee.prenom} onChange={handleChange} required />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label>Sexe *</label>
                    <select name="sexeId" className="form-select" value={employee.sexeId} onChange={handleChange} required disabled={dataLoading}>
                      <option value="">-- Choisir --</option>
                      {sexes.map((s) => <option key={s.id} value={s.id}>{s.sexe}</option>)}
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label>Nationalité *</label>
                    <select name="nationaliteId" className="form-select" value={employee.nationaliteId} onChange={handleChange} required disabled={dataLoading}>
                      <option value="">-- Choisir --</option>
                      {nationalites.map((n) => <option key={n.id} value={n.id}>{n.nationalite}</option>)}
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label>Date de naissance *</label>
                    <input type="date" name="dateNaissance" className="form-control" value={employee.dateNaissance} onChange={handleChange} required />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label>Lieu de naissance *</label>
                    <input type="text" name="lieuNaissance" className="form-control" value={employee.lieuNaissance} onChange={handleChange} required />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label>Téléphone *</label>
                    <input type="text" name="telephone" className="form-control" value={employee.telephone} onChange={handleChange} maxLength="12" required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Email *</label>
                    <input type="email" name="email" className="form-control" value={employee.email} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Adresse *</label>
                    <input type="text" name="adresse" className="form-control" value={employee.adresse} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Nom de la mère</label>
                    <input type="text" name="nomMere" className="form-control" value={employee.nomMere} onChange={handleChange} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Nom du père</label>
                    <input type="text" name="nomPere" className="form-control" value={employee.nomPere} onChange={handleChange} />
                  </div>
                </div>
              </div>
            )}

            {/* Étape 2 : Contact d'urgence */}
            {step === 2 && (
              <div>
                <h5 className="text-warning mb-3">Contact d'urgence</h5>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Nom du contact *</label>
                    <input type="text" name="contactUrgence" className="form-control" value={employee.contactUrgence} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Email du contact</label>
                    <input type="email" name="emailUrgence" className="form-control" value={employee.emailUrgence} onChange={handleChange} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Téléphone du contact</label>
                    <input type="text" name="telephoneUrgence" className="form-control" value={employee.telephoneUrgence} onChange={handleChange} />
                  </div>
                  <div className="col-12 mb-3">
                    <label>Adresse du contact</label>
                    <input type="text" name="adresseUrgence" className="form-control" value={employee.adresseUrgence} onChange={handleChange} />
                  </div>
                </div>
              </div>
            )}

            {/* Étape 3 : Informations administratives */}
            {step === 3 && (
              <div>
                <h5 className="text-info mb-3">Informations administratives</h5>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Numéro CNAPS *</label>
                    <input type="text" name="numCnaps" className="form-control" value={employee.numCnaps} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>CIN *</label>
                    <input type="text" name="cin" className="form-control" value={employee.cin} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Situation familiale</label>
                    <select name="situationFamilialeId" className="form-select" value={employee.situationFamilialeId} onChange={handleChange} disabled={dataLoading}>
                      <option value="">-- Choisir --</option>
                      {situationsFamiliales.map((sf) => <option key={sf.id} value={sf.id}>{sf.type}</option>)}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Nombre d'enfants</label>
                    <input type="number" name="nombreEnfants" className="form-control" value={employee.nombreEnfants} onChange={handleChange} min="0" />
                  </div>
                </div>
              </div>
            )}

            {/* Étape 4 : Informations professionnelles */}
            {step === 4 && (
              <div>
                <h5 className="text-success mb-3">Informations professionnelles</h5>
                <div className="row">
                  {/* <div className="col-md-6 mb-3">
                    <label>Matricule *</label>
                    <input type="text" name="matricule" className="form-control" value={employee.matricule} onChange={handleChange} required />
                  </div> */}
                  <div className="col-md-6 mb-3">
                    <label>Date d'embauche *</label>
                    <input type="date" name="dateEmbauche" className="form-control" value={employee.dateEmbauche} onChange={handleChange} required />
                  </div>
                  {/* <div className="col-md-6 mb-3">
                    <label>Salaire de base (Ar)</label>
                    <input type="number" name="salaireBase" className="form-control" value={employee.salaireBase} onChange={handleChange} min="0" />
                  </div> */}
                  <div className="col-md-6 mb-3">
                    <label>Poste *</label>
                    <select name="posteId" className="form-select" value={employee.posteId} onChange={handleChange} required disabled={dataLoading}>
                      <option value="">-- Choisir un poste --</option>
                      {postes.map((p) => <option key={p.id} value={p.id}>{p.nom}</option>)}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Type de contrat *</label>
                    <select name="typeContratId" className="form-select" value={employee.typeContratId} onChange={handleChange} required disabled={dataLoading}>
                      <option value="">-- Choisir un type --</option>
                      {typeContrats.map((t) => <option key={t.id} value={t.id}>{t.intitule}</option>)}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Département *</label>
                    <select name="departementId" className="form-select" value={employee.departementId} onChange={handleChange} required disabled={dataLoading}>
                      <option value="">-- Choisir un département --</option>
                      {departements.map((d) => <option key={d.id} value={d.id}>{d.nom}</option>)}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Date début d'assignement de poste</label>
                    <input type="date" name="dateDebut" className="form-control" value={employee.dateDebut} onChange={handleChange} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Date fin d'assignement de poste</label>
                    <input type="date" name="dateFin" className="form-control" value={employee.dateFin} onChange={handleChange} />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="d-flex justify-content-between mt-4">
              {step > 1 && (
                <button type="button" className="btn btn-outline-secondary" onClick={prevStep} disabled={loading}>
                  Précédent
                </button>
              )}
              {step < 4 ? (
                <button type="button" className="btn btn-primary" onClick={nextStep}>
                  Suivant
                </button>
              ) : (
                <button type="submit" className="btn btn-success" disabled={loading || dataLoading}>
                  {loading ? "Enregistrement..." : "Enregistrer l'employé"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;
