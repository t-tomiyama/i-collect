import React, { useState, useEffect } from "react";
import {
  Search,
  Facebook,
  Instagram,
  Twitter,
  User,
  Store,
  Package,
  Heart,
} from "lucide-react";
import "./CommunityPage.css";
import { api } from "../../services/api";

// Ícones mapeados pelo nome do banco
const SocialIcon = ({ network }) => {
  const size = 18;
  const name = network.toLowerCase();

  if (name.includes("facebook"))
    return <Facebook size={size} className="social-icon fb" />;
  if (name.includes("instagram"))
    return <Instagram size={size} className="social-icon insta" />;
  if (name.includes("twitter") || name.includes("x"))
    return <Twitter size={size} className="social-icon tw" />;

  return null;
};

export const CommunityPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        await new Promise((r) => setTimeout(r, 800));
        setUsers([
          {
            id: 1,
            user_name: "Vitória",
            username: "yqfiles",
            is_collector: true,
            is_gom: false,
            is_seller: true,
            socials: [{ network: "Twitter", link: "#" }],
          },
          {
            id: 2,
            user_name: "Bloom Store",
            username: "bloom2you",
            is_collector: true,
            is_gom: true,
            is_seller: true,
            socials: [
              { network: "Twitter", link: "#" },
              { network: "Instagram", link: "#" },
            ],
          },
          {
            id: 3,
            user_name: "G_Nox",
            username: "hourlyuqi",
            is_collector: true,
            is_gom: false,
            is_seller: false,
            socials: [{ network: "Twitter", link: "#" }],
          },
        ]);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar usuários", error);
        setLoading(false);
      }
    };

    fetchCommunity();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="community-page fade-in">
      <div className="community-header">
        <div>
          <h1>Comunidade</h1>
          <p>Encontre colecionadores, GOMs e lojas.</p>
        </div>

        <div className="search-bar-wrapper">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por nome ou @username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="community-search-input"
          />
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="users-grid">
          {filteredUsers.map((user) => (
            <div key={user.id} className="user-card">
              <div className="user-card-header">
                <div className="avatar-placeholder">
                  {user.user_name.charAt(0).toUpperCase()}
                </div>
                <div className="user-info">
                  <h3>{user.user_name}</h3>
                  <span className="username">@{user.username}</span>
                </div>
              </div>

              <div className="badges-container">
                {user.is_collector && (
                  <span className="badge badge-collector" title="Collector">
                    <Heart size={12} fill="currentColor" /> Collector
                  </span>
                )}
                {user.is_gom && (
                  <span className="badge badge-gom" title="Group Order Manager">
                    <Package size={12} /> GOM
                  </span>
                )}
                {user.is_seller && (
                  <span className="badge badge-seller" title="Seller">
                    <Store size={12} /> Seller
                  </span>
                )}
              </div>

              <div className="divider"></div>

              <div className="user-card-footer">
                <div className="socials-row">
                  {user.socials && user.socials.length > 0 ? (
                    user.socials.map((social, idx) => (
                      <a
                        key={idx}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        title={social.network}
                      >
                        <SocialIcon network={social.network} />
                      </a>
                    ))
                  ) : (
                    <span className="no-socials">Sem redes vinculadas</span>
                  )}
                </div>
                <button className="btn-profile">Ver Perfil</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
