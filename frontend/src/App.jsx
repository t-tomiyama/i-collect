import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import NotFound from "./pages/NotFound/NotFound";
import { SearchPage } from "./pages/SearchPage/SearchPage";

const ProtectedRoute = ({ children, user }) => {
  // Se não tem usuário, vai pro login
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppRoutes = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Erro ao parsear usuário", e);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  const ProtectedDashboard = () => (
    <Dashboard onLogout={handleLogout} user={user} />
  );

  const isRealUser = user && !user.isGuest;

  return (
    <Routes>
      <Route
        path="/"
        element={
          isRealUser ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/login"
        element={
          isRealUser ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Login onLogin={handleLogin} />
          )
        }
      />

      <Route
        path="/register"
        element={
          isRealUser ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Register onRegister={handleLogin} />
          )
        }
      />

      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute user={user}>
            <ProtectedDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/searchpage"
        element={
          <ProtectedRoute user={user}>
            <ProtectedDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/binders/*"
        element={
          <ProtectedRoute user={user}>
            <ProtectedDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payments"
        element={
          <ProtectedRoute user={user}>
            <ProtectedDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/section/*"
        element={
          <ProtectedRoute user={user}>
            <ProtectedDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
