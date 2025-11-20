import React, { useState, useEffect } from "react";
import { Search, Music, Users, Package, User, X } from "lucide-react";
import DetailsModal from "../../components/DetailsModal";
import "./SearchPage.css";

const API_URL = "https://i-collect-backend.onrender.com/api";

const TYPE_EXPLANATIONS = {
  Regular: "Photocard regular que vem dentro do álbum.",
  "Lucky Draw": "Photocard especial obtido em sorteios de eventos.",
  POB: "Pre-Order Benefit. Brinde exclusivo de pré-venda.",
};

const FILTERS = [
  { id: "photocards", name: "Photocards", icon: Package },
  { id: "releases", name: "Releases", icon: Music },
  { id: "idols", name: "Idols", icon: User },
  { id: "artists", name: "Artistas/Grupos", icon: Users },
];

const ReleaseCard = ({ title, artist, coverUrl, onClick }) => {
  return (
    <div
      className="release-card"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className="release-card__content">
        <img
          src="https://i.postimg.cc/ZqhVJxg3/CD.png"
          alt="CD"
          className="release-card__cd"
        />
        <img
          src={coverUrl}
          alt={`${title} cover`}
          className="release-card__cover"
        />
      </div>
      <div className="release-card__info">
        <h3>{title}</h3>
        <p>{artist}</p>
      </div>
    </div>
  );
};

