import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Ghost, ArrowLeft, Home } from "lucide-react";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();
  const [themeClass, setThemeClass] = useState("theme-pink"); // Tema padrão

  useEffect(() => {
    // Tenta recuperar o tema salvo, senão usa 'pink'
    const storedTheme = localStorage.getItem("i-collect-theme") || "pink";
    setThemeClass(`theme-${storedTheme}`);
  }, []);

  const handleGoToDashboard = () => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div className={`not-found-container ${themeClass}`}>
      <div className="not-found-content">
        <div className="not-found-icon-wrapper">
          <Ghost size={80} className="floating-ghost" />
          <span className="ghost-shadow"></span>
        </div>

        <h1 className="error-code">404</h1>
        <h2 className="error-title">Página não encontrada!</h2>
        <p className="error-message">
          Parece que a página que você está procurando não existe. Ela pode ter
          sido movida, deletada ou nunca existiu.
        </p>

        <div className="not-found-button-group">
          <button onClick={() => navigate(-1)} className="btn btn-secondary">
            <ArrowLeft size={18} />
            Voltar
          </button>

          <button onClick={handleGoToDashboard} className="btn btn-primary">
            <Home size={18} />
            Ir para {localStorage.getItem("user") ? "Dashboard" : "Home"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
