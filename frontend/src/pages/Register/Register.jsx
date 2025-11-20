import React, { useState, useEffect } from "react";
import { dashboardAPI } from "../services/api";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Tenta recuperar o user do localStorage
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      // Se não tem usuário, não tenta carregar nada e redireciona (opcional)
      setLoading(false);
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    const loadDashboard = async () => {
      try {
        const dashboardData = await dashboardAPI.getDashboardData(
          parsedUser.id
        );
        setData(dashboardData);
      } catch (error) {
        console.error("Erro dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);
  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Carregando Dashboard...
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Faça login para ver o dashboard.
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h1>Olá, {user?.name || "Colecionador"}!</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Photocards</h3>
          <p>{data?.stats?.total || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
