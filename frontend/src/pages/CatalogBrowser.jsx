import React, { useState, useEffect } from "react";
import { Search, X, Heart } from "lucide-react";
// Supondo que você tenha movido os dados mockados para um arquivo separado
// import { MOCK_CATALOG } from '../data/constants';

// Se não, definimos aqui para este exemplo funcionar isoladamente
const MOCK_CATALOG = [
  {
    id: "a1",
    type: "artist",
    name: "Stray Kids",
    subtitle: "JYP Entertainment",
    image:
      "https://pbs.twimg.com/profile_images/1979896696042651648/x3mvDchl_400x400.jpg",
    tags: ["Boy Group", "8 Membros"],
  },
  {
    id: "a2",
    type: "artist",
    name: "(G)I-DLE",
    subtitle: "Cube Entertainment",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/39/I-dle_logo.png",
    tags: ["Girl Group", "5 Membros"],
  },
  {
    id: "al1",
    type: "release",
    name: "5-STAR",
    subtitle: "Stray Kids",
    image: "https://i.scdn.co/image/ab67616d0000b273e77ba0f577555d3472893f98",
    tags: ["2023", "Full Album"],
  },
  {
    id: "al2",
    type: "release",
    name: "ROCK-STAR",
    subtitle: "Stray Kids",
    image: "https://i.scdn.co/image/ab67616d0000b273a68177ff385d1c8ec5283f8b",
    tags: ["2023", "Mini Album"],
  },
  {
    id: "al3",
    type: "release",
    name: "I FEEL",
    subtitle: "(G)I-DLE",
    image: "https://i.scdn.co/image/ab67616d0000b273c78020c8b448518a411cf24e",
    tags: ["2023", "Mini Album"],
  },
  {
    id: "al4",
    type: "release",
    name: "2",
    subtitle: "(G)I-DLE",
    image: "https://i.scdn.co/image/ab67616d0000b273c587188995ba573913bc136e",
    tags: ["2024", "Full Album"],
  },
  {
    id: "pc1",
    type: "photocard",
    name: "Hyunjin",
    subtitle: "5-STAR (Digipack)",
    image: "https://placehold.co/300x450/eee/333?text=Hyunjin+PC",
    tags: ["Selfie", "Raro"],
  },
  {
    id: "pc2",
    type: "photocard",
    name: "Felix",
    subtitle: "ROCK-STAR (Headliner)",
    image: "https://placehold.co/300x450/eee/333?text=Felix+PC",
    tags: ["Concept", "Comum"],
  },
  {
    id: "pc3",
    type: "photocard",
    name: "Yuqi",
    subtitle: "I FEEL (Butterfly Ver)",
    image: "https://placehold.co/300x450/eee/888?text=Yuqi+PC",
    tags: ["Selfie", "POB"],
  },
  {
    id: "pc4",
    type: "photocard",
    name: "Minnie",
    subtitle: "2 (Standard Ver)",
    image: "https://placehold.co/300x450/eee/888?text=Minnie+PC",
    tags: ["Concept"],
  },
  {
    id: "pc5",
    type: "photocard",
    name: "Bang Chan",
    subtitle: "NACIFIC R15",
    image: "https://placehold.co/300x450/eee/333?text=Chan+PC",
    tags: ["Collab", "POB"],
  },
];

