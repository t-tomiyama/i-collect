import React, { useEffect } from "react";
import {
  Home,
  Users,
  Settings,
  Heart,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LogOut,
  Music2,
  Disc,
  Image,
  BookOpen,
  BookHeart,
  Package,
  Truck,
  Gift,
  Archive,
  ShoppingBag,
  CreditCard,
  Tag,
} from "lucide-react";

export const NAV_ITEMS = [
  { type: "link", icon: Home, label: "Visão Geral", id: "home" },
  {
    type: "category",
    icon: Archive,
    label: "Catálogo",
    id: "catalog",
    items: [
      { label: "Pesquisar", id: "search", icon: Search },
      /*
      { label: "Artistas", id: "artists", icon: Music2 },
      { label: "Releases", id: "releases", icon: Disc },
      { label: "Photocards", id: "pcs", icon: Image },*/
    ],
  },
  {
    type: "category",
    icon: Users,
    label: "Comunidade",
    id: "community",
    items: [
      { label: "Pesquisar Membros", id: "comm-find", icon: Search },
      { label: "CEGs Ativas", id: "comm-cegs", icon: Package },
    ],
  },
  {
    type: "category",
    icon: BookHeart,
    label: "Minha Coleção",
    id: "collection",
    items: [
      { label: "Meus Binders", id: "my-binders", icon: BookOpen },
      { label: "Lista de Desejos", id: "col-wish", icon: Heart },
    ],
  },
  {
    type: "category",
    icon: ShoppingBag,
    label: "Compras",
    id: "purchases",
    items: [
      { label: "A Caminho", id: "haul-in", icon: Truck },
      { label: "Recebidos", id: "haul-received", icon: Package },
      { label: "Pagamentos", id: "payments", icon: CreditCard },
      { label: "Todas as Compras", id: "haul-all", icon: Archive },
    ],
  },
  {
    type: "category",
    icon: Gift,
    label: "Vendas",
    id: "sales",
    items: [
      { label: "Vendas Ativas", id: "sales-active", icon: Tag },
      { label: "Todas as Vendas", id: "sales-all", icon: Archive },
    ],
  },
  { type: "link", icon: Settings, label: "Configurações", id: "settings" },
];

// IDs permitidos para visitantes (Top Level)
const GUEST_ALLOWED_IDS = ["home", "catalog", "collection"];

export const Sidebar = ({
  user,
  sidebarOpen,
  setSidebarOpen,
  activeNav,
  handleNavClick,
  expandedCategories,
  toggleCategory,
  onLogout,
}) => {
  // Lógica de filtro para visitantes
  const navItemsToDisplay = user
    ? NAV_ITEMS
    : NAV_ITEMS.filter((item) => GUEST_ALLOWED_IDS.includes(item.id)).map(
        (item) => {
          // Regra específica: Se for "Minha Coleção", mostra apenas "Meus Binders"
          if (item.id === "collection") {
            return {
              ...item,
              items: item.items.filter((sub) => sub.id === "my-binders"),
            };
          }
          // Para "Catálogo" e "Home", retorna como está
          return item;
        }
      );

  useEffect(() => {
    const activeCategory = NAV_ITEMS.find(
      (item) =>
        item.type === "category" &&
        item.items &&
        item.items.some((subItem) => subItem.id === activeNav)
    );

    if (activeCategory && !expandedCategories.includes(activeCategory.id)) {
      toggleCategory(activeCategory.id);
    }
  }, [activeNav, expandedCategories, toggleCategory]);

  const handleCategoryClick = (categoryId) => {
    if (expandedCategories.includes(categoryId)) {
      toggleCategory(categoryId);
    } else {
      expandedCategories.forEach((expandedId) => {
        if (expandedId !== categoryId) {
          toggleCategory(expandedId);
        }
      });
      toggleCategory(categoryId);
    }
  };

  return (
    <aside className={`sidebar ${!sidebarOpen ? "closed" : ""}`}>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="sidebar__toggle"
        title={sidebarOpen ? "Recolher menu" : "Expandir menu"}
      >
        {sidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>

      <nav className="sidebar__nav">
        {navItemsToDisplay.map((item) => {
          if (item.type === "category") {
            const isExpanded = expandedCategories.includes(item.id);
            const hasActiveChild = item.items.some(
              (sub) => sub.id === activeNav
            );

            return (
              <div className="nav-category" key={item.id}>
                <div className="nav-item-tooltip-wrapper">
                  <button
                    onClick={() => handleCategoryClick(item.id)}
                    className={`nav-category__header ${
                      hasActiveChild || isExpanded ? "has-active-child" : ""
                    }`}
                  >
                    <div className="nav-link-content">
                      <item.icon size={22} className="nav-link-icon" />
                      <span className="nav-link-label">{item.label}</span>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`nav-category__chevron ${
                        isExpanded ? "expanded" : ""
                      }`}
                    />
                  </button>

                  {!sidebarOpen && (
                    <div className="nav-item-tooltip">{item.label}</div>
                  )}
                </div>

                <div
                  className={`nav-category__sub-list ${
                    isExpanded && sidebarOpen ? "expanded" : ""
                  }`}
                >
                  <div className="nav-category__sub-list-inner">
                    {item.items.map((subitem) => {
                      const isSubActive = activeNav === subitem.id;
                      return (
                        <button
                          key={subitem.id}
                          onClick={() => handleNavClick(subitem.id)}
                          className={`nav-link sub-link ${
                            isSubActive ? "active" : ""
                          }`}
                        >
                          {subitem.icon ? (
                            <subitem.icon size={18} className="nav-link-icon" />
                          ) : (
                            <span className="nav-link-bullet" />
                          )}
                          <span className="nav-link-label truncate">
                            {subitem.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          }

          const isActive = activeNav === item.id;
          return (
            <div className="nav-item-tooltip-wrapper" key={item.id}>
              <button
                onClick={() => handleNavClick(item.id)}
                className={`nav-link ${isActive ? "active" : ""}`}
              >
                {isActive && <span className="nav-link-active-pill" />}
                <item.icon
                  size={22}
                  className="nav-link-icon"
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className="nav-link-label">{item.label}</span>
              </button>

              {!sidebarOpen && (
                <div className="nav-item-tooltip">{item.label}</div>
              )}
            </div>
          );
        })}

        {user && !user.isGuest && (
          <div className="sidebar__logout-group">
            <div className="nav-item-tooltip-wrapper">
              <button
                className="nav-link sidebar__logout-button"
                onClick={onLogout}
              >
                <LogOut size={22} className="nav-link-icon" />
                <span className="nav-link-label">Sair</span>
              </button>

              {!sidebarOpen && <div className="nav-item-tooltip">Sair</div>}
            </div>
          </div>
        )}

        {user && user.isGuest && (
          <div className="sidebar__logout-group">
            <div className="nav-item-tooltip-wrapper">
              <button
                className="nav-link sidebar__logout-button"
                onClick={onLogout}
              >
                <LogOut size={22} className="nav-link-icon" />
                <span className="nav-link-label">Sair do Modo Visitante</span>
              </button>

              {!sidebarOpen && <div className="nav-item-tooltip">Sair</div>}
            </div>
          </div>
        )}
      </nav>
    </aside>
  );
};