export const SearchPage = ({ initialQuery = "" }) => {
  const [activeFilters, setActiveFilters] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Estados de Dados
  const [photocards, setPhotocards] = useState([]);
  const [releases, setReleases] = useState([]);
  const [idols, setIdols] = useState([]);
  const [artists, setArtists] = useState([]);

  // Estados do Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalData, setModalData] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  // Buscar dados iniciais
  useEffect(() => {
    fetchInitialData();
  }, []);

  // Buscar dados quando a query mudar
  useEffect(() => {
    if (searchQuery.trim()) {
      performSearch();
    } else {
      fetchInitialData();
    }
  }, [searchQuery]);

  const handleCardClick = async (type, id) => {
    if (modalOpen) setModalLoading(true);
    else setModalOpen(true);

    setModalType(type);
    setModalData(null); // Limpa dados anteriores

    if (!modalOpen) setModalLoading(true);

    try {
      const res = await fetch(`${API_URL}/search/details/${type}/${id}`);
      const json = await res.json();
      if (json.success) {
        setModalData(json.data);
      } else {
        console.error("Erro na resposta da API:", json);
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes:", error);
    } finally {
      setModalLoading(false);
    }
  };

  const fetchInitialData = async () => {
    setLoading(true);
    setError("");

    try {
      const [photocardsRes, releasesRes, idolsRes, artistsRes] =
        await Promise.all([
          fetch(`${API_URL}/search/photocards?limit=12`).then((res) =>
            res.json()
          ),
          fetch(`${API_URL}/search/releases?limit=12`).then((res) =>
            res.json()
          ),
          fetch(`${API_URL}/search/idols?limit=12`).then((res) => res.json()),
          fetch(`${API_URL}/search/artists?limit=12`).then((res) => res.json()),
        ]);

      if (photocardsRes.success) setPhotocards(photocardsRes.data || []);
      if (releasesRes.success) setReleases(releasesRes.data || []);
      if (idolsRes.success) setIdols(idolsRes.data || []);
      if (artistsRes.success) setArtists(artistsRes.data || []);
    } catch (err) {
      console.error("Erro ao buscar dados iniciais:", err);
      setError("Erro ao carregar dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const performSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError("");

    try {
      const searchPromises = [];

      if (activeFilters.size === 0 || activeFilters.has("photocards")) {
        searchPromises.push(
          fetch(
            `${API_URL}/search/photocards?q=${encodeURIComponent(searchQuery)}`
          )
            .then((res) => res.json())
            .then((data) => (data.success ? data.data : []))
        );
      }

      if (activeFilters.size === 0 || activeFilters.has("releases")) {
        searchPromises.push(
          fetch(
            `${API_URL}/search/releases?q=${encodeURIComponent(searchQuery)}`
          )
            .then((res) => res.json())
            .then((data) => (data.success ? data.data : []))
        );
      }

      if (activeFilters.size === 0 || activeFilters.has("idols")) {
        searchPromises.push(
          fetch(`${API_URL}/search/idols?q=${encodeURIComponent(searchQuery)}`)
            .then((res) => res.json())
            .then((data) => (data.success ? data.data : []))
        );
      }

      if (activeFilters.size === 0 || activeFilters.has("artists")) {
        searchPromises.push(
          fetch(
            `${API_URL}/search/artists?q=${encodeURIComponent(searchQuery)}`
          )
            .then((res) => res.json())
            .then((data) => (data.success ? data.data : []))
        );
      }

      const results = await Promise.allSettled(searchPromises);

      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          const data = result.value;
          if (index === 0) setPhotocards(data);
          else if (index === 1) setReleases(data);
          else if (index === 2) setIdols(data);
          else if (index === 3) setArtists(data);
        }
      });
    } catch (err) {
      console.error("Erro na busca:", err);
      setError("Erro ao realizar busca. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterClick = (filterId) => {
    setActiveFilters((prevFilters) => {
      const newFilters = new Set(prevFilters);
      if (newFilters.has(filterId)) {
        newFilters.delete(filterId);
      } else {
        newFilters.add(filterId);
      }
      return newFilters;
    });
  };

  // Aplicar filtros locais nos dados já carregados
  const getFilteredData = () => {
    const showAll = activeFilters.size === 0;
    const lowerQuery = searchQuery.toLowerCase();

    const filterByQuery = (data, fields) => {
      if (!searchQuery) return data;
      return data.filter((item) =>
        fields.some((field) =>
          item[field]?.toString().toLowerCase().includes(lowerQuery)
        )
      );
    };

    return {
      photocards:
        showAll || activeFilters.has("photocards")
          ? filterByQuery(photocards, ["name", "stage_name", "artist_name"])
          : [],
      releases:
        showAll || activeFilters.has("releases")
          ? filterByQuery(releases, ["name", "artist_name"])
          : [],
      idols:
        showAll || activeFilters.has("idols")
          ? filterByQuery(idols, ["stage_name", "name", "artist_name"])
          : [],
      artists:
        showAll || activeFilters.has("artists")
          ? filterByQuery(artists, ["name", "category"])
          : [],
    };
  };

  const isFilterActive = (filterId) => activeFilters.has(filterId);
  const {
    photocards: filteredPhotocards,
    releases: filteredReleases,
    idols: filteredIdols,
    artists: filteredArtists,
  } = getFilteredData();

  const hasResults =
    filteredPhotocards.length > 0 ||
    filteredReleases.length > 0 ||
    filteredIdols.length > 0 ||
    filteredArtists.length > 0;

  const showInitialState = !searchQuery && !loading;
  const showNoResults = searchQuery && !loading && !hasResults;

  return (
    <div className="search-page-container">
      {/* --- MODAL INSERIDO AQUI --- */}
      <DetailsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
        data={modalData}
        loading={modalLoading}
        onRelatedClick={handleCardClick}
      />

      <div className="search-bar-wrapper">
        <Search className="search-bar__icon" size={20} />
        <input
          type="text"
          className="search-bar__input"
          placeholder="Pesquisar photocards, releases, idols, artistas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            className="search-bar__clear-btn"
            onClick={() => setSearchQuery("")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0 1rem",
              color: "var(--color-text-muted)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <X size={18} />
          </button>
        )}
      </div>

      {error && (
        <div
          className="error-message"
          style={{
            color: "#ef4444",
            textAlign: "center",
            padding: "1rem",
            margin: "1rem 0",
          }}
        >
          {error}
        </div>
      )}

      <div className="search-filters">
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            className={`btn ${
              isFilterActive(filter.id) ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => handleFilterClick(filter.id)}
          >
            <filter.icon size={16} />
            <span>{filter.name}</span>
          </button>
        ))}
      </div>

      {loading && (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            color: "var(--color-text-muted)",
          }}
        >
          <div className="loading-spinner"></div>
          <p>Buscando...</p>
        </div>
      )}

      {showNoResults && (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            color: "var(--color-text-muted)",
          }}
        >
          <Search size={48} style={{ marginBottom: "1rem", opacity: 0.5 }} />
          <h3>Nenhum resultado encontrado para "{searchQuery}"</h3>
          <p>Tente termos diferentes ou remova os filtros.</p>
        </div>
      )}

      {showInitialState && (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            color: "var(--color-text-muted)",
          }}
        >
          <Search size={48} style={{ marginBottom: "1rem", opacity: 0.5 }} />
          <h3>Comece a pesquisar</h3>
          <p>
            Digite termos como nome de artistas, álbuns, idols ou photocards
          </p>
        </div>
      )}

      {!loading && filteredPhotocards.length > 0 && (
        <div className="search-section">
          <h2 className="search-section__title">Photocards</h2>
          <div className="photocard-grid">
            {filteredPhotocards.map((pc) => (
              <div
                key={pc.id}
                className="photocard-card"
                onClick={() => handleCardClick("photocards", pc.id)}
                style={{ cursor: "pointer" }}
              >
                <div className="photocard-card__image-wrapper">
                  <img
                    src={pc.front_image || pc.image_url || "/default-card.jpg"}
                    alt={pc.name}
                    className="photocard-card__image"
                  />
                </div>
                <div className="photocard-card__info">
                  <span className="photocard-card__name">
                    {pc.stage_name || pc.name}
                  </span>
                  {pc.artist_name && (
                    <span className="photocard-card__group">
                      {pc.artist_name}
                    </span>
                  )}
                  {pc.front_finish && (
                    <div className="photocard-tooltip-wrapper">
                      <span
                        className={`photocard-card__type-badge type-${pc.front_finish.toLowerCase()}`}
                      >
                        {pc.front_finish}
                      </span>
                      <div className="photocard-tooltip-content">
                        Acabamento: {pc.front_finish}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && filteredReleases.length > 0 && (
        <div className="search-section">
          <h2 className="search-section__title">Releases</h2>
          <div className="release-grid">
            {filteredReleases.map((release) => (
              <ReleaseCard
                key={release.id}
                title={release.name}
                artist={release.artist_name || "Artista"}
                coverUrl={release.cover || "/default-album.jpg"}
                onClick={() => handleCardClick("releases", release.id)}
              />
            ))}
          </div>
        </div>
      )}

      {!loading && filteredIdols.length > 0 && (
        <div className="search-section">
          <h2 className="search-section__title">Idols</h2>
          <div className="idol-grid">
            {filteredIdols.map((idol) => (
              <div
                key={idol.id}
                className="idol-card"
                onClick={() => handleCardClick("idols", idol.id)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={idol.image || "/default-idol.jpg"}
                  alt={idol.stage_name}
                  className="idol-card__image"
                />
                <div className="idol-card__info">
                  <strong>{idol.stage_name}</strong>
                  <span>{idol.artist_name || idol.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && filteredArtists.length > 0 && (
        <div className="search-section">
          <h2 className="search-section__title">Artistas/Grupos</h2>
          <div className="artist-grid">
            {filteredArtists.map((artist) => (
              <div
                key={artist.id}
                className="artist-card"
                onClick={() => handleCardClick("artists", artist.id)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={artist.image || "/default-artist.jpg"}
                  alt={artist.name}
                  className="artist-card__image"
                />
                <strong>{artist.name}</strong>
                <span>{artist.category}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
