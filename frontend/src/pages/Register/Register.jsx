import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookHeart,
  Mail,
  Lock,
  ArrowRight,
  User,
  Eye,
  EyeOff,
  AtSign,
  Globe,
  AlertCircle,
} from "lucide-react";

import { authAPI } from "../../services/api";
import "../../App.css";

// Função auxiliar para Cookies
const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie =
    name + "=" + (value || "") + expires + "; path=/; SameSite=Strict";
};

const PhotocardsBackground = () => <div className="photocards-bg"></div>;

const Register = ({ onRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [socialMedias, setSocialMedias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    username: "", // CORRIGIDO: era app_username
    email: "",
    password: "",
    social_media_id: "",
    social_media_handle: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const loadSocials = async () => {
      try {
        const res = await authAPI.getSocialMedias();
        if (res.success) setSocialMedias(res.data);
        else
          setSocialMedias([
            { id: 1, name: "Instagram" },
            { id: 2, name: "Twitter" },
          ]);
      } catch (err) {
        setSocialMedias([
          { id: 1, name: "Instagram" },
          { id: 2, name: "Twitter" },
        ]);
      }
    };
    loadSocials();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Chama a API
      const response = await authAPI.register(formData);

      if (response.success) {
        const { token, user } = response.data;

        // 2. SALVAR SESSÃO
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(user));
        setCookie("authToken", token, 1);

        // 3. Atualiza estado global
        if (onRegister) {
          onRegister(user, token);
        }

        // 4. Navega para o Dashboard
        navigate("/dashboard");
      } else {
        // Caso o sucesso seja false (mas status 200 - raro na sua config atual)
        setError(response.error || "Erro ao criar conta.");
      }
    } catch (err) {
      console.error("Erro detalhado:", err.response);

      // MELHORIA NO TRATAMENTO DE ERRO
      if (err.response && err.response.data && err.response.data.error) {
        // Mostra o erro que veio do Backend (ex: "Email já cadastrado")
        setError(err.response.data.error);
      } else {
        setError("Erro de conexão. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <PhotocardsBackground />

      <div className="login-card theme-lavender">
        <div className="login-header">
          <div className="icon-wrapper">
            <BookHeart size={32} strokeWidth={2} />
          </div>
          <h1>Junte-se a nós!</h1>
          <p>Crie sua conta de Coletor(a)</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div
              style={{
                backgroundColor: "#fee2e2",
                color: "#b91c1c",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "1rem",
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <div className="form-inputs">
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Nome"
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
                type="text"
                name="username"
                placeholder="Username"
                className="form-input"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <span className="input-icon">
                <AtSign size={20} />
              </span>
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
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
                placeholder="Senha"
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

            <div
              className="divider"
              style={{ margin: "1rem 0", borderTop: "1px dashed #ccc" }}
            ></div>
            <p
              style={{
                fontSize: "0.85rem",
                color: "#666",
                marginBottom: "0.5rem",
              }}
            >
              Dados do Coletor:
            </p>

            <div className="input-group">
              <select
                name="social_media_id"
                className="form-input"
                value={formData.social_media_id}
                onChange={handleChange}
                required
                style={{ appearance: "none" }}
              >
                <option value="" disabled>
                  Selecione a Rede Principal
                </option>
                {socialMedias.map((sm) => (
                  <option key={sm.id} value={sm.id}>
                    {sm.name}
                  </option>
                ))}
              </select>
              <span className="input-icon">
                <Globe size={20} />
              </span>
            </div>

            <div className="input-group">
              <input
                type="text"
                name="social_media_handle"
                placeholder="Seu @usuario na rede (sem @)"
                className="form-input"
                value={formData.social_media_handle}
                onChange={handleChange}
                required
              />
              <span className="input-icon">
                <AtSign size={20} />
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="btn login-button theme-lavender btn-primary"
            style={{ marginTop: "1.5rem", opacity: loading ? 0.7 : 1 }}
            disabled={loading}
          >
            <span>
              {loading ? "Criando conta..." : "Cadastrar e Virar Coletor"}
            </span>
            {!loading && <ArrowRight size={20} strokeWidth={2.5} />}
          </button>
        </form>

        <p className="signup-text">
          Já tem conta?{" "}
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
