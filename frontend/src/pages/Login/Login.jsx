import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookHeart, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import "../../App.css";

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
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ name: "Usuário Teste", email: formData.email });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="app-container">
      <PhotocardsBackground />
      <div className="login-card">
        <div className="login-header theme-lavender">
          {/* O CSS .icon-wrapper agora usa as cores Lavender do :root */}
          <div className="icon-wrapper">
            <BookHeart size={32} strokeWidth={2} />
          </div>
          <h1>i-collect</h1>
          <p>Bem-vindo(a) de vindo! </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
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
            className="btn login-button theme-lavender btn-primary"
          >
            <span>Entrar</span>
            <ArrowRight size={20} strokeWidth={2.5} />
          </button>
        </form>

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

        <div className="social-login">
          <button className="social-button google" disabled title="Em breve">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              ></path>
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              ></path>
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              ></path>
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              ></path>
            </svg>
          </button>
          <button className="social-button twitter" disabled title="Em breve">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </button>
        </div>

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
