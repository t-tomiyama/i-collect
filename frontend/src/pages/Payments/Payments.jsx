import React, { useState, useEffect } from "react";
import {
  CreditCard,
  AlertCircle,
  Wallet,
  Filter,
  ArrowUpDown,
  Search,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Users,
  ExternalLink,
} from "lucide-react";
import "./Payments.css";

const MOCK_PAYMENTS = [
  {
    id: 1,
    item: "LE SSERAFIM Easy CEG (EMS)",
    type: "Pgto. de CEG",
    amount: "R$25.00",
    originalAmount: 25.0,
    due: "2025-11-28",
    status: "atrasado",
    seller: "@chaewon_gom",
    cegName: "LE SSERAFIM Easy",
    lateFeePerCard: 1.5,
    image: "https://placehold.co/55x85/ffb7b2/ffffff?text=EASY",
    paid: false,
    category: "CEG",
    priority: "high",
    paymentForm: "https://forms.gle/chaewon_items",
    paymentType: "Itens",
  },
  {
    id: 2,
    item: "Wonyoung IVE SWITCH PC",
    type: "Compra Pessoal",
    amount: "R$18.50",
    originalAmount: 18.5,
    due: new Date().toISOString().split("T")[0],
    status: "vence hoje",
    seller: "@dive_into_ive",
    cegName: "IVE SWITCH",
    lateFeePerCard: 2.0,
    image: "https://placehold.co/55x85/e2e8f0/475569?text=WY",
    paid: false,
    category: "Pessoal",
    priority: "high",
    paymentForm: "https://forms.gle/dive_personal",
    paymentType: "Pessoal",
  },
  {
    id: 3,
    item: "NMIXX Fe3O4: BREAK CEG (Item)",
    type: "Pgto. de CEG",
    amount: "R$14.00",
    originalAmount: 14.0,
    due: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    status: "pendente",
    seller: "@haewon_vibes",
    cegName: "NMIXX Fe3O4",
    lateFeePerCard: 1.0,
    image: "https://placehold.co/55x85/bae6fd/0284c7?text=NMIXX",
    paid: false,
    category: "CEG",
    priority: "medium",
    paymentForm: "https://forms.gle/haewon_items",
    paymentType: "Itens",
  },
  {
    id: 4,
    item: "(G)I-DLE 2 Super Lady Set",
    type: "Pgto. de CEG",
    amount: "R$45.00",
    originalAmount: 45.0,
    due: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    status: "pendente",
    seller: "@neverland_CEGs",
    cegName: "(G)I-DLE 2",
    lateFeePerCard: 1.8,
    image: "https://placehold.co/55x85/fbcfe8/db2777?text=I-DLE",
    paid: false,
    category: "CEG",
    priority: "medium",
    paymentForm: "https://forms.gle/neverland_items",
    paymentType: "Itens",
  },
  {
    id: 5,
    item: "LE SSERAFIM Easy CEG (Frete)",
    type: "Pgto. de CEG",
    amount: "R$10.00",
    originalAmount: 10.0,
    due: "2025-11-28",
    status: "atrasado",
    seller: "@chaewon_gom",
    cegName: "LE SSERAFIM Easy",
    lateFeePerCard: 1.5,
    image: "https://placehold.co/55x85/ffb7b2/ffffff?text=EASY",
    paid: false,
    category: "Taxa",
    priority: "low",
    paymentForm: "https://forms.gle/chaewon_frete",
    paymentType: "Frete",
  },
  {
    id: 6,
    item: "TWICE READY TO BE PC Set",
    type: "Pgto. de CEG",
    amount: "R$32.00",
    originalAmount: 32.0,
    due: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    status: "pendente",
    seller: "@twice_global",
    cegName: "TWICE READY TO BE",
    lateFeePerCard: 1.2,
    image: "https://placehold.co/55x85/dbeafe/1e40af?text=TWICE",
    paid: false,
    category: "CEG",
    priority: "low",
    paymentForm: "https://forms.gle/twice_items",
    paymentType: "Itens",
  },
  {
    id: 7,
    item: "NewJeans GET UP Photocard",
    type: "Compra Pessoal",
    amount: "R$22.50",
    originalAmount: 22.5,
    due: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    status: "pendente",
    seller: "@bunnies_trades",
    cegName: "NewJeans GET UP",
    lateFeePerCard: 1.0,
    image: "https://placehold.co/55x85/f0fdf4/166534?text=NJ",
    paid: false,
    category: "Pessoal",
    priority: "medium",
    paymentForm: "https://forms.gle/bunnies_personal",
    paymentType: "Pessoal",
  },
  {
    id: 8,
    item: "TWICE READY TO BE (Frete)",
    type: "Pgto. de CEG",
    amount: "R$15.00",
    originalAmount: 15.0,
    due: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    status: "pendente",
    seller: "@twice_global",
    cegName: "TWICE READY TO BE",
    lateFeePerCard: 0.5,
    image: "https://placehold.co/55x85/dbeafe/1e40af?text=TWICE",
    paid: false,
    category: "Taxa",
    priority: "low",
    paymentForm: "https://forms.gle/twice_frete",
    paymentType: "Frete",
  },
];

