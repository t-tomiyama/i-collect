import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Bell,
  Search,
  Menu,
  Moon,
  Sun,
  Sparkles,
  Palette,
  BookHeart,
  CheckCircle2,
} from "lucide-react";

import "../pages/Dashboard/Dashboard.css";
import userDefaultIcon from "../assets/icon.png";

export function Header({
  user,
  onLogout,
  darkMode,
  setDarkMode,
  currentTheme,
  setCurrentTheme,
  THEMES,
  sidebarOpen,
  setSidebarOpen,
  onSearchSubmit,
}) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifRef = useRef(null);
  const colorPickerRef = useRef(null);
  const userMenuRef = useRef(null);

  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearchSubmit(query);
      setQuery("");
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target)
      ) {
        setShowColorPicker(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [notifRef, colorPickerRef, userMenuRef]);

  const userAvatarSrc = user?.avatarUrl || userDefaultIcon;

  return (
    <header className={`header ${darkMode ? "dark" : ""}`}>
      <div className="header-left">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="header-button mobile-menu-toggle"
        >
          <Menu size={20} />
        </button>
        <Link to="/dashboard">
          <div className="logo">
            <div className="logo__icon-wrapper">
              <BookHeart size={22} className="logo__icon" />
            </div>
            <h1 className="logo__text">
              i-<span className="logo__text--highlight">collect</span>
              <Sparkles size={16} className="logo__sparkles" />
            </h1>
          </div>
        </Link>
      </div>

      <div className="header-center">
        <form className="search-bar" onSubmit={handleSubmit}>
          <Search size={18} className="search-bar__icon" />
          <input
            type="text"
            placeholder="Pesquisa global (cards, artistas...)"
            className="search-bar__input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>

      <div className="header-right">
        <div className="header-action-wrapper" ref={colorPickerRef}>
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className={`header-button ${showColorPicker ? "active" : ""}`}
            title="Mudar tema"
          >
            <Palette size={20} />
            <span className="theme-picker__dot" />
          </button>
          {showColorPicker && (
            <div className="dropdown-menu theme-picker__menu">
              {Object.entries(THEMES).map(([key, t]) => (
                <button
                  key={key}
                  onClick={() => setCurrentTheme(key)}
                  className="theme-picker__swatch"
                  data-theme-color={key}
                  title={t.name}
                >
                  {currentTheme === key && (
                    <div className="theme-picker__swatch-active" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="header-action-wrapper">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="header-button"
            title={darkMode ? "Ativar Modo Claro" : "Ativar Modo Escuro"}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {user && (
          <div className="header-action-wrapper" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`header-button ${showNotifications ? "active" : ""}`}
              title="Notificações"
            >
              <Bell size={20} />
              <span className="notifications__dot" />
            </button>
            {showNotifications && (
              <div className="dropdown-menu notifications__menu">
                <div className="notifications__header">
                  <h3>Notificações</h3>
                  <button className="notifications__mark-read">
                    Limpar tudo
                  </button>
                </div>
                <div className="notifications__list">
                  <div className="notifications__item unread welcome-notification">
                    <div className="notifications__item-icon-wrapper">
                      <Sparkles
                        size={18}
                        className="notifications__item-icon"
                      />
                    </div>
                    <div className="notifications__item-content">
                      <div className="notifications__item-header">
                        <p style={{ fontWeight: "bold" }}>
                          Bem-vindo ao i-collect!
                        </p>
                        <span style={{ fontSize: "0.7rem" }}>Agora</span>
                      </div>
                      <p className="notifications__item-desc">
                        O sistema está ativo. Confira os recursos funcionais:
                      </p>
                      <ul className="notifications__feature-list">
                        <li className="notifications__feature-item">
                          <CheckCircle2 size={14} className="feature-icon" />
                          <span>
                            Busca de Artistas, Álbuns, Idols e Photocards
                          </span>
                        </li>
                        <li className="notifications__feature-item">
                          <CheckCircle2 size={14} className="feature-icon" />
                          <span>Pagamentos</span>
                        </li>
                      </ul>
                    </div>
                    <div className="notifications__item-unread-dot" />
                  </div>

                  <div className="notifications__item unread">
                    <div className="notifications__item-icon-wrapper">
                      <Sparkles
                        size={18}
                        className="notifications__item-icon"
                      />
                    </div>
                    <div className="notifications__item-content">
                      <div className="notifications__item-header">
                        <p style={{ fontWeight: "bold" }}>
                          Utilizar login de teste:
                        </p>
                        <span style={{ fontSize: "0.7rem" }}>Agora</span>
                      </div>
                      <ul className="notifications__feature-list">
                        <li className="notifications__feature-item">
                          <CheckCircle2 size={14} className="feature-icon" />
                          <span>shenmaomao@gmail.com</span>
                        </li>
                        <li className="notifications__feature-item">
                          <CheckCircle2 size={14} className="feature-icon" />
                          <span>y0n6eR*c1H%</span>
                        </li>
                      </ul>
                    </div>
                    <div className="notifications__item-unread-dot" />
                  </div>
                </div>

                <div className="notifications__footer">
                  <button>Ver histórico completo</button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="header-action-wrapper" ref={userMenuRef}>
          <button
            className={`user-avatar ${!user ? "logged-out" : ""}`}
            title={user ? `Logado como ${user.name}` : "Usuário"}
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="user-avatar__inner">
              <img src={userAvatarSrc} alt="Icon do Usuário" />
            </div>
          </button>

          {showUserMenu && (
            <div className="dropdown-menu user-menu">
              {user ? (
                <>
                  <button className="user-menu__item">Seu Perfil</button>
                  <button className="user-menu__item">Configurações</button>
                  <div className="user-menu__divider"></div> */
                  <button
                    className="user-menu__item user-menu__item--danger"
                    onClick={onLogout}
                  >
                    Sair
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="user-menu__item">
                    Fazer Login
                  </Link>
                  <Link to="/register" className="user-menu__item">
                    Criar Conta
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
