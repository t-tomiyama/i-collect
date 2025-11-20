import React, { useState, useEffect } from "react";
import { BookOpen, Search, Heart, Plus, Check } from "lucide-react";

import "./BinderPage.css";

const INITIAL_CARDS = [
  [
    {
      id: 1,
      type: "lenticular-card",
      img1: "https://i.pinimg.com/1200x/82/8c/2e/828c2e0ede20f8e99c1c33b2dc25085d.jpg",
      img2: "https://i.pinimg.com/736x/d0/18/f9/d018f957f6cf4c2f700fcaeef70f39b3.jpg",
      backImg:
        "https://i.pinimg.com/564x/e1/9d/05/e19d05320d351b40215443899e58737a.jpg",
      sleeveColor: "#ffffff",
      status: "have",
      name: "Oddinary Lenticular",
      group: "Stray Kids",
      idol: "Hyunjin",
    },
    {
      id: 2,
      type: "glossy-card",
      img1: "https://i.pinimg.com/736x/13/b9/72/13b9728245ced939356886aa5a900755.jpg",
      backImg:
        "https://i.pinimg.com/564x/c9/1c/19/c91c1995369f7c21b728402b24eba2af.jpg",
      sleeveColor: "#A7D9FD",
      status: "on-the-way-inter",
      name: "Taste of Love POB",
      group: "Twice",
      idol: "Mina",
    },
    {
      id: 3,
      type: "matte-card",
      img1: "https://i.pinimg.com/736x/7e/d3/f6/7ed3f63e730b6bc2e73225b3ef233498.jpg",
      sleeveColor: "#B5EAD7",
      status: "have",
      name: "Fact Check Glitter",
      group: "NCT",
      idol: "Taeyong",
    },
    null,
    null,
    null,
    {
      id: 4,
      type: "holographic-star",
      img1: "https://i.pinimg.com/736x/9d/c3/a1/9dc3a1d892d9cab0b0fb5b4b5b05a8a2.jpg",
      sleeveColor: "#FFECB3",
      status: "for-sale",
      name: "MAXIDENT Holo",
      group: "Stray Kids",
      idol: "Felix",
    },
    null,
    null,
  ],
  [
    {
      id: 5,
      type: "holographic-crystal",
      img1: "https://i.pinimg.com/736x/c9/1c/19/c91c1995369f7c21b728402b24eba2af.jpg",
      sleeveColor: "#E0BBE4",
      status: "wishlist",
      name: "Ready to Be Crystal",
      group: "Twice",
      idol: "Sana",
    },
    null,
    null,
    {
      id: 6,
      type: "matte-card",
      img1: "https://i.pinimg.com/736x/3d/6d/2d/3d6d2d937d4030d06e4cb3a26d33a6d8.jpg",
      sleeveColor: "#FFC09F",
      status: "on-progress",
      name: "Blue Card",
      group: "Twice",
      idol: "Jihyo",
    },
    null,
    null,
    null,
    null,
    null,
  ],
  [
    null,
    {
      id: 7,
      type: "glossy-card",
      img1: "https://placehold.co/250x350/FF8CCA/FFF?text=New",
      sleeveColor: "#ffffff",
      status: "have",
      name: "Placeholder Card",
      group: "Twice",
      idol: "Nayeon",
    },
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  Array(9).fill(null),
];

const MOCK_SEARCH_CARDS = [
  {
    id: 100,
    group: "Stray Kids",
    idol: "Hyunjin",
    name: "Oddinary Lenticular",
    type: "lenticular-card",
    img1: "https://i.pinimg.com/1200x/82/8c/2e/828c2e0ede20f8e99c1c33b2dc25085d.jpg",
    img2: "https://i.pinimg.com/736x/d0/18/f9/d018f957f6cf4c2f700fcaeef70f39b3.jpg",
    backImg:
      "https://i.pinimg.com/564x/e1/9d/05/e19d05320d351b40215443899e58737a.jpg",
    sleeveColor: "#ffffff",
    status: "have",
  },
  {
    id: 101,
    group: "Twice",
    idol: "Mina",
    name: "Taste of Love POB",
    type: "glossy-card",
    img1: "https://i.pinimg.com/736x/13/b9/72/13b9728245ced939356886aa5a900755.jpg",
    backImg:
      "https://i.pinimg.com/564x/c9/1c/19/c91c1995369f7c21b728402b24eba2af.jpg",
    sleeveColor: "#A7D9FD",
    status: "wishlist",
  },
  {
    id: 102,
    group: "NCT",
    idol: "Taeyong",
    name: "Fact Check Glitter",
    type: "matte-card",
    img1: "https://i.pinimg.com/736x/7e/d3/f6/7ed3f63e730b6bc2e73225b3ef233498.jpg",
    sleeveColor: "#B5EAD7",
    status: "for-sale",
  },
  {
    id: 103,
    group: "Stray Kids",
    idol: "Felix",
    name: "MAXIDENT Holo",
    type: "holographic-star",
    img1: "https://i.pinimg.com/736x/9d/c3/a1/9dc3a1d892d9cab0b0fb5b4b5b05a8a2.jpg",
    sleeveColor: "#FFECB3",
    status: "have",
  },
  {
    id: 104,
    group: "Twice",
    idol: "Sana",
    name: "Ready to Be Crystal",
    type: "holographic-crystal",
    img1: "https://i.pinimg.com/736x/c9/1c/19/c91c1995369f7c21b728402b24eba2af.jpg",
    sleeveColor: "#E0BBE4",
    status: "on-progress",
  },
];

const ALL_GROUPS = [
  ...new Set(MOCK_SEARCH_CARDS.map((card) => card.group)),
].sort();
const ALL_IDOLS = [
  ...new Set(MOCK_SEARCH_CARDS.map((card) => card.idol)),
].sort();
const ALL_TYPES = [
  ...new Set(MOCK_SEARCH_CARDS.map((card) => card.type)),
].sort();

const BINDERS_DATA = [
  {
    id: 1,
    title: "Coleção <br/> K-Pop",
    theme: "theme-pink",
    rows: 3,
    cols: 3,
  },
  {
    id: 2,
    title: "Cards <br/> de Anime",
    theme: "theme-blue",
    rows: 3,
    cols: 3,
  },
  {
    id: 3,
    title: "Lista <br/> de Trocas",
    theme: "theme-mint",
    rows: 3,
    cols: 3,
  },
  {
    id: 4,
    title: "Favoritos <br/> Pessoais",
    theme: "theme-lavender",
    rows: 3,
    cols: 3,
  },
];

const STATUS_TO_ICON = {
  have: "family_home",
  "on-progress": "hourglass_top",
  "on-the-way-inter": "flight",
  "on-the-way-national": "local_shipping",
  wishlist: "bookmark_heart",
  "for-sale": "sell",
};

const STATUS_TEXT = {
  have: "Na Coleção",
  "on-progress": "Em Processo",
  "on-the-way-inter": "A Caminho (Intl)",
  "on-the-way-national": "A Caminho (Nac)",
  wishlist: "Lista de Desejos",
  "for-sale": "À Venda/Troca",
};

const SLEEVE_COLORS = [
  { color: "#ffffff", name: "Branco" },
  { color: "#FFADAD", name: "Vermelho Pastel" },
  { color: "#FFD6A5", name: "Laranja Pastel" },
  { color: "#FDFFB6", name: "Amarelo Pastel" },
  { color: "#CAFFBF", name: "Verde Pastel" },
  { color: "#9BF6FF", name: "Ciano Pastel" },
  { color: "#A0C4FF", name: "Azul Pastel" },
  { color: "#BDB2FF", name: "Roxo Pastel" },
  { color: "#FFC6FF", name: "Rosa Pastel" },
  { color: "#222222", name: "Preto" },
];

const THEME_OPTIONS = [
  { id: "theme-pink", color: "#e93da1", name: "Rosa" },
  { id: "theme-lightpink", color: "#ee82e0", name: "Rosa Claro" },
  { id: "theme-red", color: "#f43f5e", name: "Vermelho" },
  { id: "theme-peach", color: "#fb923c", name: "Pêssego" },
  { id: "theme-orange", color: "#f97316", name: "Laranja" },
  { id: "theme-mint", color: "#34d399", name: "Menta" },
  { id: "theme-teal", color: "#14b8a6", name: "Verde Mar" },
  { id: "theme-sky", color: "#38bdf8", name: "Céu" },
  { id: "theme-blue", color: "#0ea5e9", name: "Azul" },
  { id: "theme-lavender", color: "#c084fc", name: "Lavanda" },
  { id: "theme-violet", color: "#8b5cf6", name: "Violeta" },
  { id: "theme-gray", color: "#64748b", name: "Cinza" },
];

const SpiralArc = ({ side }) => {
  const isRight = side === "right";
  const pathData = isRight
    ? "M30,15 a15,15 0 0,1 -15,15"
    : "M15,30 a15,15 0 0,1 -15,-15";
  return (
    <div className="spiral-arc">
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        style={{
          position: "absolute",
          top: "-5px",
          left: isRight ? "-30px" : "20px",
          overflow: "visible",
        }}
      >
        <path
          fill="none"
          stroke="#555555"
          strokeWidth="5"
          strokeLinecap="round"
          d={pathData}
        />
      </svg>
    </div>
  );
};

const SpiralBinding = () => (
  <div className="spiral-binding">
    <div className="spiral-arcs">
      {[0, 1, 2].map((i) => (
        <SpiralArc key={`arc-${i}`} side="right" />
      ))}
    </div>
  </div>
);

const SpiralBindingBack = () => (
  <div className="spiral-binding">
    <div className="spiral-arcs">
      {[0, 1, 2].map((i) => (
        <SpiralArc key={`arc-${i}`} side="left" />
      ))}
    </div>
  </div>
);

const HolePunchStrip = () => (
  <div className="hole-punch-strip">
    <div className="hole"></div>
    <div className="hole"></div>
    <div className="hole"></div>
  </div>
);

const CardConfigModal = ({
  isOpen,
  onClose,
  onUpdateCard,
  mockSearchCards,
  cardToEdit,
  handleMouseMove,
}) => {
  const isEditing = !!cardToEdit;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedIdol, setSelectedIdol] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCardId, setSelectedCardId] = useState(null);

  const [tempCardStatus, setTempCardStatus] = useState("have");
  const [tempSleeveColor, setTempSleeveColor] = useState("#ffffff");
  const currentCard = isEditing
    ? cardToEdit
    : mockSearchCards.find((card) => card.id === selectedCardId);

  useEffect(() => {
    if (isOpen) {
      if (isEditing) {
        setTempSleeveColor(cardToEdit.sleeveColor || "#ffffff");
        setTempCardStatus(cardToEdit.status || "have");
        setSelectedCardId(null);
      } else {
        setTempSleeveColor("#ffffff");
        setTempCardStatus("have");
        setSelectedCardId(null);
      }
      setSearchTerm("");
      setSelectedGroup("");
      setSelectedIdol("");
      setSelectedType("");
    }
  }, [isOpen, isEditing, cardToEdit]);

  const filteredCards = isEditing
    ? []
    : mockSearchCards.filter((card) => {
        const matchesSearch =
          card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.idol.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.group.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesGroup = selectedGroup
          ? card.group === selectedGroup
          : true;
        const matchesIdol = selectedIdol ? card.idol === selectedIdol : true;
        const matchesType = selectedType ? card.type === selectedType : true;

        return matchesSearch && matchesGroup && matchesIdol && matchesType;
      });

  const handleSelectCard = (card) => {
    setSelectedCardId(card.id);
    setTempSleeveColor(card.sleeveColor || "#ffffff");
    setTempCardStatus(card.status || "have");
  };

  const handleConfirmAction = () => {
    if (!currentCard) return;

    const cardData = {
      ...currentCard,
      sleeveColor: tempSleeveColor,
      status: tempCardStatus,
    };
    onUpdateCard(cardData, !isEditing);
  };

  return (
    <div className={`modal-overlay ${isOpen ? "is-open" : ""}`}>
      <div className="modal-content large">
        <div className="modal-header">
          <button className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
          <h2 className="modal-title">
            {isEditing ? "Editar Photocard" : "Adicionar Photocard"}
          </h2>
        </div>

        <div className="modal-body-wrapper">
          {!isEditing && (
            <div className="search-filter-section">
              <div className="search-input-group">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Buscar por nome, idol, ou grupo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="filters-row">
                <select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                >
                  <option value="">Grupo (Todos)</option>
                  {ALL_GROUPS.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedIdol}
                  onChange={(e) => setSelectedIdol(e.target.value)}
                >
                  <option value="">Idol (Todos)</option>
                  {ALL_IDOLS.filter(
                    (idol) =>
                      !selectedGroup ||
                      mockSearchCards.some(
                        (card) =>
                          card.idol === idol && card.group === selectedGroup
                      )
                  ).map((idol) => (
                    <option key={idol} value={idol}>
                      {idol}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="">Tipo (Todos)</option>
                  {ALL_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type.replace("-card", "").replace("-", " ")}
                    </option>
                  ))}
                </select>
              </div>
              <div className="results-list">
                {filteredCards.length > 0 ? (
                  filteredCards.map((card) => (
                    <div
                      key={card.id}
                      className={`result-item ${
                        selectedCardId === card.id ? "selected" : ""
                      }`}
                      onClick={() => handleSelectCard(card)}
                    >
                      <div className="result-img-wrapper">
                        <div
                          className={`card ${card.type}`}
                          style={{
                            backgroundImage: `url('${card.img1}')`,
                          }}
                        ></div>
                      </div>
                      <div className="result-info">
                        <p className="card-name">**{card.name}**</p>
                        <p className="card-details">
                          {card.group} | {card.idol}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-results">Nenhum card encontrado.</p>
                )}
              </div>
            </div>
          )}
          {currentCard ? (
            <div className="selected-card-details">
              <h3>
                {isEditing ? "Editando" : "Configurar Card"}: **
                {currentCard.name}
                **
              </h3>
              <div className="preview-card-wrapper">
                <div
                  className="photocard-sleeve"
                  style={{ backgroundColor: tempSleeveColor }}
                >
                  <div
                    className={`card ${currentCard.type}`}
                    style={{
                      backgroundImage: `url('${currentCard.img1}')`,
                    }}
                    onMouseMove={handleMouseMove}
                  >
                    {currentCard.type === "lenticular-card" &&
                      currentCard.img2 && (
                        <>
                          <div
                            className="lenticular-fg"
                            style={{
                              backgroundImage: `url('${currentCard.img2}')`,
                            }}
                          ></div>
                          <div className="lenticular-pattern"></div>
                          <div className="light"></div>
                        </>
                      )}
                  </div>
                </div>
              </div>
              <div className="config-options">
                <div className="config-group">
                  <span className="label">Status:</span>
                  <select
                    value={tempCardStatus}
                    onChange={(e) => setTempCardStatus(e.target.value)}
                  >
                    {Object.entries(STATUS_TEXT).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="config-group">
                  <span className="label">Cor da Sleeve:</span>
                  <div className="color-picker-container compact">
                    {SLEEVE_COLORS.map((swatch) => (
                      <button
                        key={swatch.color}
                        className={`color-swatch ${
                          tempSleeveColor === swatch.color ? "active" : ""
                        }`}
                        style={{ backgroundColor: swatch.color }}
                        onClick={() => setTempSleeveColor(swatch.color)}
                        title={swatch.name}
                        aria-label={`Selecionar cor ${swatch.name}`}
                      >
                        {tempSleeveColor === swatch.color && (
                          <span className="material-symbols-outlined check-icon">
                            check
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button
                className="confirm-add-btn"
                onClick={handleConfirmAction}
                title={
                  isEditing
                    ? "Salvar Alterações"
                    : "Adicionar card selecionado ao slot"
                }
                disabled={!currentCard}
              >
                <span className="material-symbols-outlined">
                  {isEditing ? "save" : "add"}
                </span>
                {isEditing ? "Salvar Alterações" : "Adicionar Card"}
              </button>
            </div>
          ) : (
            <div className="selected-card-details empty-state">
              <p>
                Selecione um card da lista para visualizar e configurar antes de
                adicionar.
              </p>
              <Search size={40} color="#888" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export function BinderPage() {
  const [binders, setBinders] = useState(BINDERS_DATA);
  const [selectedBinder, setSelectedBinder] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(0);
  const [labeledMode, setLabeledMode] = useState(false);
  const [pagesData, setPagesData] = useState(INITIAL_CARDS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isNewBinderModalOpen, setIsNewBinderModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCardPosition, setSelectedCardPosition] = useState(null);
  const [dragSource, setDragSource] = useState(null);
  const [isFlippedInModal, setIsFlippedInModal] = useState(false);
  const [showLenticularAlt, setShowLenticularAlt] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [configPosition, setConfigPosition] = useState(null);

  const totalPages = 4;

  useEffect(() => {
    if (labeledMode) document.body.classList.add("labeled-mode-active");
    else document.body.classList.remove("labeled-mode-active");
  }, [labeledMode]);

  useEffect(() => {
    if (isModalOpen || isConfigModalOpen)
      document.body.classList.add("info-visible");
    else document.body.classList.remove("info-visible");
  }, [isModalOpen, isConfigModalOpen]);

  useEffect(() => {
    if (selectedCard) {
      setIsFlippedInModal(false);
      setShowLenticularAlt(false);
    }
  }, [selectedCard]);

  const openBinder = (binder) => {
    setSelectedBinder(binder);
    setCurrentLocation(0);
  };
  const closeBinder = () => {
    setSelectedBinder(null);
    setCurrentLocation(0);
  };
  const goNextPage = () => {
    if (currentLocation < totalPages) setCurrentLocation((prev) => prev + 1);
  };
  const goPrevPage = () => {
    if (currentLocation > 0) setCurrentLocation((prev) => prev - 1);
  };

  const openAddCardModal = (pageIndex, slotIndex) => {
    setConfigPosition({ pageIndex, slotIndex });
    setIsConfigModalOpen(true);
  };

  const openEditCardModal = (card, pageIndex, slotIndex) => {
    setConfigPosition({ pageIndex, slotIndex });
    setSelectedCard(card);
    setIsConfigModalOpen(true);
  };

  const closeConfigModal = () => {
    setIsConfigModalOpen(false);
    setConfigPosition(null);
    setSelectedCard(null);
  };

  const handleCreateBinder = (newBinderData) => {
    const newBinder = {
      id: binders.length + 1,
      ...newBinderData,
      rows: Number(newBinderData.rows),
      cols: Number(newBinderData.cols),
    };
    setBinders([...binders, newBinder]);
  };

  const handleUpdateCardInSlot = (cardData, isNewCard) => {
    if (!configPosition) return;
    const { pageIndex, slotIndex } = configPosition;

    const newPagesData = pagesData.map((page, pIdx) =>
      pIdx === pageIndex
        ? page.map((item, sIdx) => {
            if (sIdx === slotIndex) {
              return {
                ...cardData,
                id: isNewCard ? Date.now() + Math.random() : cardData.id,
              };
            }
            return item;
          })
        : page
    );
    setPagesData(newPagesData);
    closeConfigModal();
  };

  const handleDeleteCard = () => {
    if (!selectedCardPosition) return;

    const { pageIndex, slotIndex } = selectedCardPosition;

    const newPagesData = pagesData.map((page, pIdx) =>
      pIdx === pageIndex
        ? page.map((item, sIdx) => (sIdx === slotIndex ? null : item))
        : page
    );
    setPagesData(newPagesData);
    setIsModalOpen(false);
    setSelectedCard(null);
    setSelectedCardPosition(null);
    setIsDetailModalOpen(false);
  };

  const handleCardClick = (card, pageIndex, slotIndex) => {
    if (card) {
      setSelectedCard(card);
      setSelectedCardPosition({ pageIndex, slotIndex });
      setIsModalOpen(true);
    }
  };

  const handleDragStart = (e, pageIndex, slotIndex) => {
    setDragSource({ pageIndex, slotIndex });
    e.dataTransfer.effectAllowed = "move";
    setTimeout(() => {
      const element =
        e.target.closest(".photocard-sleeve") ||
        e.target.closest(".add-photocard-wrapper");
      if (element) element.classList.add("dragging");
    }, 0);
  };

  const handleDragEnd = (e) => {
    const element =
      e.target.closest(".photocard-sleeve") ||
      e.target.closest(".add-photocard-wrapper");
    if (element) element.classList.remove("dragging");
    setDragSource(null);
    document
      .querySelectorAll(".pocket.drag-over")
      .forEach((el) => el.classList.remove("drag-over"));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    e.currentTarget.classList.add("drag-over");
  };
  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove("drag-over");
  };

  const handleDrop = (e, targetPageIndex, targetSlotIndex) => {
    e.preventDefault();
    e.currentTarget.classList.remove("drag-over");
    if (!dragSource) return;
    const { pageIndex: srcPage, slotIndex: srcSlot } = dragSource;
    if (srcPage === targetPageIndex && srcSlot === targetSlotIndex) return;
    const newPagesData = [...pagesData];
    newPagesData[srcPage] = [...newPagesData[srcPage]];
    newPagesData[targetPageIndex] = [...newPagesData[targetPageIndex]];
    const sourceItem = newPagesData[srcPage][srcSlot];
    const targetItem = newPagesData[targetPageIndex][targetSlotIndex];
    newPagesData[srcPage][srcSlot] = targetItem;
    newPagesData[targetPageIndex][targetSlotIndex] = sourceItem;
    setPagesData(newPagesData);
    setDragSource(null);
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

  const NewBinderModal = ({ isOpen, onClose, onCreate }) => {
    const [title, setTitle] = useState("");
    const [rows, setRows] = useState(3);
    const [cols, setCols] = useState(3);
    const [selectedTheme, setSelectedTheme] = useState("theme-pink");

    if (!isOpen) return null;

    const handleSubmit = (e) => {
      e.preventDefault();
      onCreate({ title, rows, cols, theme: selectedTheme });
      setTitle("");
      setRows(3);
      setCols(3);
      setSelectedTheme("theme-pink");
      onClose();
    };

    return (
      <div className="modal-overlay is-open">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">Novo Binder</h2>
            <button className="modal-close-btn" onClick={onClose}>
              &times;
            </button>
          </div>
          <form onSubmit={handleSubmit} className="new-binder-form">
            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Ex: Girl Groups"
                className="form-input"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Linhas</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={rows}
                  onChange={(e) => setRows(Number(e.target.value))}
                  className="form-input"
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Colunas</label>
                <input
                  type="number"
                  min="1"
                  max="4"
                  value={cols}
                  onChange={(e) => setCols(Number(e.target.value))}
                  className="form-input"
                  disabled
                />
              </div>
            </div>
            <div className="form-group">
              <label>Tema</label>
              <div className="theme-grid">
                {THEME_OPTIONS.map((t) => (
                  <div
                    key={t.id}
                    className={`theme-option ${
                      selectedTheme === t.id ? "selected" : ""
                    }`}
                    style={{ backgroundColor: t.color }}
                    onClick={() => setSelectedTheme(t.id)}
                    title={t.name}
                  >
                    {selectedTheme === t.id && (
                      <Check size={16} color="white" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <button type="submit" className="btn btn-primary full-width">
              Criar
            </button>
          </form>
        </div>
      </div>
    );
  };

  const renderGrid = (pageDataIndex) => {
    const rows = selectedBinder ? selectedBinder.rows || 3 : 3;
    const cols = selectedBinder ? selectedBinder.cols || 3 : 3;
    const totalSlots = rows * cols;
    const pageCards = pagesData[pageDataIndex] || [];
    const gridCards = Array(totalSlots)
      .fill(null)
      .map((_, i) => pageCards[i] || null);

    return (
      <div
        className="pocket-grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {gridCards.map((card, idx) => (
          <div
            key={idx}
            className="pocket"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, pageDataIndex, idx)}
          >
            {card ? (
              <div
                className={`photocard-sleeve ${card.sleeveClass || ""}`}
                style={{ backgroundColor: card.sleeveColor || "#fff" }}
                draggable={true}
                onDragStart={(e) => handleDragStart(e, pageDataIndex, idx)}
                onDragEnd={handleDragEnd}
                onClick={() => handleCardClick(card, pageDataIndex, idx)}
              >
                <div
                  className={`card ${card.type}`}
                  style={{ backgroundImage: `url('${card.img1}')` }}
                  onMouseMove={handleMouseMove}
                >
                  {card.type === "lenticular-card" && card.img2 && (
                    <>
                      <div
                        className="lenticular-fg"
                        style={{ backgroundImage: `url('${card.img2}')` }}
                      ></div>
                      <div className="lenticular-pattern"></div>
                      <div className="light"></div>
                    </>
                  )}
                </div>
                {card.status && (
                  <div
                    className="status-icon-container"
                    data-tooltip={STATUS_TEXT[card.status]}
                  >
                    <span className="material-symbols-outlined status-icon">
                      {STATUS_TO_ICON[card.status]}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="add-photocard-wrapper">
                <span>Vazio</span>
                <span className="material-symbols-outlined">playing_cards</span>
                <button
                  className="photocard-add-btn "
                  onClick={() => openAddCardModal(pageDataIndex, idx)}
                >
                  Adicionar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const bookClass = `book ${currentLocation > 0 ? "open" : ""} ${
    currentLocation === totalPages ? "at-back-cover" : ""
  }`;
  const getPageProps = (index) => {
    const isFlipped = index < currentLocation;
    let zIndex = totalPages - index;
    if (isFlipped) zIndex = index;
    return {
      className: `page ${isFlipped ? "flipped" : ""}`,
      style: { zIndex },
    };
  };

  return (
    <div className="content-binders">
      <NewBinderModal
        isOpen={isNewBinderModalOpen}
        onClose={() => setIsNewBinderModalOpen(false)}
        onCreate={handleCreateBinder}
      />

      {isModalOpen && selectedCard && (
        <>
          <div
            id="info-box-overlay"
            onClick={() => setIsModalOpen(false)}
            className={isModalOpen ? "is-open" : ""}
          ></div>
          <div id="info-box">
            <button id="info-box-close" onClick={() => setIsModalOpen(false)}>
              &times;
            </button>
            <h2 className="modal-title">
              Inspeção do Card: **{selectedCard.name || "Sem Nome"}**
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
                    backgroundColor: selectedCard.sleeveColor || "#fff",
                    padding: "10px",
                  }}
                >
                  <div
                    className={`card ${selectedCard.type}`}
                    style={{
                      backgroundImage: `url('${
                        selectedCard.type === "lenticular-card" &&
                        showLenticularAlt
                          ? selectedCard.img2
                          : selectedCard.img1
                      }')`,
                      width: "100%",
                      height: "100%",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    onMouseMove={handleMouseMove}
                  >
                    {selectedCard.type === "lenticular-card" &&
                      selectedCard.img2 && (
                        <>
                          <div
                            className="lenticular-fg"
                            style={{
                              backgroundImage: `url('${selectedCard.img2}')`,
                            }}
                          ></div>
                          <div className="lenticular-pattern"></div>
                          <div className="light"></div>
                        </>
                      )}
                  </div>
                </div>
                <div
                  className="modal-card-face modal-card-back"
                  style={{
                    backgroundColor: selectedCard.sleeveColor || "#fff",
                    padding: "10px",
                  }}
                >
                  <img
                    src={
                      selectedCard.backImg ||
                      "https://placehold.co/250x350/94A3B8/FFF?text=Verso+Genérico"
                    }
                    alt="Verso do Card"
                    className="modal-img-display"
                  />
                </div>
              </div>
            </div>
            <div className="modal-controls">
              <button
                className="modal-action-btn secondary"
                onClick={() => {
                  setIsModalOpen(false);
                  openEditCardModal(
                    selectedCard,
                    selectedCardPosition.pageIndex,
                    selectedCardPosition.slotIndex
                  );
                }}
              >
                <span className="material-symbols-outlined">edit</span> Editar
              </button>
              <button
                className="modal-action-btn"
                onClick={() => setIsFlippedInModal(!isFlippedInModal)}
                title={isFlippedInModal ? "Ver Frente" : "Ver Verso"}
              >
                <span className="material-symbols-outlined">360</span>
                {isFlippedInModal ? "Frente" : "Verso"}
              </button>
              {selectedCard.type === "lenticular-card" && !isFlippedInModal && (
                <button
                  className="modal-action-btn"
                  onClick={() => setShowLenticularAlt(!showLenticularAlt)}
                  title="Alternar efeito lenticular"
                >
                  <span className="material-symbols-outlined">animation</span>
                  {showLenticularAlt ? "Vista A" : "Vista B"}
                </button>
              )}
              <button
                className="modal-action-btn delete-btn"
                onClick={handleDeleteCard}
                title="Remover Card do Slot"
                style={{
                  backgroundColor: "#FEE2E2",
                  borderColor: "#FCA5A5",
                  color: "#DC2626",
                }}
              >
                <span className="material-symbols-outlined">delete</span>{" "}
                Remover
              </button>
            </div>
            <div className="modal-info-details">
              <div className="info-row">
                <span className="label">Cor da Sleeve:</span>
                <div
                  className="color-preview-circle"
                  style={{
                    backgroundColor: selectedCard.sleeveColor || "#fff",
                  }}
                ></div>
              </div>
              <div className="info-divider"></div>
              <div className="info-row">
                <span className="label">Grupo:</span>
                <span className="value">{selectedCard.group || "N/A"}</span>
              </div>
              <div className="info-row">
                <span className="label">Idol:</span>
                <span className="value">{selectedCard.idol || "N/A"}</span>
              </div>
              <div className="info-row">
                <span className="label">Tipo:</span>
                <span className="value">
                  {selectedCard.type.replace("-card", "").replace("-", " ")}
                </span>
              </div>
              <div className="info-row status-row">
                <span className="label">Status:</span>
                <div className="status-badge">
                  <span className="material-symbols-outlined">
                    {STATUS_TO_ICON[selectedCard.status]}
                  </span>
                  <span>{STATUS_TEXT[selectedCard.status]}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <CardConfigModal
        isOpen={isConfigModalOpen}
        onClose={closeConfigModal}
        onUpdateCard={handleUpdateCardInSlot}
        mockSearchCards={MOCK_SEARCH_CARDS}
        cardToEdit={
          configPosition
            ? pagesData[configPosition.pageIndex][configPosition.slotIndex]
            : null
        }
        handleMouseMove={handleMouseMove}
      />

      {isDetailModalOpen && selectedCard && (
        <div
          className="modal-overlay is-open"
          onClick={() => setIsDetailModalOpen(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedCard.name}</h3>
              <button
                className="modal-close-btn"
                onClick={() => setIsDetailModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body-centered">
              <div
                className="photocard-sleeve"
                style={{
                  width: 200,
                  height: 280,
                  backgroundColor: selectedCard.sleeveColor,
                }}
              >
                <div
                  className={`card ${selectedCard.type}`}
                  style={{ backgroundImage: `url('${selectedCard.img1}')` }}
                />
              </div>
              <div className="modal-actions-row">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setIsDetailModalOpen(false);
                    setIsConfigModalOpen(true);
                  }}
                >
                  Editar
                </button>
                <button
                  className="btn btn-primary delete-btn"
                  onClick={handleDeleteCard}
                >
                  Remover
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {!selectedBinder && (
        <div className="view-section binder-list">
          <h1 className="shelf-header">Meus Binders</h1>
          <div className="shelf-grid">
            {binders.map((binder) => (
              <div
                key={binder.id}
                className={`shelf-item ${binder.theme}`}
                onClick={() => openBinder(binder)}
              >
                <div className="cover-border">
                  <div className="name-tag">
                    <h3 dangerouslySetInnerHTML={{ __html: binder.title }}></h3>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                  </div>
                </div>
                <div className="elastic-band"></div>
              </div>
            ))}
            <div
              className="shelf-item add-binder-item"
              onClick={() => setIsNewBinderModalOpen(true)}
            >
              <div className="add-binder-content">
                <Plus size={48} /> <span>Novo Binder</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedBinder && (
        <div
          className="view-section binder-open-view"
          style={{ top: "0px", transition: "top 0.5s ease" }}
        >
          <div className="binder-controls-overlay">
            <button onClick={closeBinder} className="back-btn-simple">
              &larr; Voltar
            </button>
            <div id="mode-toggle">
              <button
                id="clean-mode-btn"
                className={!labeledMode ? "active" : ""}
                onClick={() => setLabeledMode(false)}
              >
                Limpo
              </button>
              <button
                id="labeled-mode-btn"
                className={labeledMode ? "active" : ""}
                onClick={() => setLabeledMode(true)}
              >
                Rotulado
              </button>
            </div>
          </div>
          <button
            id="prev-page-btn"
            className="page-nav-button"
            disabled={currentLocation === 0}
            onClick={goPrevPage}
          >
            <span className="material-symbols-outlined">
              arrow_back_ios_new
            </span>
          </button>
          <button
            id="next-page-btn"
            className="page-nav-button"
            disabled={currentLocation === totalPages}
            onClick={goNextPage}
          >
            <span className="material-symbols-outlined">arrow_forward_ios</span>
          </button>
          <div className="book-container">
            <div className={bookClass} id="book">
              <div {...getPageProps(0)} id="page-0">
                <div className="face front cover-face page-0-front">
                  <div className="cover-border">
                    <div className="name-tag">
                      <h3
                        dangerouslySetInnerHTML={{
                          __html: selectedBinder.title,
                        }}
                      ></h3>
                      <div className="line"></div>
                      <div className="line"></div>
                      <div className="line"></div>
                    </div>
                  </div>
                  <div className="elastic-band"></div>
                </div>
                <div className="face back cover-face page-0-back">
                  <HolePunchStrip /> <SpiralBindingBack />
                  <div className="cover-border"></div>
                </div>
              </div>
              {[1, 2].map((pageNum) => (
                <div
                  key={pageNum}
                  {...getPageProps(pageNum)}
                  id={`page-${pageNum}`}
                >
                  <div className="face front">
                    <HolePunchStrip /> <SpiralBinding />
                    <div className="page-content custom-grid-area">
                      {renderGrid((pageNum - 1) * 2)}
                    </div>
                    <div className="page-number">{pageNum * 2 - 1}</div>
                  </div>
                  <div className="face back">
                    <HolePunchStrip /> <SpiralBindingBack />
                    <div className="page-content custom-grid-area">
                      {renderGrid((pageNum - 1) * 2 + 1)}
                    </div>
                    <div className="page-number">{pageNum * 2}</div>
                  </div>
                </div>
              ))}
              <div {...getPageProps(3)} id="page-3">
                <div className="face front cover-face page-3-front">
                  <HolePunchStrip /> <SpiralBinding />
                  <div className="cover-border"></div>
                </div>
                <div className="face back cover-face cover-back page-3-back">
                  <div className="cover-border"></div>
                  <div className="elastic-band"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BinderPage;
