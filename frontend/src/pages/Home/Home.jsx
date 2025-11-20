import React from "react";
import { Link } from "react-router-dom";
import { BookHeart, ArrowRight } from "lucide-react";

// Importa o CSS compartilhado
import "../../App.css";

// Reutilizando o componente de background que você criou
// (Este componente também está no seu Login.jsx)
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

const Home = () => {
  return (
    <div className="app-container">
      <PhotocardsBackground />

      {/* Reutiliza o estilo .login-card para o efeito de vidro */}
      <div className="login-card">
        {/* Reutiliza o .login-header */}
        <div className="login-header">
          <div className="icon-wrapper">
            <BookHeart size={32} strokeWidth={2} />
          </div>
          <h1>i-collect</h1>
          <p>Seu binder digital de photocards. ✨</p>
        </div>

        {/* Descrição da Home */}
        <div
          style={{
            padding: "0 1rem",
            textAlign: "center",
            color: "var(--gray-500)",
            fontWeight: 600,
            marginBottom: "2rem",
            fontSize: "1rem",
          }}
        >
          <p>
            Guarde, organize e gerencie sua coleção de k-pop em um só lugar.
            Gerencie suas compras, vendas e CEGs!
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* CORREÇÃO AQUI: "/Login" -> "/login" */}
          <Link to="/login" className="btn login-button">
            <span>Fazer Login</span>
            <ArrowRight size={20} strokeWidth={2.5} />
          </Link>

          <Link to="/register" className="btn btn-secondary">
            <span>Criar uma conta</span>
          </Link>

          <Link to="/dashboard" className="btn guest-button">
            <span>Entrar como visitante</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
