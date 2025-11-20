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

  const handleSelectChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: parseInt(e.target.value, 10), // Converte "1" para 1
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validação robusta no frontend
    if (!formData.social_media_id) {
      setError("Selecione uma rede social.");
      setLoading(false);
      return;
    }

    // Preparar payload garantindo tipos corretos
    const payload = {
      name: formData.name.trim(),
      username: formData.username.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      social_media_id: Number(formData.social_media_id),
      social_media_handle: formData.social_media_handle.trim().replace("@", ""),
    };

    // Validação final
    if (!payload.social_media_handle) {
      setError("O handle da rede social é obrigatório.");
      setLoading(false);
      return;
    }

    try {
      console.log("Enviando payload:", payload);
      const response = await authAPI.register(payload);

      if (response.success) {
        const { token, user } = response.data;

        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(user));
        setCookie("authToken", token, 1);

        if (onRegister) {
          onRegister(user, token);
        }

        navigate("/dashboard");
      } else {
        setError(response.error || "Erro ao criar conta.");
      }
    } catch (err) {
      console.error("Erro completo no registro:", err);

      // Tratamento de erro aprimorado
      if (err.response?.data) {
        setError(err.response.data.error || "Erro no servidor.");
      } else if (err.code === "ERR_NETWORK") {
        setError("Erro de conexão. Verifique sua internet.");
      } else {
        setError("Erro inesperado. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* ... (PhotocardsBackground e Header do Card mantidos) ... */}
      <PhotocardsBackground />
      <div className="login-card theme-lavender">
        <div className="login-header">
          {/* ... ícone e titulo ... */}
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
            {/* ... Inputs de Texto (Name, Username, Email, Password) usam handleChange ... */}
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
                placeholder="Usuário Login"
                className="form-input"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <span className="input-icon">
                <Lock size={20} />
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

            {/* SELECT DA REDE SOCIAL - Usa handleSelectChange ou o handleChange modificado */}
            <div className="input-group">
              <select
                name="social_media_id"
                className="form-input"
                value={formData.social_media_id}
                onChange={handleSelectChange} // AQUI: Use a função que converte para Int
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
                placeholder="Seu @ na rede"
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
            <span>{loading ? "Criando..." : "Cadastrar"}</span>
            {!loading && <ArrowRight size={20} strokeWidth={2.5} />}
          </button>
        </form>
        {/* ... Footer de login ... */}
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
