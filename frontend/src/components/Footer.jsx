import React from "react";
import { BookHeart, Heart } from "lucide-react";

export default function Footer({ darkMode, themeHex }) {
  const accentColor = themeHex || "#ec4899";

  const SocialIcons = {
    Github: (props) => (
      <svg
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  };

  return (
    <footer
      className={`app-footer ${darkMode ? "dark" : ""}`}
      style={{ "--theme-color": accentColor }}
    >
      <div className="footer-container">
        <div className="footer-content">
          {/* Marca / Logo */}
          <div className="footer-brand">
            <div className="brand-logo-group">
              <div className="brand-icon-box">
                <BookHeart size={24} className="brand-icon-svg" />
              </div>
              <h3 className="brand-title">
                i-<span>collect</span>
              </h3>
            </div>

            <p className="brand-tagline">
              Feito por collectors para collectors!
              <Heart size={14} className="heart-pulse" />
            </p>

            <div className="social-links">
              <a href="https://github.com/t-tomiyama/i-collect">
                <button className="social-btn">
                  <SocialIcons.Github width="20" height="20" />
                </button>
              </a>
            </div>
          </div>
          <div className="footer-links-grid">
            <div className="footer-column">
              <span className="column-title">Plataforma</span>
              <a href="#" className="footer-link">
                Recursos
              </a>
              <a href="#" className="footer-link">
                Templates
              </a>
              <a href="#" className="footer-link">
                Preços
              </a>
            </div>

            <div className="footer-column">
              <span className="column-title">Suporte</span>
              <a href="#" className="footer-link">
                Central de Ajuda
              </a>
              <a href="#" className="footer-link">
                Status
              </a>
              <a href="#" className="footer-link">
                Reportar Bug
              </a>
            </div>

            <div className="footer-column">
              <span className="column-title">Legal</span>
              <a href="#" className="footer-link">
                Privacidade
              </a>
              <a href="#" className="footer-link">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} i-collect. Todos os direitos
            reservados.
          </p>
          <div className="version-info">
            <span>v1.5.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
