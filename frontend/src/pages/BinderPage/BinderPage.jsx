import React, { useState, useEffect } from "react";
import { BookOpen, Search, Plus, Check, AlertCircle } from "lucide-react";
import api, { bindersAPI } from "../../services/api";
import "./BinderPage.css";

const MOCK_SEARCH_CARDS = [
  {
    id: 100,
    group: "Stray Kids",
    idol: "Lee Know",
    name: "Levanter - Limited - Lenticular",
    type: "lenticular-card",
    img1: "https://i.pinimg.com/1200x/82/8c/2e/828c2e0ede20f8e99c1c33b2dc25085d.jpg",
    backImg:
      "https://i.pinimg.com/564x/e1/9d/05/e19d05320d351b40215443899e58737a.jpg",
    sleeveColor: "#ffffff",
    status: "have",
  },
  {
    id: 101,
    group: "(G)I-DLE",
    idol: "Minnie",
    name: "Minnie - POB Makestar - I SWAY",
    type: "glossy-card",
    img1: "https://i.pinimg.com/736x/13/b9/72/13b9728245ced939356886aa5a900755.jpg",
    backImg:
      "https://i.pinimg.com/564x/c9/1c/19/c91c1995369f7c21b728402b24eba2af.jpg",
    sleeveColor: "#A7D9FD",
    status: "wishlist",
  },
];

const INITIAL_CARDS_MOCK = [
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
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  Array(9).fill(null),
  Array(9).fill(null),
  Array(9).fill(null),
];

const BINDERS_DATA_MOCK = [
  {
    id: "guest-binder-1",
    title: "Minha Coleção (Visitante)",
    theme: "theme-pink",
    rows: 3,
    cols: 3,
  },
];

