// src/pages/RH/Organisation/OrgChart.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tree, TreeNode } from "react-organizational-chart";
import { Card, Badge, Avatar, Tooltip, Spin, Alert } from "antd";
import { UserOutlined, TeamOutlined } from "@ant-design/icons";
import "../../../../assets/css/OrgChart.css";

const OrgChart = () => {
  const [departements, setDepartements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🧠 Charger les données depuis l’API
  useEffect(() => {
    const fetchOrganisation = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/organisation");
        setDepartements(response.data);
      } catch (err) {
        console.error("Erreur lors du chargement des données :", err);
        setError("Impossible de récupérer les données de l'organisation.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrganisation();
  }, []);

  // 👤 Composant d’un nœud d’employé
  const EmployeeNode = ({ employee, isManager }) => (
    <Tooltip
      title={`${employee.poste ?? "Employé"} - ${employee.departement ?? ""}`}
      placement="top"
    >
      <Card
        className={`employee-card ${isManager ? "manager-card" : ""}`}
        size="small"
      >
        <div className="employee-content">
          <Avatar
            size={40}
            icon={<UserOutlined />}
            className="employee-avatar"
            style={{
              backgroundColor: isManager ? "#1890ff" : "#52c41a",
            }}
          />
          <div className="employee-info">
            <div className="employee-name">
              {employee.nom} {employee.prenom}
            </div>
            <div className="employee-position">
              {isManager ? "Manager" : "Employé"}
            </div>
            <Badge
              count={employee.departement ?? ""}
              style={{
                backgroundColor: isManager ? "#1890ff" : "#52c41a",
                marginTop: "4px",
              }}
            />
          </div>
        </div>
      </Card>
    </Tooltip>
  );

  // 🌲 Rendu récursif d’un manager et ses employés
  const renderManagerTree = (managerEmployes) => {
    if (!managerEmployes || managerEmployes.length === 0) return null;

    return managerEmployes.map((relation, index) => {
      const manager = relation.manager?.employe;
      const employe = relation.employe;

      if (!manager || !employe) return null;

      return (
        <Tree
          key={index}
          lineWidth="2px"
          lineColor="#d9d9d9"
          lineBorderRadius="10px"
          label={<EmployeeNode employee={manager} isManager={true} />}
        >
          <TreeNode label={<EmployeeNode employee={employe} isManager={false} />} />
        </Tree>
      );
    });
  };

  if (loading) return <Spin tip="Chargement de l'organigramme..." />;
  if (error) return <Alert message={error} type="error" />;

  return (
    <div className="org-chart-container">
      <div className="org-chart-header">
        <h1>Organigramme de l'Entreprise</h1>
        <p>Structure hiérarchique et organisationnelle par département</p>
      </div>

      <div className="org-chart-content">
        {departements.map((dep, index) => (
          <div key={index} className="department-tree">
            <div className="department-header">
              <h2>{dep.departement.nom}</h2>
              <p>{dep.departement.description}</p>
            </div>

            {dep.les_employes_manager && dep.les_employes_manager.length > 0 ? (
              renderManagerTree(dep.les_employes_manager)
            ) : (
              <Alert
                message="Aucun manager ou employé dans ce département"
                type="info"
                showIcon
                style={{ marginTop: 10 }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="org-chart-legend">
        <div className="legend-item">
          <Avatar size={20} style={{ backgroundColor: "#1890ff" }} />
          <span>Managers</span>
        </div>
        <div className="legend-item">
          <Avatar size={20} style={{ backgroundColor: "#52c41a" }} />
          <span>Employés</span>
        </div>
      </div>
    </div>
  );
};

export default OrgChart;
