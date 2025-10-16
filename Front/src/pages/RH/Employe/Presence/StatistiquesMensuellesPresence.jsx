import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";

const StatistiquesMensuellesPresence = () => {
  const data = [
    { mois: "Jan", presence: 95, absence: 5 },
    { mois: "Fév", presence: 90, absence: 10 },
    { mois: "Mars", presence: 92, absence: 8 },
    { mois: "Avr", presence: 85, absence: 15 },
    { mois: "Mai", presence: 88, absence: 12 },
    { mois: "Juin", presence: 94, absence: 6 },
    { mois: "Juil", presence: 91, absence: 9 },
    { mois: "Août", presence: 89, absence: 11 },
    { mois: "Sept", presence: 93, absence: 7 },
    { mois: "Oct", presence: 90, absence: 10 },
    { mois: "Nov", presence: 94, absence: 6 },
    { mois: "Déc", presence: 96, absence: 4 },
  ];

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">📊 Statistiques Mensuelles de Présence</h3>

        <div style={{ width: "100%", height: 400 }}>
          <ResponsiveContainer>
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mois" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="presence" fill="#0d6efd" name="Présence (%)" />
              <Line
                type="monotone"
                dataKey="absence"
                stroke="#dc3545"
                strokeWidth={2}
                name="Absence (%)"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <p className="text-muted text-center mt-3">
          *Les valeurs sont simulées à titre d’exemple. Adaptées pour la visualisation RH.
        </p>
      </div>
    </div>
  );
};

export default StatistiquesMensuellesPresence;
