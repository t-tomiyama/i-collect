import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookHeart,
  Mail,
  Lock,
  ArrowRight,
  User,
  Eye,
  EyeOff,
} from "lucide-react";

// Atualizado para importar o CSS compartilhado
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

const Register = ({ onRegister, themeHex, darkMode }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({
      name: formData.name,
      email: formData.email,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="app-container">
      <PhotocardsBackground />

      <div className="login-card theme-lavender">
        <div className="login-header">
          <div className="icon-wrapper">
            <BookHeart size={32} strokeWidth={2} />
          </div>
          <h1>Criar Conta</h1>
          <p>Crie sua conta e organize sua coleção!</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-inputs">
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Seu nome"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <span className="input-icon">
                <User size={20} />
              </span>
            </div>

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
                placeholder="Crie uma senha"
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

          <button
            type="submit"
            className="btn login-button theme-lavender btn-primary"
          >
            <span>Criar Conta</span>
            <ArrowRight size={20} strokeWidth={2.5} />
          </button>
        </form>

        <p className="signup-text">
          Já tem uma conta?{" "}
          <a
            href="#"
            className="signup-link"
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
          >
            Entrar
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
