import React, { useState, useEffect } from "react";
import {
  Search,
  Music,
  Users,
  Package,
  User,
  X,
  Disc,
  ShoppingBag,
  Info,
  Layers,
  Grid,
  RotateCw,
  Plus,
  Heart,
} from "lucide-react";
import "./SearchPage.css";

const API_URL = "https://i-collect-backend.onrender.com/api";

const FILTERS = [
  { id: "photocards", name: "Photocards", icon: Package },
  { id: "releases", name: "Releases", icon: Music },
  { id: "idols", name: "Idols", icon: User },
  { id: "artists", name: "Artistas/Grupos", icon: Users },
];

const SECTION_TO_FILTER_MAP = {
  pcs: "photocards",
  photocards: "photocards",
  releases: "releases",
  artists: "artists",
  idols: "idols",
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

export const SearchPage = ({ initialQuery = "", initialSection = null }) => {
  const targetSection = SECTION_TO_FILTER_MAP[initialSection];

  const [activeFilters, setActiveFilters] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [photocards, setPhotocards] = useState([]);
  const [releases, setReleases] = useState([]);
  const [idols, setIdols] = useState([]);
  const [artists, setArtists] = useState([]);

  // Estados do Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalData, setModalData] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [isFlippedInModal, setIsFlippedInModal] = useState(false);

  useEffect(() => {
    setPhotocards([]);
    setReleases([]);
    setIdols([]);
    setArtists([]);
    setSearchQuery("");

    const newFilters = new Set();
    if (targetSection) {
      newFilters.add(targetSection);
      if (targetSection === "artists") {
        newFilters.add("idols");
      }
    }
    setActiveFilters(newFilters);
  }, [initialSection, targetSection]);

  useEffect(() => {
    if (searchQuery.trim()) {
      performSearch();
    } else {
      fetchInitialData();
    }
  }, [initialSection, searchQuery]);

  useEffect(() => {
    if (modalOpen) document.body.classList.add("info-visible");
    else document.body.classList.remove("info-visible");
  }, [modalOpen]);

  // --- Efeito Glossy/Holográfico (Copiado do BinderPage) ---
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
      const promises = [];
      const LIMIT = targetSection ? 100 : 18;

      if (!targetSection || targetSection === "photocards") {
        promises.push(
          fetch(`${API_URL}/search/photocards?limit=${LIMIT}`)
            .then((res) => res.json())
            .then((data) => (data.success ? setPhotocards(data.data) : []))
        );
      }

      if (!targetSection || targetSection === "releases") {
        promises.push(
          fetch(`${API_URL}/search/releases?limit=${LIMIT}`)
            .then((res) => res.json())
            .then((data) => (data.success ? setReleases(data.data) : []))
        );
      }

      if (
        !targetSection ||
        targetSection === "idols" ||
        targetSection === "artists"
      ) {
        promises.push(
          fetch(`${API_URL}/search/idols?limit=${LIMIT}`)
            .then((res) => res.json())
            .then((data) => (data.success ? setIdols(data.data) : []))
        );
      }

      if (!targetSection || targetSection === "artists") {
        promises.push(
          fetch(`${API_URL}/search/artists?limit=${LIMIT}`)
            .then((res) => res.json())
            .then((data) => (data.success ? setArtists(data.data) : []))
        );
      }

      await Promise.all(promises);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar dados.");
    } finally {
      setLoading(false);
    }
  };

  const performSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError("");

    setPhotocards([]);
    setReleases([]);
    setIdols([]);
    setArtists([]);

    try {
      const searchPromises = [];
      const isPcsActive =
        activeFilters.size === 0 || activeFilters.has("photocards");
      const isRelActive =
        activeFilters.size === 0 || activeFilters.has("releases");
      const isIdolActive =
        activeFilters.size === 0 || activeFilters.has("idols");
      const isArtActive =
        activeFilters.size === 0 || activeFilters.has("artists");

      if (isPcsActive) {
        searchPromises.push(
          fetch(
            `${API_URL}/search/photocards?q=${encodeURIComponent(searchQuery)}`
          )
            .then((res) => res.json())
            .then((d) => (d.success ? setPhotocards(d.data) : []))
        );
      }
      if (isRelActive) {
        searchPromises.push(
          fetch(
            `${API_URL}/search/releases?q=${encodeURIComponent(searchQuery)}`
          )
            .then((res) => res.json())
            .then((d) => (d.success ? setReleases(d.data) : []))
        );
      }
      if (isIdolActive) {
        searchPromises.push(
          fetch(`${API_URL}/search/idols?q=${encodeURIComponent(searchQuery)}`)
            .then((res) => res.json())
            .then((d) => (d.success ? setIdols(d.data) : []))
        );
      }
      if (isArtActive) {
        searchPromises.push(
          fetch(
            `${API_URL}/search/artists?q=${encodeURIComponent(searchQuery)}`
          )
            .then((res) => res.json())
            .then((d) => (d.success ? setArtists(d.data) : []))
        );
      }

      await Promise.all(searchPromises);
    } catch (err) {
      console.error(err);
      setError("Erro ao realizar busca.");
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

  const isFilterActive = (filterId) => activeFilters.has(filterId);

  const handleCardClick = async (type, id) => {
    setModalOpen(true);
    setModalLoading(true);
    setIsFlippedInModal(false);
    setModalType(type);
    setModalData(null);
    try {
      const response = await fetch(`${API_URL}/search/details/${type}/${id}`);
      const json = await response.json();
      if (json.success) setModalData(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setModalLoading(false);
    }
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

  const getModalImage = () => {
    if (!modalData) return "";
    if (modalType === "photocards")
      return modalData.image || modalData.front_image || modalData.image_url;
    if (modalType === "releases") return modalData.cover;
    return modalData.image;
  };

  // Renderiza os metadados (texto)
  const renderModalMetadata = () => {
    if (!modalData) return null;

    if (modalType === "photocards") {
      return (
        <div className="modal-metadata-list">
          {modalData.group_name && (
            <div className="meta-row">
              <Users size={16} className="meta-icon" />
              <span>{modalData.group_name}</span>
            </div>
          )}
          {modalData.release_name && (
            <div className="meta-row">
              <Disc size={16} className="meta-icon" />
              <span>{modalData.release_name}</span>
            </div>
          )}
          {modalData.set_name && (
            <div className="meta-row">
              <Package size={16} className="meta-icon" />
              <span>{modalData.set_name}</span>
            </div>
          )}
          {modalData.available_versions && (
            <div className="meta-row">
              <Layers size={16} className="meta-icon" />
              <span>Versões: {modalData.available_versions}</span>
            </div>
          )}
          {modalData.store_name && (
            <div className="meta-row">
              <ShoppingBag size={16} className="meta-icon" />
              <span>{modalData.store_name}</span>
            </div>
          )}
          {modalData.other_cards_in_set && (
            <div className="meta-row" style={{ alignItems: "flex-start" }}>
              <Grid
                size={16}
                className="meta-icon"
                style={{ marginTop: "3px" }}
              />
              <div style={{ fontSize: "0.85rem" }}>
                <strong>Outros no set:</strong>
                <br />
                {modalData.other_cards_in_set}
              </div>
            </div>
          )}
          {!modalData.release_name &&
            !modalData.set_name &&
            modalData.description && (
              <div className="meta-row description-fallback">
                <Info size={16} className="meta-icon" />
                <span>{modalData.description}</span>
              </div>
            )}
        </div>
      );
    }

    return (
      <div className="modal-info-content">
        <p>
          {modalData.artist_name || modalData.category || modalData.description}
        </p>
      </div>
    );
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
                <p>Carregando...</p>
              </div>
            ) : (
              <>
                <h2 className="modal-title">
                  {modalData.name || modalData.stage_name || "Detalhes"}
                </h2>

                {/* --- LÓGICA DO MODAL TIPO BINDER (3D) --- */}
                {modalType === "photocards" ? (
                  <>
                    <div className="modal-card-scene">
                      <div
                        className={`modal-card-inner ${
                          isFlippedInModal ? "is-flipped" : ""
                        }`}
                      >
                        {/* Frente */}
                        <div
                          className="modal-card-face modal-card-front"
                          style={{
                            padding: "10px",
                            backgroundColor: "#fff",
                          }}
                        >
                          <div
                            className="card glossy-card"
                            style={{
                              backgroundImage: `url('${getModalImage()}')`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              width: "100%",
                              height: "100%",
                            }}
                            onMouseMove={handleMouseMove}
                          ></div>
                        </div>

                        {/* Verso */}
                        <div
                          className="modal-card-face modal-card-back"
                          style={{
                            padding: "10px",
                            backgroundColor: "#f4f4f5", // Cor padrão de verso
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {modalData.back_image ? (
                            <img
                              src={modalData.back_image}
                              alt="Verso"
                              className="modal-img-display"
                            />
                          ) : (
                            <div
                              className="modal-back-placeholder"
                              style={{ color: "#aaa", textAlign: "center" }}
                            >
                              <Package
                                size={40}
                                style={{ opacity: 0.5, marginBottom: 10 }}
                              />
                              <p style={{ fontSize: "0.8rem", margin: 0 }}>
                                Sem verso disponível
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Controles estilo Binder */}
                    <div className="modal-controls">
                      <button
                        className="modal-action-btn"
                        onClick={() => setIsFlippedInModal(!isFlippedInModal)}
                      >
                        <RotateCw size={18} />
                        {isFlippedInModal ? "Frente" : "Verso"}
                      </button>

                      <button
                        className="modal-action-btn secondary"
                        onClick={() =>
                          alert(`Adicionar ID ${modalData.id} à wishlist?`)
                        }
                      >
                        <Plus size={18} />
                        Coleção
                      </button>
                    </div>

                    {/* Detalhes/Metadados em container com scroll se necessário */}
                    <div className="modal-info-details">
                      {renderModalMetadata()}
                    </div>
                  </>
                ) : (
                  // --- LÓGICA PADRÃO PARA ÁLBUNS/IDOLS (Sem 3D flip) ---
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <div
                      style={{
                        padding: "20px",
                        display: "flex",
                        justifyContent: "center",
                        backgroundColor: "var(--color-surface-2)",
                      }}
                    >
                      <img
                        src={getModalImage()}
                        alt={modalData.name}
                        style={{
                          maxHeight: "300px",
                          maxWidth: "100%",
                          borderRadius: "8px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        }}
                      />
                    </div>
                    <div className="modal-info-details">
                      {renderModalMetadata()}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}

      <div className="search-bar-wrapper">
        <Search className="search-bar__icon" size={20} />
        <input
          type="text"
          className="search-bar__input"
          placeholder="Pesquisar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            className="search-bar__clear-btn"
            onClick={() => setSearchQuery("")}
          >
            <X size={18} />
          </button>
        )}
      </div>

      {error && (
        <div
          className="error-message"
          style={{ color: "#ef4444", textAlign: "center", margin: "1rem" }}
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
          <p>Carregando...</p>
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
          <h3>Nenhum resultado para "{searchQuery}"</h3>
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
                    <span
                      className={`photocard-card__type-badge type-${pc.front_finish.toLowerCase()}`}
                    >
                      {pc.front_finish}
                    </span>
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
