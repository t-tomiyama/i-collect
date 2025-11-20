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

const Register = ({ onRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [socialMedias, setSocialMedias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    social_media_id: "",
    social_media_handle: "",
  });

  const navigate = useNavigate();

  // Carrega as redes sociais ao abrir a página
  useEffect(() => {
    const loadSocials = async () => {
      try {
        const res = await authAPI.getSocialMedias();
        if (res.success) setSocialMedias(res.data);
        else throw new Error("Falha ao carregar redes");
      } catch (err) {
        // Fallback caso a API falhe, para não quebrar a UI
        setSocialMedias([
          { id: 1, name: "Instagram" },
          { id: 2, name: "Twitter/X" },
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
      [e.target.name]: parseInt(e.target.value, 10),
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.social_media_id) {
      setError("Selecione uma rede social.");
      setLoading(false);
      return;
    }

    const payload = {
      name: formData.name.trim(),
      username: formData.username.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      social_media_id: Number(formData.social_media_id),
      social_media_handle: formData.social_media_handle.trim().replace("@", ""),
    };

    if (!payload.social_media_handle) {
      setError("O handle da rede social é obrigatório.");
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.register(payload);

      if (response.success) {
        const { token, user } = response.data;

        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(user));

        if (onRegister) {
          onRegister(user);
        }

        navigate("/dashboard");
      } else {
        setError(response.error || "Erro ao criar conta.");
      }
    } catch (err) {
      console.error("Erro no registro:", err);
      const msg =
        err.response?.data?.error || "Erro ao conectar com o servidor.";
      setError(msg);
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

            <div className="input-group">
              <select
                name="social_media_id"
                className="form-input"
                value={formData.social_media_id}
                onChange={handleSelectChange}
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
