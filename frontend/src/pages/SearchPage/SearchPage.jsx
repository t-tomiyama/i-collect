import React, { useState, useEffect } from "react";
import { Search, Music, Users, Package, User, X } from "lucide-react";

import "./SearchPage.css";

// --- DADOS MOCK ---
const MOCK_RELEASES = [
  {
    id: 1,
    title: "I NEVER DIE",
    artist: "(G)I-DLE",
    coverUrl:
      "http://www.cubeent.co.kr/files/attach/images/4240924/557/271/004/7b896b4d0624c3e8376d001995348a86.jpg",
    cdUrl: "https://i.postimg.cc/ZqhVJxg3/CD.png",
  },
  {
    id: 2,
    title: "ATE",
    artist: "Stray Kids",
    coverUrl:
      "https://straykids.jype.com/resources/images/album/img_album_1722332677163.jpg",
    cdUrl: "https://i.postimg.cc/ZqhVJxg3/CD.png",
  },
  {
    id: 3,
    title: "I feel",
    artist: "(G)I-DLE",
    coverUrl: "http://www.cubeent.co.kr/usr/pc/img/album_4272761_02.jpg",
    cdUrl: "https://i.postimg.cc/ZqhVJxg3/CD.png",
  },
  {
    id: 4,
    title: "MAXIDENT",
    artist: "Stray Kids",
    coverUrl:
      "https://straykids.jype.com/resources/images/album/img_album_1665191008064.jpg",
    cdUrl: "https://i.postimg.cc/ZqhVJxg3/CD.png",
  },
];

const MOCK_PHOTOCARDS = [
  {
    id: "pc1",
    name: "Soyeon - I NEVER DIE",
    imageUrl: "https://i.imgur.com/L1TqQhC.jpeg",
    type: "Regular",
  },
  {
    id: "pc2",
    name: "Felix - ATE",
    imageUrl: "https://i.imgur.com/N5G2kS5.jpeg",
    type: "Lucky Draw",
  },
  {
    id: "pc3",
    name: "Minnie - I feel",
    imageUrl: "https://i.imgur.com/Q2yQ1oZ.jpeg",
    type: "POB",
  },
  {
    id: "pc4",
    name: "Bang Chan - MAXIDENT",
    imageUrl: "https://i.imgur.com/J7o6k9L.jpeg",
    type: "Regular",
  },
];

const TYPE_EXPLANATIONS = {
  Regular: "Photocard regular que vem dentro do álbum.",
  "Lucky Draw": "Photocard especial obtido em sorteios de eventos.",
  POB: "Pre-Order Benefit. Brinde exclusivo de pré-venda.",
};

const MOCK_IDOLS = [
  {
    id: "idol1",
    name: "Soyeon",
    group: "(G)I-DLE",
    imageUrl: "https://i.imgur.com/S6BqE1P.jpeg",
  },
  {
    id: "idol2",
    name: "Felix",
    group: "Stray Kids",
    imageUrl: "https://i.imgur.com/t4Z8i1K.jpeg",
  },
];

const MOCK_ARTISTS = [
  {
    id: "art1",
    name: "(G)I-DLE",
    type: "Girlgroup",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/3/39/I-dle_logo.png",
  },
  {
    id: "art2",
    name: "Stray Kids",
    type: "Boygroup",
    logoUrl:
      "https://pbs.twimg.com/profile_images/1979896696042651648/x3mvDchl_400x400.jpg",
  },
  {
    id: "art3",
    name: "P1Harmony",
    type: "Boygroup",
    logoUrl:
      "https://pbs.twimg.com/profile_images/1961391965016399872/GzReoTAp_400x400.jpg",
  },
  {
    id: "art4",
    name: "Nmixx",
    type: "Girlgroup",
    logoUrl:
      "https://i.redd.it/nmixx-debut-coming-soon-logo-teaser-images-v0-jsh3mjqhoud81.jpg?width=2048&format=pjpg&auto=webp&s=7696b6486f9b3441110c44c2bd3bbe337f9eb8fe",
  },
  {
    id: "art5",
    name: "XG",
    type: "Girlgroup",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuqDk2dFSDsMdnSBhtBw8OmIqHREkKgnAc8NRVjzPKSJenXf1X0JKavo1M8KuxwvnOgRs&usqp=CAU",
  },
  {
    id: "art6",
    name: "ZEROBASEONE",
    type: "Boygroup",
    logoUrl:
      "https://i.pinimg.com/474x/36/44/a5/3644a5d6ae53ce719d776ec3dd2e6c54.jpg",
  },
  {
    id: "art7",
    name: "XLOV",
    type: "Group",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2vA1IDxkIIS-1bkp0NUGfL3HxrBqcnso31g&s",
  },
  {
    id: "art8",
    name: "Xdinary Heroes",
    type: "Band",
    logoUrl:
      "https://pbs.twimg.com/profile_images/1973221558266253312/iCoHPUsq_400x400.jpg",
  },
  {
    id: "art9",
    name: "BIBI",
    type: "Solo",
    logoUrl:
      "https://images.lifestyleasia.com/wp-content/uploads/sites/3/2024/11/21181523/Untitled-design-2024-11-21T154502.674.jpg",
  },
  {
    id: "art10",
    name: "YUQI",
    type: "Solo",
    logoUrl:
      "https://i.pinimg.com/736x/4f/c6/8b/4fc68b3b44a7abe653146bbe51ce5c8a.jpg",
  },
  {
    id: "art11",
    name: "Minnie",
    type: "Solo",
    logoUrl:
      "https://i.pinimg.com/736x/cb/f4/71/cbf4717e09d3a5e32f83c0e98de83139.jpg",
  },
  {
    id: "art12",
    name: "Fanxy Red",
    type: "Girlgroup",
    logoUrl:
      "https://i.pinimg.com/564x/b3/6b/0e/b36b0e77552c2197d2938e410ae8a0a5.jpg",
  },
  {
    id: "art13",
    name: "Xin Liu",
    type: "Solo",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfvDXRNdPdqLu-iRWAk2-t6usNIefWDhjtLw&s",
  },
  {
    id: "art14",
    name: "Mamamoo",
    type: "Girlgroup",
    logoUrl:
      "https://i.pinimg.com/736x/9d/4f/c7/9d4fc7f17e39ccc6c0f137fa07f51a30.jpg",
  },
];

