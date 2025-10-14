import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ArchivedEmployees = () => {
  const navigate = useNavigate();

  // 🔹 Données statiques simulées
  const [archivedEmployees] = useState([
    {
      id: 1,
      nom: "Rakoto Andry",
      poste: "Comptable",
      service: "Finance",
      dateEntree: "2018-05-12",
      dateSortie: "2024-07-01",
      motif: "Retraite",
      statut: "Retraité",
    },
    {
      id: 2,
      nom: "Rabe Lalatiana",
      poste: "Secrétaire",
      service: "Administration",
      dateEntree: "2020-03-08",
      dateSortie: "2025-01-10",
      motif: "Fin de contrat",
      statut: "Inactif",
    },
    {
      id: 3,
      nom: "Randria Feno",
      poste: "Technicien",
      service: "Maintenance",
      dateEntree: "2019-09-20",
      dateSortie: "2023-11-15",
      motif: "Démission",
      statut: "Démissionnaire",
    },
  ]);

  const viewDetails = (id) => {
    navigate(`/dashboard-RH/employees/${id}/personnel`, { state: { archived: true } });
  };

  const restoreEmployee = (id) => {
    alert(`✅ Employé #${id} restauré avec succès !`);
  };

  const deleteEmployee = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer définitivement cet employé ?")) {
      alert(`🗑️ Employé #${id} supprimé définitivement.`);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold text-primary">
          <i className="bi bi-archive me-2"></i>Employés Archivés
        </h4>
        <span className="badge bg-secondary p-2">
          {archivedEmployees.length} employé(s) archivé(s)
        </span>
      </div>

      <Table bordered hover responsive className="align-middle shadow-sm">
        <thead className="table-dark text-center">
          <tr>
            <th>#</th>
            <th>Nom & Prénom</th>
            <th>Poste</th>
            <th>Service</th>
            <th>Date d’entrée</th>
            <th>Date de sortie</th>
            <th>Motif</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {archivedEmployees.map((emp, index) => (
            <tr key={emp.id}>
              <td>{index + 1}</td>
              <td>{emp.nom}</td>
              <td>{emp.poste}</td>
              <td>{emp.service}</td>
              <td>{emp.dateEntree}</td>
              <td>{emp.dateSortie}</td>
              <td>{emp.motif}</td>
              <td>
                <span
                  className={`badge ${
                    emp.statut === "Retraité"
                      ? "bg-success"
                      : emp.statut === "Démissionnaire"
                      ? "bg-warning text-dark"
                      : "bg-secondary"
                  }`}
                >
                  {emp.statut}
                </span>
              </td>
              <td>
                <div className="d-flex justify-content-center gap-2">
                  <Button
                    variant="outline-info"
                    size="sm"
                    onClick={() => viewDetails(emp.id)}
                    title="Voir détails"
                  >
                    <i className="bi bi-eye"></i>
                  </Button>
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => restoreEmployee(emp.id)}
                    title="Restaurer"
                  >
                    <i className="bi bi-arrow-clockwise"></i>
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => deleteEmployee(emp.id)}
                    title="Supprimer définitivement"
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ArchivedEmployees;
