import React, { useState, useEffect } from "react";
import axios from "axios";

const AddManager = () => {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [newManager, setNewManager] = useState({
    employeId: "",       // <- nouvel ajout
    departementId: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
        alert("Impossible de charger les données !");
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
    if (!newManager.employeId || !newManager.departementId) {
      alert("Veuillez remplir l'employé et le département !");
      return;
    }

    setSaving(true);
    try {
      // Préparer le payload pour backend JPA
      const employe = employees.find(e => e.id === newManager.employeId);
      const departement = departments.find(d => d.id === newManager.departementId);

      const payload = {
        employe: employe,
        departement: departement,
        description: newManager.description
      };

      const response = await axios.post(
        "http://localhost:8080/api/managers",
        payload
      );
      alert(`✅ Manager ajouté avec succès !`);
      setNewManager({ employeId: "", departementId: "", description: "" });
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
      alert("Erreur lors de l'ajout du manager !");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Chargement des employés et départements...</p>;

  return (
    <div className="container mt-4">
      <h2>➕ Ajouter un nouveau Manager</h2>
      <form onSubmit={handleSubmit} className="card p-3 mt-3">
        <div className="row mb-3">
          <div className="col-md-4">
            <label>Employé :</label>
            <select
              className="form-select"
              value={newManager.employeId}
              onChange={e => handleChange("employeId", e.target.value)}
            >
              <option value="">-- Sélectionner --</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>
                  {emp.nom} {emp.prenom}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label>Département :</label>
            <select
              className="form-select"
              value={newManager.departementId}
              onChange={e => handleChange("departementId", e.target.value)}
            >
              <option value="">-- Sélectionner --</option>
              {departments.map(dep => (
                <option key={dep.id} value={dep.id}>
                  {dep.nom}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label>Description :</label>
            <input
              type="text"
              className="form-control"
              value={newManager.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-success" disabled={saving}>
          {saving ? "Enregistrement..." : "Ajouter le Manager"}
        </button>
      </form>
    </div>
  );
};

export default AddManager;
