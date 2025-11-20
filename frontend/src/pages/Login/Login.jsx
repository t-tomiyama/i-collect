import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookHeart,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import "../../App.css";

// URL do seu backend no Render (ajuste conforme necessário)
const API_URL = "https://i-collect-backend.onrender.com//api";

const PhotocardsBackground = () => {
  const HeartIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );

  return (
    <div className="photocards-bg">
      {/* Cards mantidos igual ao original */}
      <div className="photocard card-1">
        <div className="card-inner bg-pink">
          <HeartIcon />
        </div>
      </div>
      <div className="photocard card-2">
        <div className="card-inner bg-blue">
          <HeartIcon />
        </div>
      </div>
      <div className="photocard card-3">
        <div className="card-inner bg-purple">
          <HeartIcon />
        </div>
      </div>
      <div className="photocard card-4">
        <div className="card-inner bg-yellow">
          <HeartIcon />
        </div>
      </div>
      <div className="photocard card-5">
        <div className="card-inner bg-green-pastel">
          <HeartIcon />
        </div>
      </div>
      <div className="photocard card-6">
        <div className="card-inner bg-pink-pastel">
          <HeartIcon />
        </div>
      </div>
    </div>
  );
};

const Login = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // Estado para erros
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Limpa o erro ao digitar
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Passa o usuário e o token para o App.js
        onLogin(data.data.user, data.data.token);
        navigate("/dashboard");
      } else {
        setError(data.error || "Falha ao fazer login");
      }
    } catch (err) {
      console.error(err);
      setError("Erro de conexão com o servidor. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <PhotocardsBackground />
      <div className="login-card">
        <div className="login-header theme-lavender">
          <div className="icon-wrapper">
            <BookHeart size={32} strokeWidth={2} />
          </div>
          <h1>i-collect</h1>
          <p>Bem-vindo(a) de volta!</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Mensagem de Erro */}
          {error && (
            <div
              className="error-message"
              style={{
                color: "#ef4444",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.9rem",
              }}
            >
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="form-inputs">
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="seu@email.com"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <span className="input-icon">
                <Mail size={20} />
              </span>
            </div>

            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className="form-input has-right-icon"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span className="input-icon">
                <Lock size={20} />
              </span>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="input-icon-right"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Lembrar de mim</span>
            </label>
            <a
              href="#"
              className="forgot-link"
              onClick={(e) => e.preventDefault()}
            >
              Esqueceu a senha?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn login-button theme-lavender btn-primary"
            style={{ opacity: isLoading ? 0.7 : 1 }}
          >
            <span>{isLoading ? "Entrando..." : "Entrar"}</span>
            {!isLoading && <ArrowRight size={20} strokeWidth={2.5} />}
          </button>
        </form>

        {/* Resto do componente (Botão visitante, social login, etc) mantido igual */}
        <button
          type="button"
          className="btn guest-button"
          onClick={() => navigate("/dashboard")}
        >
          <span>Acessar como visitante</span>
        </button>

        <div className="divider">
          <span className="divider-text">ou conecte-se com</span>
        </div>

        <div className="social-login">{/* ... botões sociais ... */}</div>

        <p className="signup-text">
          Novo por aqui?{" "}
          <a
            href="#"
            className="signup-link"
            onClick={(e) => {
              e.preventDefault();
              navigate("/register");
            }}
          >
            Crie uma conta
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
