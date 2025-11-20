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
  Smartphone,
  Globe,
} from "lucide-react";

import "../../App.css";

const PhotocardsBackground = () => {
  return <div className="photocards-bg"></div>;
};

const Register = ({ onRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [socialMedias, setSocialMedias] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    app_username: "",
    email: "",
    password: "",
    social_media_id: "",
    social_media_handle: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const mockSocials = [
      { id: 1, name: "Instagram" },
      { id: 2, name: "Twitter" },
      { id: 3, name: "TikTok" },
    ];

    fetch("https://i-collect-backend.onrender.com/api/social-medias")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setSocialMedias(data.data);
        else setSocialMedias(mockSocials);
      })
      .catch(() => setSocialMedias(mockSocials));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formData);
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
          <h1>Junte-se a nós!</h1>
          <p>Crie sua conta de Coletor(a)</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-inputs">
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Nome Completo"
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
                name="app_username"
                placeholder="Usuário para Login (Sistema)"
                className="form-input"
                value={formData.app_username}
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
            style={{ marginTop: "1.5rem" }}
          >
            <span>Cadastrar e Virar Coletor</span>
            <ArrowRight size={20} strokeWidth={2.5} />
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
