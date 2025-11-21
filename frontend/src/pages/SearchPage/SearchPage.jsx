import React, { useState, useEffect } from "react";
import { Search, Music, Users, Package, User, X } from "lucide-react";
import "./SearchPage.css";

const API_URL = "https://i-collect-backend.onrender.com/api";

const FILTERS = [
  { id: "photocards", name: "Photocards", icon: Package },
  { id: "releases", name: "Releases", icon: Music },
  { id: "idols", name: "Idols", icon: User },
  { id: "artists", name: "Artistas/Grupos", icon: Users },
];

const SIDEBAR_TO_FILTER_MAP = {
  pcs: "photocards",
  albums: "releases",
  artists: "artists",
};

const ReleaseCard = ({ title, artist, coverUrl, onClick }) => {
  return (
    <div
      className="release-card"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className="release-card__content">
        <img
          src="https://www.pngall.com/wp-content/uploads/13/CD-Blank-PNG-Clipart.png"
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

  const [photocards, setPhotocards] = useState([]);
  const [releases, setReleases] = useState([]);
  const [idols, setIdols] = useState([]);
  const [artists, setArtists] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalData, setModalData] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [isFlippedInModal, setIsFlippedInModal] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    if (modalOpen) document.body.classList.add("info-visible");
    else document.body.classList.remove("info-visible");
  }, [modalOpen]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      performSearch();
    } else {
      fetchInitialData();
    }
  }, [searchQuery]);

  const handleCardClick = async (type, id) => {
    console.log("Clicou em:", type, id);

    setModalOpen(true);
    setModalLoading(true);
    setIsFlippedInModal(false); // Reseta o flip ao abrir
    setModalType(type);
    setModalData(null);

    try {
      const response = await fetch(`${API_URL}/search/details/${type}/${id}`);

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const json = await response.json();

      if (json.success) {
        setModalData(json.data);
      } else {
        console.error("API retornou erro:", json);
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes:", error);
    } finally {
      setModalLoading(false);
    }
  };

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
    card.style.setProperty("--bg-x", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--bg-y", `${(y / rect.height) * 100}%`);
  };

  const fetchInitialData = async () => {
    setLoading(true);
    setError("");

    try {
      const [photocardsRes, releasesRes, idolsRes, artistsRes] =
        await Promise.all([
          fetch(`${API_URL}/search/photocards?limit=18`).then((res) =>
            res.json()
          ),
          fetch(`${API_URL}/search/releases?limit=18`).then((res) =>
            res.json()
          ),
          fetch(`${API_URL}/search/idols?limit=18`).then((res) => res.json()),
          fetch(`${API_URL}/search/artists?limit=18`).then((res) => res.json()),
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

  const showNoResults = searchQuery && !loading && !hasResults;

  // Helper para pegar a imagem correta dependendo do tipo
  const getModalImage = () => {
    if (!modalData) return "";
    if (modalType === "photocards")
      return modalData.image || modalData.front_image || modalData.image_url;
    if (modalType === "releases") return modalData.cover;
    return modalData.image;
  };

  // Helper para pegar o subtítulo correto
  const getModalSubtitle = () => {
    if (!modalData) return "";
    if (modalType === "photocards")
      return `${modalData.group || modalData.artist_name} | ${
        modalData.idol || modalData.stage_name
      }`;
    if (modalType === "releases") return modalData.artist_name;
    if (modalType === "idols") return modalData.artist_name || modalData.group;
    if (modalType === "artists") return modalData.category;
    return "";
  };

  return (
    <div className="search-page-container">
      {modalOpen && (
        <>
          <div
            id="info-box-overlay"
            onClick={() => setModalOpen(false)}
            className={modalOpen ? "is-open" : ""}
          ></div>

          <div id="info-box">
            <button id="info-box-close" onClick={() => setModalOpen(false)}>
              &times;
            </button>

            {modalLoading || !modalData ? (
              <div style={{ padding: "40px", textAlign: "center" }}>
                <div className="loading-spinner"></div>
                <p>Carregando detalhes...</p>
              </div>
            ) : (
              <>
                <h2 className="modal-title">
                  {modalData.name || modalData.stage_name || "Detalhes"}
                </h2>

                <div className="modal-card-scene">
                  <div
                    className={`modal-card-inner ${
                      isFlippedInModal ? "is-flipped" : ""
                    }`}
                  >
                    <div
                      className="modal-card-face modal-card-front"
                      style={{
                        backgroundColor: "var(--theme-color)",
                        padding: "10px",
                      }}
                    >
                      <div
                        className={`card ${
                          modalType === "photocards" ? "glossy-card" : ""
                        }`}
                        style={{
                          backgroundImage: `url('${getModalImage()}')`,
                          width: "100%",
                          height: "100%",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                        onMouseMove={handleMouseMove}
                      ></div>
                    </div>

                    <div
                      className="modal-card-face modal-card-back"
                      style={{
                        backgroundColor: "#fff",
                        padding: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        textAlign: "center",
                      }}
                    >
                      {modalData.back_image ? (
                        <img
                          src={modalData.back_image}
                          alt="Verso"
                          className="modal-img-display"
                        />
                      ) : (
                        // Fallback para quando não tem imagem de verso (Releases, Artists, Idols geralmente não tem)
                        <div style={{ padding: "20px", color: "#555" }}>
                          <h3>{modalData.name || modalData.stage_name}</h3>
                          <p style={{ fontSize: "0.9rem", marginTop: "10px" }}>
                            {modalData.description || getModalSubtitle()}
                          </p>
                          <div style={{ marginTop: "20px", opacity: 0.5 }}>
                            <Music size={32} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="modal-controls">
                  <button
                    className="modal-action-btn"
                    onClick={() => setIsFlippedInModal(!isFlippedInModal)}
                    title={isFlippedInModal ? "Ver Frente" : "Ver Verso"}
                  >
                    <span className="material-symbols-outlined">360</span>
                    {isFlippedInModal ? "Frente" : "Verso"}
                  </button>

                  <button
                    className="modal-action-btn secondary"
                    onClick={() =>
                      alert("Funcionalidade de adicionar à coleção em breve!")
                    }
                  >
                    <span className="material-symbols-outlined">add</span>{" "}
                    Coleção
                  </button>
                </div>

                <div className="modal-info-details">
                  {/* Renderização Condicional dos Detalhes baseada no Tipo */}

                  {modalType === "photocards" && (
                    <>
                      <div className="info-row">
                        <span className="label">Grupo/Artista:</span>
                        <span className="value">
                          {modalData.artist_name || modalData.group || "N/A"}
                        </span>
                      </div>
                      <div className="info-row">
                        <span className="label">Idol:</span>
                        <span className="value">
                          {modalData.idol || modalData.stage_name || "N/A"}
                        </span>
                      </div>
                      <div className="info-row">
                        <span className="label">Era/Album:</span>
                        <span className="value">
                          {modalData.album_name || "N/A"}
                        </span>
                      </div>
                    </>
                  )}

                  {modalType === "releases" && (
                    <>
                      <div className="info-row">
                        <span className="label">Artista:</span>
                        <span className="value">{modalData.artist_name}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Data:</span>
                        <span className="value">
                          {modalData.release_date || "N/A"}
                        </span>
                      </div>
                      <div className="info-row">
                        <span className="label">Tipo:</span>
                        <span className="value">
                          {modalData.type || "Album"}
                        </span>
                      </div>
                    </>
                  )}

                  {(modalType === "idols" || modalType === "artists") && (
                    <>
                      <div className="info-row">
                        <span className="label">Nome:</span>
                        <span className="value">{modalData.name}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Categoria:</span>
                        <span className="value">
                          {modalData.category || "K-Pop"}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </>
      )}
      {/* --- FIM DO MODAL --- */}

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
                    src={
                      pc.image ||
                      pc.front_image ||
                      pc.image_url ||
                      "/default-card.jpg"
                    }
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