const PaymentModal = ({ isVisible, onClose, payments, onPaymentSubmit }) => {
  if (!isVisible) return null;

  const totalAmount = payments.reduce((sum, p) => {
    const numericValue = parseFloat(
      p.amount.replace("R$", "").replace(",", ".")
    );
    return sum + numericValue;
  }, 0);

  const totalLateFees = payments.reduce((sum, p) => {
    if (p.status === "atrasado") {
      return sum + p.lateFeePerCard;
    }
    return sum;
  }, 0);

  const groupedPayments = payments.reduce((acc, pay) => {
    const seller = pay.seller;
    if (!acc[seller]) {
      acc[seller] = [];
    }
    acc[seller].push(pay);
    return acc;
  }, {});

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <h2 className="payment-modal__title">
          <div className="payment-modal__icon-wrapper">
            <CreditCard size={20} />
          </div>
          Realizar Pagamento
        </h2>

        {totalLateFees > 0 && (
          <div className="late-fee-warning">
            <AlertCircle size={20} />
            <strong>Taxas de atraso aplicadas:</strong> R${" "}
            {totalLateFees.toFixed(2).replace(".", ",")}
          </div>
        )}

        <p className="payment-modal__subtitle">
          Você está prestes a pagar <strong>{payments.length} item(s)</strong>,
          totalizando{" "}
          <strong>R${totalAmount.toFixed(2).replace(".", ",")}</strong>.
        </p>

        <div className="payment-modal__groups">
          {Object.entries(groupedPayments).map(([seller, items]) => {
            const sellerLateFees = items.reduce(
              (sum, item) =>
                item.status === "atrasado" ? sum + item.lateFeePerCard : sum,
              0
            );

            return (
              <div key={seller} className="payment-modal__group-card">
                <h3 className="group-card__title">
                  GOM: <strong>{seller}</strong> ({items.length} itens)
                  {sellerLateFees > 0 && (
                    <span className="group-card__late-fees">
                      (+R$ {sellerLateFees.toFixed(2)} de taxas)
                    </span>
                  )}
                </h3>
                <ul className="group-card__list">
                  {items.map((item) => (
                    <li key={item.id} className="group-card__item">
                      <div className="item-details">
                        <span className="item-name truncate">{item.item}</span>
                        <div className="item-meta">
                          <span
                            className={`item-status status-${item.status.replace(
                              " ",
                              "-"
                            )}`}
                          >
                            {item.status}
                            {item.status === "atrasado" && (
                              <span className="item-late-fee">
                                (+R$ {item.lateFeePerCard.toFixed(2)})
                              </span>
                            )}
                          </span>
                          <a
                            href={item.paymentForm}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="form-link"
                          >
                            <ExternalLink size={12} />
                            Form {item.paymentType}
                          </a>
                        </div>
                      </div>
                      <span className="item-amount font-bold">
                        {item.amount}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="payment-modal__footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn-primary" onClick={onPaymentSubmit}>
            Confirmar Pagamento Total (R${" "}
            {totalAmount.toFixed(2).replace(".", ",")})
          </button>
        </div>
      </div>
    </div>
  );
};

const Payments = ({ user }) => {
  const [payments, setPayments] = useState(MOCK_PAYMENTS);
  const [filteredPayments, setFilteredPayments] = useState(MOCK_PAYMENTS);
  const [selectedPayments, setSelectedPayments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTotalAmount, setShowTotalAmount] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [categoryFilter, setCategoryFilter] = useState("todos");
  const [sellerFilter, setSellerFilter] = useState("todos");
  const [cegFilter, setCegFilter] = useState("todos");
  const [sortBy, setSortBy] = useState("due");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showFilters, setShowFilters] = useState(false);

  const uniqueSellers = [...new Set(payments.map((p) => p.seller))];
  const uniqueCategories = [...new Set(payments.map((p) => p.category))];
  const uniqueCegs = [
    ...new Set(payments.map((p) => p.cegName).filter(Boolean)),
  ];

  const calculateTotalPayments = () => {
    const total = payments.reduce((sum, payment) => {
      return sum + payment.originalAmount;
    }, 0);
    return `R$${total.toFixed(2).replace(".", ",")}`;
  };

  const calculateTotalLateFees = () => {
    return payments.reduce((sum, payment) => {
      return payment.status === "atrasado" ? sum + payment.lateFeePerCard : sum;
    }, 0);
  };

  useEffect(() => {
    let filtered = [...payments];

    if (searchTerm) {
      filtered = filtered.filter(
        (payment) =>
          payment.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.cegName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "todos") {
      filtered = filtered.filter((payment) => payment.status === statusFilter);
    }

    if (categoryFilter !== "todos") {
      filtered = filtered.filter(
        (payment) => payment.category === categoryFilter
      );
    }

    if (sellerFilter !== "todos") {
      filtered = filtered.filter((payment) => payment.seller === sellerFilter);
    }

    if (cegFilter !== "todos") {
      filtered = filtered.filter((payment) => payment.cegName === cegFilter);
    }

    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "due":
          aValue = new Date(a.due);
          bValue = new Date(b.due);
          break;
        case "amount":
          aValue = a.originalAmount;
          bValue = b.originalAmount;
          break;
        case "item":
          aValue = a.item.toLowerCase();
          bValue = b.item.toLowerCase();
          break;
        case "seller":
          aValue = a.seller.toLowerCase();
          bValue = b.seller.toLowerCase();
          break;
        case "ceg":
          aValue = a.cegName?.toLowerCase() || "";
          bValue = b.cegName?.toLowerCase() || "";
          break;
        default:
          aValue = a.due;
          bValue = b.due;
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredPayments(filtered);
  }, [
    payments,
    searchTerm,
    statusFilter,
    categoryFilter,
    sellerFilter,
    cegFilter,
    sortBy,
    sortOrder,
  ]);

  const groupedPayments = filteredPayments.reduce((acc, payment) => {
    const seller = payment.seller;
    if (!acc[seller]) {
      acc[seller] = [];
    }
    acc[seller].push(payment);
    return acc;
  }, {});

  const handleSingleSelect = (id) => {
    setSelectedPayments((prev) =>
      prev.includes(id) ? prev.filter((_id) => _id !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedPayments.length === filteredPayments.length) {
      setSelectedPayments([]);
    } else {
      setSelectedPayments(filteredPayments.map((p) => p.id));
    }
  };

  const handleSelectSellerGroup = (seller) => {
    const sellerPayments = groupedPayments[seller].map((p) => p.id);
    const allSelected = sellerPayments.every((id) =>
      selectedPayments.includes(id)
    );

    if (allSelected) {
      setSelectedPayments((prev) =>
        prev.filter((id) => !sellerPayments.includes(id))
      );
    } else {
      setSelectedPayments((prev) => [...new Set([...prev, ...sellerPayments])]);
    }
  };

  const handlePaySelected = () => {
    if (selectedPayments.length > 0) {
      setIsModalOpen(true);
    }
  };

  const handlePaymentSubmit = () => {
    setPayments((prevPayments) =>
      prevPayments.filter((payment) => !selectedPayments.includes(payment.id))
    );
    alert(
      `Pagamento de ${selectedPayments.length} item(s) realizado com sucesso!`
    );
    setSelectedPayments([]);
    setIsModalOpen(false);
  };

  const formatDisplayDate = (dateString) => {
    const today = new Date();
    const dueDate = new Date(dateString);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Hoje";
    if (diffDays === 1) return "Amanhã";
    if (diffDays === -1) return "Ontem";
    if (diffDays < 0) return `Há ${Math.abs(diffDays)} dias`;
    if (diffDays > 0) return `Em ${diffDays} dias`;

    return dueDate.toLocaleDateString("pt-BR");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "atrasado":
        return "var(--color-late-text)";
      case "vence hoje":
        return "var(--color-due-text)";
      case "pendente":
        return "var(--color-upcoming-text)";
      default:
        return "var(--color-text-muted)";
    }
  };

  return (
    <div className="content">
      <PaymentModal
        isVisible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        payments={payments.filter((p) => selectedPayments.includes(p.id))}
        onPaymentSubmit={handlePaymentSubmit}
      />

      <div className="payment-schedule">
        <div className="payment-schedule__header">
          <div className="payment-schedule__title-group">
            <div className="payment-schedule__icon-wrapper">
              <CreditCard size={28} />
            </div>
            <div>
              <h2 className="payment-schedule__title">Pagamentos</h2>
              <p className="payment-schedule__subtitle">
                Gerencie todos os seus pagamentos pendentes em um só lugar
                {calculateTotalLateFees() > 0 && (
                  <span className="late-fees-badge">
                    • Taxas de atraso: R$ {calculateTotalLateFees().toFixed(2)}
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="payment-schedule__stats">
            <div className="stat-card">
              <div className="stat-card__header">
                <div className="stat-card__icon-wrapper">
                  <CreditCard size={24} />
                </div>
                <span
                  className={`stat-card__trend ${
                    calculateTotalLateFees() > 0 ? "late" : "neutral"
                  }`}
                >
                  {calculateTotalLateFees() > 0
                    ? `+R$ ${calculateTotalLateFees().toFixed(2)} taxas`
                    : "Em dia"}
                </span>
              </div>
              <h3 className="stat-card__value">
                {showTotalAmount
                  ? calculateTotalPayments()
                  : `${payments.length} Pagamentos`}
                <button
                  onClick={() => setShowTotalAmount(!showTotalAmount)}
                  className="stat-card__toggle-visibility"
                  title={showTotalAmount ? "Ocultar Total" : "Mostrar Total"}
                >
                  {showTotalAmount ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </h3>
              <p className="stat-card__label">Total Pendente</p>
            </div>
          </div>
        </div>

        <div className="pagamentos-actions">
          <div className="pagamentos-actions__left">
            <button
              className="btn btn-primary"
              onClick={handlePaySelected}
              disabled={selectedPayments.length === 0}
            >
              <CreditCard size={20} />
              Pagar Selecionados ({selectedPayments.length})
            </button>
          </div>

          <div className="pagamentos-actions__right">
            <div className="filters-container">
              <button
                className="btn btn-secondary"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={18} />
                Filtros
                {showFilters ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>

              {showFilters && (
                <div className="filters-dropdown">
                  <div className="filter-group">
                    <label>Status</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="todos">Todos os Status</option>
                      <option value="atrasado">Atrasados</option>
                      <option value="vence hoje">Vence Hoje</option>
                      <option value="pendente">Pendentes</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label>Categoria</label>
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                      <option value="todos">Todas as Categorias</option>
                      <option value="CEG">Compra Em Grupo</option>
                      <option value="Pessoal">Compras Pessoais</option>
                      <option value="Taxa">Taxas</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label>GOM</label>
                    <select
                      value={sellerFilter}
                      onChange={(e) => setSellerFilter(e.target.value)}
                    >
                      <option value="todos">Todos os GOMs</option>
                      {uniqueSellers.map((seller) => (
                        <option key={seller} value={seller}>
                          {seller}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="filter-group">
                    <label>CEG</label>
                    <select
                      value={cegFilter}
                      onChange={(e) => setCegFilter(e.target.value)}
                    >
                      <option value="todos">Todas as CEGs</option>
                      {uniqueCegs.map((ceg) => (
                        <option key={ceg} value={ceg}>
                          {ceg}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="filter-group">
                    <label>Ordenar por</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="due">Data de Vencimento</option>
                      <option value="amount">Valor</option>
                      <option value="item">Item</option>
                      <option value="seller">GOM</option>
                      <option value="ceg">CEG</option>
                    </select>
                  </div>

                  <button
                    className="sort-order-btn"
                    onClick={() =>
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }
                  >
                    <ArrowUpDown size={16} />
                    {sortOrder === "asc" ? "Crescente" : "Decrescente"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="pagamentos-filters">
          <div className="search-bar">
            <Search className="search-bar__icon" size={20} />
            <input
              type="text"
              placeholder="Buscar por item, GOM, CEG ou tipo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar__input"
            />
          </div>
        </div>

        <div className="payment-schedule__table-wrapper">
          <table className="payment-schedule__table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={
                      selectedPayments.length === filteredPayments.length &&
                      filteredPayments.length > 0
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Detalhes do Item</th>
                <th className="hidden-md">GOM</th>
                <th className="hidden-md">CEG</th>
                <th>Valor</th>
                <th>Vencimento</th>
                <th>Categoria</th>
                <th className="text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan="8" className="empty-state">
                    <CreditCard size={48} />
                    <h3>Nenhum pagamento encontrado</h3>
                    <p>Ajuste seus filtros ou adicione novos pagamentos</p>
                  </td>
                </tr>
              ) : (
                Object.entries(groupedPayments).map(
                  ([seller, sellerPayments]) => (
                    <React.Fragment key={seller}>
                      <tr className="payment-schedule__group-row">
                        <td>
                          <input
                            type="checkbox"
                            checked={sellerPayments.every((p) =>
                              selectedPayments.includes(p.id)
                            )}
                            onChange={() => handleSelectSellerGroup(seller)}
                          />
                        </td>
                        <td colSpan="7">
                          <div className="group-header-content payment-schedule__group-header">
                            <div className="group-header-info">
                              <Users size={16} />
                              <span className="group-seller-name">
                                {seller}
                              </span>
                              <span className="group-items-count">
                                {sellerPayments.length} item(s)
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                      {sellerPayments.map((payment) => (
                        <tr
                          key={payment.id}
                          className={`payment-schedule__row ${
                            selectedPayments.includes(payment.id)
                              ? "selected"
                              : ""
                          }`}
                        >
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedPayments.includes(payment.id)}
                              onChange={() => handleSingleSelect(payment.id)}
                            />
                          </td>
                          <td className="item-details">
                            <div className="item-wrapper">
                              <div className="item-preview">
                                <img src={payment.image} alt={payment.item} />
                              </div>
                              <div className="item-text">
                                <span className="item-name">
                                  {payment.item}
                                </span>
                                <span className="item-type">
                                  {payment.type}
                                </span>
                                <div className="item-meta">
                                  <span className="item-ceg-mobile">
                                    {payment.cegName}
                                  </span>
                                  <a
                                    href={payment.paymentForm}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="form-link"
                                  >
                                    <ExternalLink size={12} />
                                    Form {payment.paymentType}
                                  </a>
                                </div>
                                <span className="item-seller-mobile">
                                  {payment.seller}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="hidden-md">{payment.seller}</td>
                          <td className="hidden-md ceg-name">
                            {payment.cegName}
                          </td>
                          <td className="amount">{payment.amount}</td>
                          <td className="due-date">
                            {formatDisplayDate(payment.due)}
                          </td>
                          <td>
                            <span
                              className="category-badge"
                              style={{
                                backgroundColor:
                                  getStatusColor(payment.status) + "20",
                                color: getStatusColor(payment.status),
                              }}
                            >
                              {payment.category}
                            </span>
                          </td>
                          <td className="text-right">
                            <span
                              className={`status-badge status-${payment.status.replace(
                                " ",
                                "-"
                              )}`}
                            >
                              {payment.status === "atrasado" && (
                                <AlertCircle size={14} />
                              )}
                              {payment.status === "vence hoje" && (
                                <Wallet size={14} />
                              )}
                              {payment.status}
                              {payment.status === "atrasado" && (
                                <span className="late-fee">
                                  (+R$ {payment.lateFeePerCard.toFixed(2)})
                                </span>
                              )}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  )
                )
              )}
            </tbody>
          </table>
        </div>

        <div className="payment-schedule__footer">
          <div className="results-summary">
            Mostrando {filteredPayments.length} de {payments.length} pagamentos
          </div>
          <div className="pagination-controls">
            <button className="btn btn-secondary" disabled>
              Anterior
            </button>
            <span className="pagination-info">Página 1 de 1</span>
            <button className="btn btn-secondary" disabled>
              Próxima
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