const FILTERS = [
  { id: "photocards", name: "Photocards", icon: Package },
  { id: "releases", name: "Releases", icon: Music },
  { id: "idols", name: "Idols", icon: User },
  { id: "artistas", name: "Artistas/Grupos", icon: Users },
];

// --- COMPONENTE RELEASE CARD ---
const ReleaseCard = ({ title, artist, coverUrl, cdUrl }) => {
  return (
    <div className="release-card">
      <div className="release-card__content">
        {cdUrl && <img src={cdUrl} alt="CD" className="release-card__cd" />}
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

// --- COMPONENTE SEARCH PAGE ---
export const SearchPage = ({ initialQuery = "" }) => {
  const [activeFilters, setActiveFilters] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

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

  const showAll = activeFilters.size === 0;
  const isFilterActive = (filterId) => activeFilters.has(filterId);

  // --- LÓGICA DE FILTRAGEM ---
  const filterData = (data, fields) => {
    if (!searchQuery) return data;
    const lowerQuery = searchQuery.toLowerCase();
    return data.filter((item) =>
      fields.some((field) => item[field]?.toLowerCase().includes(lowerQuery))
    );
  };

  const filteredPhotocards = filterData(MOCK_PHOTOCARDS, ["name", "type"]);
  const filteredReleases = filterData(MOCK_RELEASES, ["title", "artist"]);
  const filteredIdols = filterData(MOCK_IDOLS, ["name", "group"]);
  const filteredArtists = filterData(MOCK_ARTISTS, ["name", "type"]);

  const hasResults =
    filteredPhotocards.length > 0 ||
    filteredReleases.length > 0 ||
    filteredIdols.length > 0 ||
    filteredArtists.length > 0;

  return (
    <div className="search-page-container">
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

      {!hasResults && searchQuery && (
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

      {(showAll || isFilterActive("photocards")) &&
        filteredPhotocards.length > 0 && (
          <div className="search-section">
            <h2 className="search-section__title">Photocards</h2>
            <div className="photocard-grid">
              {filteredPhotocards.map((pc) => (
                <div key={pc.id} className="photocard-card">
                  <div className="photocard-card__image-wrapper">
                    <img
                      src={pc.imageUrl}
                      alt={pc.name}
                      className="photocard-card__image"
                    />
                  </div>
                  <div className="photocard-card__info">
                    <span className="photocard-card__name">{pc.name}</span>
                    {pc.type && (
                      <div className="photocard-tooltip-wrapper">
                        <span
                          className={`photocard-card__type-badge type-${pc.type
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {pc.type}
                        </span>
                        <div className="photocard-tooltip-content">
                          {TYPE_EXPLANATIONS[pc.type] || "Tipo de card"}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      {(showAll || isFilterActive("releases")) &&
        filteredReleases.length > 0 && (
          <div className="search-section">
            <h2 className="search-section__title">Releases</h2>
            <div className="release-grid">
              {filteredReleases.map((release) => (
                <ReleaseCard
                  key={release.id}
                  title={release.title}
                  artist={release.artist}
                  coverUrl={release.coverUrl}
                  cdUrl={release.cdUrl}
                />
              ))}
            </div>
          </div>
        )}

      {(showAll || isFilterActive("idols")) && filteredIdols.length > 0 && (
        <div className="search-section">
          <h2 className="search-section__title">Idols</h2>
          <div className="idol-grid">
            {filteredIdols.map((idol) => (
              <div key={idol.id} className="idol-card">
                <img
                  src={idol.imageUrl}
                  alt={idol.name}
                  className="idol-card__image"
                />
                <div className="idol-card__info">
                  <strong>{idol.name}</strong>
                  <span>{idol.group}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(showAll || isFilterActive("artistas")) &&
        filteredArtists.length > 0 && (
          <div className="search-section">
            <h2 className="search-section__title">Artistas/Grupos</h2>
            <div className="artist-grid">
              {filteredArtists.map((artist) => (
                <div key={artist.id} className="artist-card">
                  <img
                    src={artist.logoUrl}
                    alt={artist.name}
                    className="artist-card__image"
                  />
                  <strong>{artist.name}</strong>
                  <span>{artist.type}</span>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
};
export default SearchPage;