export default function CatalogBrowser({ darkMode, themeHex, activeNav }) {
  const [catalogSearch, setCatalogSearch] = useState("");
  const [catalogFilter, setCatalogFilter] = useState("all");

  // Sincroniza o filtro com a navegação da sidebar
  useEffect(() => {
    if (activeNav === "catalog" || activeNav === "cat-all") {
      setCatalogFilter("all");
      setCatalogSearch("");
    } else if (activeNav === "cat-artists") {
      setCatalogFilter("artist");
      setCatalogSearch("");
    } else if (activeNav === "cat-releases") {
      setCatalogFilter("release");
      setCatalogSearch("");
    } else if (activeNav === "cat-pcs") {
      setCatalogFilter("photocard");
      setCatalogSearch("");
    }
  }, [activeNav]);

  const filteredCatalogItems = MOCK_CATALOG.filter((item) => {
    const matchesFilter =
      catalogFilter === "all" || item.type === catalogFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(catalogSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Tradução dos labels dos filtros
  const getFilterLabel = (filter) => {
    switch (filter) {
      case "all":
        return "Tudo";
      case "artist":
        return "Artistas";
      case "release":
        return "Lançamentos";
      case "photocard":
        return "Photocards";
      default:
        return filter;
    }
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho do Navegador & Filtros */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <div
            className={`flex items-center px-4 py-3 rounded-2xl border transition-all duration-300 focus-within:ring-2 ring-offset-2 ${
              darkMode
                ? "bg-gray-900 border-gray-800 ring-offset-gray-950"
                : "bg-white border-slate-200 ring-offset-white"
            }`}
            style={{ "--tw-ring-color": themeHex }}
          >
            <Search
              size={20}
              className={darkMode ? "text-gray-500" : "text-slate-400"}
            />
            <input
              type="text"
              placeholder={`Pesquisar em ${getFilterLabel(catalogFilter)}...`}
              value={catalogSearch}
              onChange={(e) => setCatalogSearch(e.target.value)}
              className={`ml-3 bg-transparent outline-none text-base w-full placeholder-opacity-50 ${
                darkMode ? "placeholder-gray-500" : "placeholder-slate-400"
              }`}
            />
            {catalogSearch && (
              <button
                onClick={() => setCatalogSearch("")}
                className={
                  darkMode
                    ? "text-gray-500 hover:text-gray-300"
                    : "text-slate-400 hover:text-slate-600"
                }
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Pílulas de Filtro */}
        <div
          className={`flex gap-2 p-1.5 rounded-2xl overflow-x-auto scrollbar-hide w-full md:w-auto ${
            darkMode ? "bg-gray-900" : "bg-white shadow-sm"
          }`}
        >
          {["all", "artist", "release", "photocard"].map((filter) => (
            <button
              key={filter}
              onClick={() => setCatalogFilter(filter)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all duration-200 whitespace-nowrap
                ${
                  catalogFilter !== filter
                    ? darkMode
                      ? "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                    : "text-white shadow-md"
                }
              `}
              style={{
                backgroundColor:
                  catalogFilter === filter ? themeHex : undefined,
              }}
            >
              {getFilterLabel(filter)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Resultados */}
      {filteredCatalogItems.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredCatalogItems.map((item) => (
            <div
              key={item.id}
              className={`group relative rounded-[2rem] overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer
              ${
                darkMode
                  ? "bg-gray-900 hover:shadow-gray-950/50"
                  : "bg-white shadow-sm hover:shadow-slate-200/50"
              }`}
            >
              {/* RENDERIZAÇÃO ESPECIAL PARA LANÇAMENTOS (ESTILO CD) */}
              {item.type === "release" ? (
                <div className="relative aspect-square p-4 flex items-center justify-start overflow-visible">
                  {/* O CD giratório (permanentemente visível) */}
                  <img
                    src="https://i.postimg.cc/ZqhVJxg3/CD.png"
                    alt="CD"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-[75%] aspect-square object-cover rounded-full transition-transform duration-[3s] ease-linear group-hover:rotate-[360deg] z-0 opacity-90"
                  />
                  {/* A Capa (menor para revelar o CD) */}
                  <div className="relative z-10 h-full w-[80%] aspect-square shadow-lg rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Botão de Coração */}
                  <button
                    className={`absolute top-5 right-5 p-2.5 rounded-full text-white shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-20 group/heart`}
                    style={{ backgroundColor: themeHex }}
                  >
                    <Heart size={18} className="fill-current" />
                    {/* Tooltip */}
                    <div
                      className={`absolute right-full top-1/2 -translate-y-1/2 mr-2 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap opacity-0 invisible group-hover/heart:opacity-100 group-hover/heart:visible transition-all duration-200 z-30 shadow-sm pointer-events-none
                        ${
                          darkMode
                            ? "bg-gray-800 text-white"
                            : "bg-white text-slate-900"
                        }`}
                    >
                      Adicionar à Wishlist
                    </div>
                  </button>
                </div>
              ) : item.type === "artist" ? (
                /* RENDERIZAÇÃO DE ARTISTA (Quadrado, sem CD) */
                <div className="relative aspect-square p-4 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="relative z-10 h-full aspect-square object-cover rounded-lg shadow-lg transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Botão de Coração */}
                  <button
                    className={`absolute top-6 right-6 p-2.5 rounded-full text-white shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-20 group/heart`}
                    style={{ backgroundColor: themeHex }}
                  >
                    <Heart size={18} className="fill-current" />
                    {/* Tooltip */}
                    <div
                      className={`absolute right-full top-1/2 -translate-y-1/2 mr-2 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap opacity-0 invisible group-hover/heart:opacity-100 group-hover/heart:visible transition-all duration-200 z-30 shadow-sm pointer-events-none
                        ${
                          darkMode
                            ? "bg-gray-800 text-white"
                            : "bg-white text-slate-900"
                        }`}
                    >
                      Favoritar Artista
                    </div>
                  </button>
                </div>
              ) : (
                /* RENDERIZAÇÃO DE PHOTOCARD (3:4 com borda acolchoada) */
                <div
                  className={`relative aspect-[3/4] p-3 flex items-center justify-center transition-all ${
                    darkMode ? "bg-gray-800/50" : "bg-gray-100/50"
                  }`}
                >
                  <div className="relative w-full h-full overflow-hidden rounded-xl shadow-sm transition-all">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Botão de Coração */}
                    <button
                      className={`absolute top-2 right-2 p-2.5 rounded-full text-white shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-20 group/heart`}
                      style={{ backgroundColor: themeHex }}
                    >
                      <Heart size={18} className="fill-current" />
                      {/* Tooltip */}
                      <div
                        className={`absolute right-full top-1/2 -translate-y-1/2 mr-2 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap opacity-0 invisible group-hover/heart:opacity-100 group-hover/heart:visible transition-all duration-200 z-30 shadow-sm pointer-events-none
                          ${
                            darkMode
                              ? "bg-gray-800 text-white"
                              : "bg-white text-slate-900"
                          }`}
                      >
                        Adicionar à Wishlist
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Detalhes do Conteúdo */}
              <div className="p-4 relative z-10 bg-inherit">
                {/* Tags */}
                <div className="flex gap-1 mb-2 flex-wrap">
                  {item.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider
                      ${
                        darkMode
                          ? "bg-gray-800 text-gray-300"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3
                  className={`font-bold truncate ${
                    darkMode ? "text-gray-100" : "text-slate-800"
                  }`}
                >
                  {item.name}
                </h3>
                <p
                  className={`text-sm truncate ${
                    darkMode ? "text-gray-400" : "text-slate-500"
                  }`}
                >
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Estado Vazio
        <div
          className={`py-20 text-center rounded-[2.5rem] border-2 border-dashed
          ${
            darkMode
              ? "border-gray-800 text-gray-500"
              : "border-slate-200 text-slate-400"
          }`}
        >
          <Search size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">Nenhum item encontrado</p>
          <p className="text-sm opacity-80">
            Tente ajustar sua pesquisa ou filtros
          </p>
        </div>
      )}
    </div>
  );
}
