import React, { useState, useEffect } from "react";
import axios from "axios";

const AddManager = () => {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [newManager, setNewManager] = useState({
    employeId: "",
    departementId: "",
    dateDebut: "",  // ✅ AJOUTÉ - manquant dans l'état initial
    dateFin: ""     // ✅ AJOUTÉ - manquant dans l'état initial
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [depRes, empRes] = await Promise.all([
          axios.get("http://localhost:8080/api/departements"),
          axios.get("http://localhost:8080/api/employes"),
        ]);
        setDepartments(depRes.data);
        setEmployees(empRes.data);
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
        setMessage({ 
          type: "error", 
          text: "Impossible de charger les données !" 
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (field, value) => {
    setNewManager(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ✅ VALIDATION AMÉLIORÉE
    if (!newManager.employeId || !newManager.departementId || !newManager.dateDebut) {
      setMessage({ 
        type: "error", 
        text: "Veuillez remplir l'employé, le département et la date de début !" 
      });
      return;
    }

    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      // ✅ PAYLOAD CORRIGÉ - Structure cohérente avec votre API
      const payload = {
        manager: {
          employe: { id: newManager.employeId },
          dateDebut: newManager.dateDebut,
          dateFin: newManager.dateFin || null  // ✅ NULL si vide
        },
        departement: { id: newManager.departementId }
      };

      const response = await axios.post(
        "http://localhost:8080/api/managers/insertManagerDepartment",
        payload
      );

      // ✅ GESTION DE RÉPONSE AMÉLIORÉE
      if (response.data.status === "success") {
        setMessage({ 
          type: "success", 
          text: response.data.message || "✅ Manager ajouté avec succès !" 
        });
        
        // ✅ RÉINITIALISATION COMPLÈTE
        setNewManager({ 
          employeId: "", 
          departementId: "", 
          dateDebut: "", 
          dateFin: "" 
        });
      } else {
        setMessage({ 
          type: "error", 
          text: response.data.message || "❌ Erreur lors de l'ajout !" 
        });
      }

    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
      
      // ✅ GESTION D'ERREUR DÉTAILLÉE
      let errorMessage = "Erreur lors de l'ajout du manager !";
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.code === "NETWORK_ERROR") {
        errorMessage = "Problème de connexion au serveur";
      }
      
      setMessage({ 
        type: "error", 
        text: errorMessage 
      });
    } finally {
      setSaving(false);
    }
  };

  // ✅ RÉINITIALISER LE MESSAGE APRÈS 5 SECONDES
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message.text]);

  if (loading) return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
        <span className="ms-2">Chargement des employés et départements...</span>
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <h2 className="text-primary">➕ Ajouter un nouveau Manager</h2>
      
      {/* ✅ AFFICHAGE DES MESSAGES */}
      {message.text && (
        <div className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"} mt-3`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card p-4 mt-3 shadow-sm">
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label fw-bold">Employé *</label>
            <select
              className="form-select"
              value={newManager.employeId}
              onChange={e => handleChange("employeId", e.target.value)}
              required
            >
              <option value="">-- Sélectionner un employé --</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>
                  {emp.nom} {emp.prenom} ({emp.matricule || emp.id})
                </option>
              ))}
            </select>
          </div>
          
          <div className="col-md-6">
            <label className="form-label fw-bold">Département *</label>
            <select
              className="form-select"
              value={newManager.departementId}
              onChange={e => handleChange("departementId", e.target.value)}
              required
            >
              <option value="">-- Sélectionner un département --</option>
              {departments.map(dep => (
                <option key={dep.id} value={dep.id}>
                  {dep.nom}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
            <label className="form-label fw-bold">Date début d'assignation *</label>
            <input
              type="date"
              className="form-control"
              value={newManager.dateDebut}
              onChange={(e) => handleChange("dateDebut", e.target.value)}
              required
            />
            <div className="form-text">Date à partir de laquelle le manager gère ce département</div>
          </div>
          
          <div className="col-md-6">
            <label className="form-label fw-bold">Date fin d'assignation</label>
            <input
              type="date"
              className="form-control"
              value={newManager.dateFin}
              onChange={(e) => handleChange("dateFin", e.target.value)}
            />
            <div className="form-text">Laisser vide si l'assignation est toujours en cours</div>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <button 
            type="submit" 
            className="btn btn-success px-4" 
            disabled={saving}
          >
            {saving ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Enregistrement...
              </>
            ) : (
              "➕ Ajouter le Manager"
            )}
          </button>
          
          <small className="text-muted">
            * Champs obligatoires
          </small>
        </div>
      </form>
    </div>
  );
};

export default AddManager;