const MOCK_SLEEVE_COLORS = [
  { id: 1, hex_color: "#ffffff" },
  { id: 2, hex_color: "#A7D9FD" },
  { id: 3, hex_color: "#B5EAD7" },
  { id: 4, hex_color: "#FFECB3" },
  { id: 5, hex_color: "#E0BBE4" },
  { id: 6, hex_color: "#FFC09F" },
  { id: 7, hex_color: "#334155" },
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

const THEME_OPTIONS = [
  { id: "theme-pink", color: "#e93da1" },
  { id: "theme-lightpink", color: "#ee82e0" },
  { id: "theme-red", color: "#f43f5e" },
  { id: "theme-peach", color: "#fb923c" },
  { id: "theme-orange", color: "#f97316" },
  { id: "theme-mint", color: "#34d399" },
  { id: "theme-teal", color: "#14b8a6" },
  { id: "theme-sky", color: "#38bdf8" },
  { id: "theme-blue", color: "#0ea5e9" },
  { id: "theme-lavender", color: "#c084fc" },
  { id: "theme-violet", color: "#8b5cf6" },
  { id: "theme-gray", color: "#64748b" },
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
  sleeveColors,
}) => {
  const isEditing = !!cardToEdit;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [tempCardStatus, setTempCardStatus] = useState("have");
  const [tempSleeveColor, setTempSleeveColor] = useState("#ffffff");
  const [tempSleeveId, setTempSleeveId] = useState(null);

  const currentCard = isEditing
    ? cardToEdit
    : mockSearchCards.find((card) => card.id === selectedCardId);

  useEffect(() => {
    if (isOpen) {
      if (isEditing) {
        setTempSleeveColor(cardToEdit.sleeveColor || "#ffffff");
        setTempSleeveId(cardToEdit.sleeveId || null);
        setTempCardStatus(cardToEdit.status || "have");
        setSelectedCardId(null);
      } else {
        setTempSleeveColor(sleeveColors[0]?.hex_color || "#ffffff");
        setTempSleeveId(sleeveColors[0]?.id || null);
        setTempCardStatus("have");
        setSelectedCardId(null);
      }
      setSearchTerm("");
    }
  }, [isOpen, isEditing, cardToEdit, sleeveColors]);

  const filteredCards = isEditing
    ? []
    : mockSearchCards.filter(
        (card) =>
          card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.group?.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const handleSelectCard = (card) => {
    setSelectedCardId(card.id);
  };

  const handleConfirmAction = () => {
    if (!currentCard) return;
    const cardData = {
      ...currentCard,
      sleeveColor: tempSleeveColor,
      sleeveId: tempSleeveId,
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
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="results-list">
                {filteredCards.map((card) => (
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
                        style={{ backgroundImage: `url('${card.img1}')` }}
                      ></div>
                    </div>
                    <div className="result-info">
                      <p className="card-name">{card.name}</p>
                      <p className="card-details">
                        {card.group} | {card.idol}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {currentCard ? (
            <div className="selected-card-details">
              <h3>
                {isEditing ? "Editando" : "Configurar Card"}:{currentCard.name}
              </h3>
              <div className="preview-card-wrapper">
                <div
                  className="photocard-sleeve"
                  style={{ backgroundColor: tempSleeveColor }}
                >
                  <div
                    className={`card ${currentCard.type}`}
                    style={{ backgroundImage: `url('${currentCard.img1}')` }}
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
                    {sleeveColors.map((swatch) => (
                      <button
                        key={swatch.id}
                        className={`color-swatch ${
                          tempSleeveColor === swatch.hex_color ? "active" : ""
                        }`}
                        style={{ backgroundColor: swatch.hex_color }}
                        onClick={() => {
                          setTempSleeveColor(swatch.hex_color);
                          setTempSleeveId(swatch.id);
                        }}
                      >
                        {tempSleeveColor === swatch.hex_color && (
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
                className="confirm-add-btn btn-primary"
                onClick={handleConfirmAction}
              >
                {isEditing ? "Salvar Alterações" : "Adicionar Card"}
              </button>
            </div>
          ) : (
            <div className="selected-card-details empty-state">
              <p>Selecione um card da lista.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export function BinderPage({ user }) {
  const isVisitor = user?.isGuest || user?.id === "guest" || !user;

  const [binders, setBinders] = useState([]);
  const [selectedBinder, setSelectedBinder] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(0);
  const [labeledMode, setLabeledMode] = useState(false);
  const [pagesData, setPagesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sleeveColors, setSleeveColors] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewBinderModalOpen, setIsNewBinderModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCardPosition, setSelectedCardPosition] = useState(null);
  const [configPosition, setConfigPosition] = useState(null);
  const [dragSource, setDragSource] = useState(null);
  const [isFlippedInModal, setIsFlippedInModal] = useState(false);
  const [showLenticularAlt, setShowLenticularAlt] = useState(false);

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
    const fetchData = async () => {
      setIsLoading(true);
      if (isVisitor) {
        setBinders(BINDERS_DATA_MOCK);
        setSleeveColors(MOCK_SLEEVE_COLORS);
        setIsLoading(false);
      } else {
        try {
          const colorsRes = await api.get("/api/binders/sleeve-colors");
          setSleeveColors(colorsRes.data);

          const bindersRes = await bindersAPI.getUserBinders(
            user.id || user.username,
            1
          );
          if (Array.isArray(bindersRes)) {
            const formattedBinders = bindersRes.map((b) => ({
              id: b.ID,
              title: b.NAME,
              rows: b.ROWS,
              cols: b.COLUMNS,
              theme: b.COLOR?.startsWith("theme-") ? b.COLOR : "theme-pink",
            }));
            setBinders(formattedBinders);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, [user, isVisitor]);

  const transformBackendDataToGrid = (dbPages, rows, cols) => {
    const totalSlotsPerPage = rows * cols;
    const structure = Array(totalPages)
      .fill(null)
      .map(() => Array(totalSlotsPerPage).fill(null));

    if (!dbPages) return structure;

    dbPages.forEach((page) => {
      const pageIdx = page.page_number - 1;
      if (pageIdx >= 0 && pageIdx < totalPages && page.slots) {
        page.slots.forEach((slot) => {
          const linearIndex = (slot.row - 1) * cols + (slot.column - 1);
          if (linearIndex >= 0 && linearIndex < totalSlotsPerPage) {
            structure[pageIdx][linearIndex] = {
              id: slot.photocard.id,
              name: slot.photocard.name,
              img1:
                slot.photocard.front_image || "https://placehold.co/200x300",
              backImg: slot.photocard.back_image,
              type: "glossy-card",
              sleeveColor: slot.sleeve_color?.hex_color || "#ffffff",
              sleeveId: slot.sleeve_color?.id,
              status: "have",
            };
          }
        });
      }
    });
    return structure;
  };

  const openBinder = async (binder) => {
    setSelectedBinder(binder);
    setCurrentLocation(0);

    if (isVisitor) {
      setPagesData(INITIAL_CARDS_MOCK);
    } else {
      try {
        setIsLoading(true);
        const data = await bindersAPI.getBinderDetails(
          user.id || user.username,
          1,
          binder.id
        );
        const transformed = transformBackendDataToGrid(
          data.pages,
          binder.rows,
          binder.cols
        );
        setPagesData(transformed);
      } catch (error) {
        console.error(error);
        setPagesData(
          Array(totalPages)
            .fill(null)
            .map(() => Array(binder.rows * binder.cols).fill(null))
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const closeBinder = () => {
    setSelectedBinder(null);
    setCurrentLocation(0);
    setPagesData([]);
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

  const handleCreateBinder = async (newBinderData) => {
    if (isVisitor) {
      const newBinder = {
        id: `guest-binder-${binders.length + 1}`,
        ...newBinderData,
        rows: Number(newBinderData.rows),
        cols: Number(newBinderData.cols),
      };
      setBinders([...binders, newBinder]);
    } else {
      try {
        const payload = {
          name: newBinderData.title,
          rows: newBinderData.rows,
          columns: newBinderData.cols,
          color: newBinderData.theme,
        };
        const saved = await bindersAPI.createBinder(
          user.id || user.username,
          1,
          payload
        );
        setBinders([
          ...binders,
          {
            id: saved.ID,
            title: saved.NAME,
            rows: saved.ROWS,
            cols: saved.COLUMNS,
            theme: saved.COLOR,
          },
        ]);
      } catch (e) {
        console.error(e);
      }
    }
    setIsNewBinderModalOpen(false);
  };

  const handleUpdateCardInSlot = async (cardData, isNewCard) => {
    if (!configPosition) return;
    const { pageIndex, slotIndex } = configPosition;

    const newPagesData = pagesData.map((page, pIdx) =>
      pIdx === pageIndex
        ? page.map((item, sIdx) => {
            if (sIdx === slotIndex) {
              return { ...cardData, id: isNewCard ? Date.now() : cardData.id };
            }
            return item;
          })
        : page
    );
    setPagesData(newPagesData);

    if (!isVisitor && selectedBinder) {
      try {
        const row = Math.floor(slotIndex / selectedBinder.cols) + 1;
        const col = (slotIndex % selectedBinder.cols) + 1;
        const pageNum = pageIndex + 1;

        await api.put(
          `/api/binders/${user.id || user.username}/1/${
            selectedBinder.id
          }/pages/${pageNum}/slots`,
          {
            row,
            column: col,
            photocard: cardData.id,
            sleeve_color: cardData.sleeveId || 1,
          }
        );
      } catch (e) {
        console.error("Error syncing slot", e);
      }
    }
    closeConfigModal();
  };

  const handleDeleteCard = async () => {
    if (!selectedCardPosition) return;
    const { pageIndex, slotIndex } = selectedCardPosition;

    const newPagesData = pagesData.map((page, pIdx) =>
      pIdx === pageIndex
        ? page.map((item, sIdx) => (sIdx === slotIndex ? null : item))
        : page
    );
    setPagesData(newPagesData);

    if (!isVisitor && selectedBinder) {
      try {
        const row = Math.floor(slotIndex / selectedBinder.cols) + 1;
        const col = (slotIndex % selectedBinder.cols) + 1;
        const pageNum = pageIndex + 1;

        await api.put(
          `/api/binders/${user.id || user.username}/1/${
            selectedBinder.id
          }/pages/${pageNum}/slots`,
          {
            row,
            column: col,
            photocard: null,
          }
        );
      } catch (e) {
        console.error("Error deleting slot", e);
      }
    }

    setIsModalOpen(false);
    setSelectedCard(null);
    setSelectedCardPosition(null);
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
      const element = e.target.closest(".photocard-sleeve");
      if (element) element.classList.add("dragging");
    }, 0);
  };

  const handleDragEnd = (e) => {
    const element = e.target.closest(".photocard-sleeve");
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
                className="form-input"
                placeholder="Ex: Boy Groups"
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
                  className="photocard-add-btn"
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
    let zIndex;
    let zOffset;
    if (isFlipped) {
      zIndex = index;
      zOffset = index;
    } else {
      zIndex = totalPages - index;
      zOffset = totalPages - index;
    }
    return {
      className: `page ${isFlipped ? "flipped" : ""}`,
      style: { zIndex, "--z-offset": `${zOffset}px` },
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
            <h2 className="modal-title">{selectedCard.name || "Photocard"}</h2>
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
                      "https://placehold.co/250x350/94A3B8/FFF?text=Verso"
                    }
                    alt="Verso"
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
              >
                <span className="material-symbols-outlined">360</span>{" "}
                {isFlippedInModal ? "Frente" : "Verso"}
              </button>
              {selectedCard.type === "lenticular-card" && !isFlippedInModal && (
                <button
                  className="modal-action-btn"
                  onClick={() => setShowLenticularAlt(!showLenticularAlt)}
                >
                  <span className="material-symbols-outlined">animation</span>
                  {showLenticularAlt ? "Vista A" : "Vista B"}
                </button>
              )}
              <button
                className="modal-action-btn delete-btn"
                onClick={handleDeleteCard}
                style={{ backgroundColor: "#FEE2E2", color: "#DC2626" }}
              >
                <span className="material-symbols-outlined">delete</span>{" "}
                Remover
              </button>
            </div>
            <div className="modal-info-details">
              <div className="info-row">
                <span className="label">Grupo:</span>
                <span className="value">{selectedCard.group || "N/A"}</span>
              </div>
              <div className="info-row">
                <span className="label">Idol:</span>
                <span className="value">{selectedCard.idol || "N/A"}</span>
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
        sleeveColors={sleeveColors}
      />

      {!selectedBinder && (
        <div className="view-section binder-list">
          <h1 className="shelf-header">
            Meus Binders {isVisitor && <small>(Visitante)</small>}
          </h1>
          {!isVisitor && binders.length === 0 && !isLoading && (
            <div className="empty-state-warning">
              <AlertCircle
                size={48}
                color="#e93da1"
                style={{ marginBottom: "1rem" }}
              />
              <h3>Você ainda não tem nenhum Binder!</h3>
              <p>Crie seu primeiro binder agora para organizar sua coleção.</p>
              <button
                className="btn btn-primary"
                style={{ marginTop: "1rem" }}
                onClick={() => setIsNewBinderModalOpen(true)}
              >
                Criar Binder
              </button>
            </div>
          )}
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
        <div className="view-section binder-open-view">
          <div className="binder-controls-overlay">
            <button onClick={closeBinder} className="back-btn-simple">
              &larr; Voltar
            </button>
            <div id="mode-toggle">
              <button
                className={!labeledMode ? "active" : ""}
                onClick={() => setLabeledMode(false)}
              >
                Limpo
              </button>
              <button
                className={labeledMode ? "active" : ""}
                onClick={() => setLabeledMode(true)}
              >
                Rotulado
              </button>
            </div>
          </div>
          <button
            id="prev-page-btn"
            className="page-nav-button prev"
            disabled={currentLocation === 0}
            onClick={goPrevPage}
          >
            <span className="material-symbols-outlined">
              arrow_back_ios_new
            </span>
          </button>
          <button
            id="next-page-btn"
            className="page-nav-button next"
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
