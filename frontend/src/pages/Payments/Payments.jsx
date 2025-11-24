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
  RefreshCw,
} from "lucide-react";
import "./Payments.css";
import { paymentsAPI } from "../../services/api";

const MOCK_PAYMENTS = [
  {
    id: 1,
    item: "(G)I-DLE 2 Super Lady (Yuqi)",
    type: "Pgto. de CEG",
    amount: "R$45.00",
    originalAmount: 45.0,
    due: "2025-11-28",
    status: "atrasado",
    seller: "2Binz CEGs",
    cegName: "(G)I-DLE 2",
    lateFeePerCard: 1.5,
    image:
      "https://i.pinimg.com/736x/cd/e3/18/cde3183431f97924a60c64d974412284.jpg",
    paid: false,
    category: "CEG",
    priority: "high",
    paymentForm: "https://forms.gle/neverland_items",
    paymentType: "Itens",
  },
  {
    id: 2,
    item: "XG Woke Up (Jurin) POB",
    type: "Pgto. de CEG",
    amount: "R$85.00",
    originalAmount: 85.0,
    due: new Date().toISOString().split("T")[0],
    status: "vence hoje",
    seller: "Hariboz CEGs",
    cegName: "XG Woke Up",
    lateFeePerCard: 2.0,
    image:
      "https://i.pinimg.com/736x/59/f8/0d/59f80d212b56d7b7efab33118606f35d.jpg",
    paid: false,
    category: "CEG",
    priority: "high",
    paymentForm: "https://forms.gle/alphaz_items",
    paymentType: "Itens",
  },
  {
    id: 3,
    item: "XG New DNA (Harvey)",
    type: "Compra Pessoal",
    amount: "R$35.00",
    originalAmount: 35.0,
    due: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    status: "pendente",
    seller: "Vendas da Ju",
    cegName: "XG New DNA",
    lateFeePerCard: 1.0,
    image:
      "https://i.pinimg.com/736x/51/b5/29/51b5295287347a74f21484467261767f.jpg",
    paid: false,
    category: "Pessoal",
    priority: "medium",
    paymentForm: "https://forms.gle/personal_buy",
    paymentType: "Pessoal",
  },
  {
    id: 4,
    item: "(G)I-DLE I Feel (Minnie POB)",
    type: "Pgto. de CEG",
    amount: "R$55.00",
    originalAmount: 55.0,
    due: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    status: "pendente",
    seller: "2Binz CEGs",
    cegName: "(G)I-DLE I Feel",
    lateFeePerCard: 1.8,
    image:
      "https://i.pinimg.com/736x/60/25/93/60259334f7d274056933711197556100.jpg",
    paid: false,
    category: "CEG",
    priority: "medium",
    paymentForm: "https://forms.gle/neverland_pob",
    paymentType: "Itens",
  },
  {
    id: 5,
    item: "XG Shooting Star (Cocona)",
    type: "Pgto. de CEG",
    amount: "R$120.00",
    originalAmount: 120.0,
    due: "2025-11-28",
    status: "atrasado",
    seller: "Hariboz CEGs",
    cegName: "XG Shooting Star",
    lateFeePerCard: 2.5,
    image:
      "https://i.pinimg.com/736x/43/8a/56/438a56b57934733085949877c1654167.jpg",
    paid: false,
    category: "Taxa",
    priority: "low",
    paymentForm: "https://forms.gle/alphaz_ems",
    paymentType: "EMS",
  },
  {
    id: 6,
    item: "(G)I-DLE Heat (Shuhua)",
    type: "Pgto. de CEG",
    amount: "R$40.00",
    originalAmount: 40.0,
    due: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    status: "pendente",
    seller: "Shuhua Store",
    cegName: "(G)I-DLE Heat",
    lateFeePerCard: 1.2,
    image:
      "https://i.pinimg.com/736x/a9/e7/f7/a9e7f7a4530023108942258687044c82.jpg",
    paid: false,
    category: "CEG",
    priority: "low",
    paymentForm: "https://forms.gle/heat_items",
    paymentType: "Itens",
  },
  {
    id: 7,
    item: "XG AWE (Chisa)",
    type: "Compra Pessoal",
    amount: "R$60.00",
    originalAmount: 60.0,
    due: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    status: "pendente",
    seller: "Vendas da Ju",
    cegName: "XG AWE",
    lateFeePerCard: 1.0,
    image:
      "https://i.pinimg.com/736x/1a/ce/56/1ace56135e1c1d76149ab35f0bcce8c5.jpg",
    paid: false,
    category: "Pessoal",
    priority: "medium",
    paymentForm: "https://forms.gle/personal_buy",
    paymentType: "Pessoal",
  },
  {
    id: 8,
    item: "(G)I-DLE 2 (Frete Nacional)",
    type: "Pgto. de CEG",
    amount: "R$25.00",
    originalAmount: 25.0,
    due: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    status: "pendente",
    seller: "2Binz CEGs",
    cegName: "(G)I-DLE 2",
    lateFeePerCard: 0.5,
    image:
      "https://i.pinimg.com/736x/cd/e3/18/cde3183431f97924a60c64d974412284.jpg",
    paid: false,
    category: "Taxa",
    priority: "low",
    paymentForm: "https://forms.gle/neverland_frete",
    paymentType: "Frete",
  },
];

const getSellerLabel = (payment) => {
  return payment.seller || "Comunidade Desconhecida";
};

const PaymentModal = ({
  isVisible,
  onClose,
  payments,
  onPaymentSubmit,
  isGuest,
}) => {
  if (!isVisible) return null;

  const calculateLateFee = (payment) => {
    if (payment.status !== "atrasado") return 0;
    const today = new Date();
    const dueDate = new Date(payment.due);
    const diffTime = dueDate - today;
    const daysLate = Math.max(
      0,
      Math.ceil(Math.abs(diffTime) / (1000 * 60 * 60 * 24))
    );
    const dailyLateFee = payment.lateFeePerCard || 1.5;
    return daysLate * dailyLateFee;
  };

  const calculateTotalWithFees = (payment) => {
    const baseAmount = payment.originalAmount;
    const lateFee = calculateLateFee(payment);
    return baseAmount + lateFee;
  };

  const totalAmount = payments.reduce((sum, p) => {
    return sum + calculateTotalWithFees(p);
  }, 0);

  const totalLateFees = payments.reduce((sum, p) => {
    return sum + calculateLateFee(p);
  }, 0);

  const totalBaseAmount = payments.reduce((sum, p) => {
    return sum + p.originalAmount;
  }, 0);

  const groupedPayments = payments.reduce((acc, pay) => {
    const seller = getSellerLabel(pay);
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
            <div>
              <strong>Taxas de atraso aplicadas:</strong> R${" "}
              {totalLateFees.toFixed(2).replace(".", ",")}
              <br />
              <small>
                ({payments.filter((p) => p.status === "atrasado").length} itens
                com atraso)
              </small>
            </div>
          </div>
        )}

        <p className="payment-modal__subtitle">
          Você está prestes a pagar <strong>{payments.length} item(s)</strong>,
          totalizando{" "}
          <strong>R${totalAmount.toFixed(2).replace(".", ",")}</strong>.
          {totalLateFees > 0 && (
            <span className="breakdown">
              (R$ {totalBaseAmount.toFixed(2)} + R$ {totalLateFees.toFixed(2)}{" "}
              de taxas)
            </span>
          )}
        </p>

        <div className="payment-modal__groups">
          {Object.entries(groupedPayments).map(([seller, items]) => {
            const sellerLateFees = items.reduce(
              (sum, item) => sum + calculateLateFee(item),
              0
            );
            const sellerTotal = items.reduce(
              (sum, item) => sum + calculateTotalWithFees(item),
              0
            );

            return (
              <div key={seller} className="payment-modal__group-card">
                <h3 className="group-card__title">
                  Comunidade: <strong>{seller}</strong> ({items.length} itens)
                  {sellerLateFees > 0 && (
                    <span className="group-card__late-fees">
                      (+R$ {sellerLateFees.toFixed(2)} de taxas)
                    </span>
                  )}
                </h3>
                <ul className="group-card__list">
                  {items.map((item) => {
                    const itemLateFee = calculateLateFee(item);
                    const itemTotal = calculateTotalWithFees(item);

                    return (
                      <li key={item.id} className="group-card__item">
                        <div className="item-details">
                          <span className="item-name truncate">
                            {item.item}
                          </span>
                          <div className="item-meta">
                            <span
                              className={`item-status status-${item.status.replace(
                                " ",
                                "-"
                              )}`}
                            >
                              {item.status}
                              {item.status === "atrasado" &&
                                itemLateFee > 0 && (
                                  <span className="item-late-fee">
                                    ({item.daysLate || 0} dias × R${" "}
                                    {(item.lateFeePerCard || 1.5).toFixed(2)}
                                    /dia = +R$ {itemLateFee.toFixed(2)})
                                  </span>
                                )}
                            </span>
                          </div>
                        </div>
                        <div className="item-amount-container">
                          {itemLateFee > 0 ? (
                            <>
                              <span className="item-original-amount">
                                R${item.originalAmount.toFixed(2)}
                              </span>
                              <span className="item-total-amount font-bold">
                                R${itemTotal.toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <span className="item-amount font-bold">
                              R${itemTotal.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="group-card__total">
                  Total do grupo: R$ {sellerTotal.toFixed(2)}
                  {sellerLateFees > 0 && (
                    <span className="group-total-breakdown">
                      (R$ {(sellerTotal - sellerLateFees).toFixed(2)} + R${" "}
                      {sellerLateFees.toFixed(2)} taxas)
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="payment-modal__footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn-primary" onClick={onPaymentSubmit}>
            {isGuest ? "Simular Pagamento" : "Confirmar Pagamento"} Total (R${" "}
            {totalAmount.toFixed(2).replace(".", ",")})
          </button>
        </div>
      </div>
    </div>
  );
};

const Payments = ({ user }) => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [selectedPayments, setSelectedPayments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTotalAmount, setShowTotalAmount] = useState(false);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [categoryFilter, setCategoryFilter] = useState("todos");
  const [sellerFilter, setSellerFilter] = useState("todos");
  const [cegFilter, setCegFilter] = useState("todos");
  const [sortBy, setSortBy] = useState("due");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showFilters, setShowFilters] = useState(false);

  const calculateLateFee = (payment) => {
    if (payment.status !== "atrasado") return 0;
    const today = new Date();
    const dueDate = new Date(payment.due);
    const diffTime = dueDate - today;
    const daysLate = Math.max(
      0,
      Math.ceil(Math.abs(diffTime) / (1000 * 60 * 60 * 24))
    );
    const dailyLateFee = payment.lateFeePerCard || 1.5;
    return daysLate * dailyLateFee;
  };

  const calculateTotalWithFees = (payment) => {
    const baseAmount = payment.originalAmount;
    const lateFee = calculateLateFee(payment);
    return baseAmount + lateFee;
  };

  const fetchPaymentsData = async () => {
    setLoading(true);
    try {
      if (!user || user.isGuest) {
        setTimeout(() => {
          const updatedMockPayments = MOCK_PAYMENTS.map((payment) => {
            if (payment.status === "atrasado") {
              const today = new Date();
              const dueDate = new Date(payment.due);
              const diffTime = dueDate - today;
              const daysLate = Math.max(
                0,
                Math.ceil(Math.abs(diffTime) / (1000 * 60 * 60 * 24))
              );

              return {
                ...payment,
                daysLate: daysLate,
                totalWithFees: calculateTotalWithFees(payment),
              };
            }
            return payment;
          });

          setPayments(updatedMockPayments);
          setLoading(false);
        }, 500);
      } else {
        try {
          const data = await paymentsAPI.getPayments(user.id);

          if (!Array.isArray(data)) {
            setPayments([]);
            return;
          }

          const normalizedData = data.map((p) => {
            const basePayment = {
              id: p.id,
              item:
                p.item_name ||
                p.photocard_name ||
                p.description ||
                "Item sem nome",
              type: p.payment_type || "Pagamento",
              amount: `R$${Number(p.amount || 0)
                .toFixed(2)
                .replace(".", ",")}`,
              originalAmount: Number(p.amount || 0),
              due: p.due_date
                ? new Date(p.due_date).toISOString().split("T")[0]
                : new Date().toISOString().split("T")[0],
              status: p.status || "Pendente",
              seller: p.seller_username || "Comunidade",
              cegName: p.ceg_name || "",
              lateFeePerCard: Number(p.late_fee || 1.5),
              image:
                p.photocard_image ||
                "https://placehold.co/55x85/e2e8f0/475569?text=PC",
              paid: p.status === "Pago",
              category: p.category || (p.ceg_name ? "CEG" : "Pessoal"),
              priority: "medium",
              paymentForm: p.payment_link || "#",
              paymentType: p.payment_term || "Geral",
            };

            if (basePayment.status === "atrasado") {
              const today = new Date();
              const dueDate = new Date(basePayment.due);
              const diffTime = dueDate - today;
              const daysLate = Math.max(
                0,
                Math.ceil(Math.abs(diffTime) / (1000 * 60 * 60 * 24))
              );

              return {
                ...basePayment,
                daysLate: daysLate,
                totalWithFees: calculateTotalWithFees(basePayment),
              };
            }

            return basePayment;
          });

          setPayments(normalizedData);
        } catch (error) {
          console.error("Erro ao carregar pagamentos:", error);
          setPayments([]);
        } finally {
          setLoading(false);
        }
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentsData();
  }, [user]);

  const uniqueSellers = [
    ...new Set(payments.map((p) => getSellerLabel(p))),
  ].sort();
  const uniqueCategories = [...new Set(payments.map((p) => p.category))].sort();
  const uniqueCegs = [
    ...new Set(payments.map((p) => p.cegName).filter(Boolean)),
  ].sort();

  const calculateTotalPayments = () => {
    const pendingOnly = payments.filter((p) => p.status !== "Pago");
    const total = pendingOnly.reduce((sum, payment) => {
      return sum + calculateTotalWithFees(payment);
    }, 0);
    return `R$${total.toFixed(2).replace(".", ",")}`;
  };

  const calculateTotalLateFees = () => {
    return payments.reduce((sum, payment) => {
      return sum + calculateLateFee(payment);
    }, 0);
  };

  useEffect(() => {
    let filtered = [...payments];

    if (searchTerm) {
      filtered = filtered.filter(
        (payment) =>
          payment.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
          getSellerLabel(payment)
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          payment.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.cegName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "todos") {
      filtered = filtered.filter(
        (payment) => payment.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (categoryFilter !== "todos") {
      filtered = filtered.filter(
        (payment) => payment.category === categoryFilter
      );
    }

    if (sellerFilter !== "todos") {
      filtered = filtered.filter(
        (payment) => getSellerLabel(payment) === sellerFilter
      );
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
          aValue = getSellerLabel(a).toLowerCase();
          bValue = getSellerLabel(b).toLowerCase();
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
    const seller = getSellerLabel(payment);
    if (!acc[seller]) {
      acc[seller] = [];
    }
    acc[seller].push(payment);
    return acc;
  }, {});

  const handleSingleSelect = (id) => {
    const payment = payments.find((p) => p.id === id);
    if (payment && payment.status === "Pago") return;

    setSelectedPayments((prev) =>
      prev.includes(id) ? prev.filter((_id) => _id !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const payablePayments = filteredPayments.filter((p) => p.status !== "Pago");

    if (selectedPayments.length === payablePayments.length) {
      setSelectedPayments([]);
    } else {
      setSelectedPayments(payablePayments.map((p) => p.id));
    }
  };

  const handleSelectSellerGroup = (seller) => {
    const sellerPayments = groupedPayments[seller]
      .filter((p) => p.status !== "Pago")
      .map((p) => p.id);

    if (sellerPayments.length === 0) return;

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

  const handlePaymentSubmit = async () => {
    if (!user || user.isGuest) {
      alert("Modo Visitante: Pagamento simulado com sucesso!");
      setPayments((prevPayments) =>
        prevPayments.filter((payment) => !selectedPayments.includes(payment.id))
      );
    } else {
      try {
        await paymentsAPI.processPayments(selectedPayments, "PIX");
        alert(
          `Pagamento de ${selectedPayments.length} item(s) realizado com sucesso!`
        );
        fetchPaymentsData();
      } catch (error) {
        console.error(error);
        alert("Erro ao processar o pagamento. Tente novamente.");
      }
    }

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
    const s = status.toLowerCase();
    if (s === "atrasado") return "var(--color-late-text)";
    if (s === "vence hoje") return "var(--color-due-text)";
    if (s === "pendente") return "var(--color-upcoming-text)";
    if (s === "pago") return "#10b981";
    return "var(--color-text-muted)";
  };

  if (loading) {
    return (
      <div className="content">
        <div
          className="loading-dashboard"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "50vh",
          }}
        >
          <RefreshCw
            className="spinning"
            size={32}
            style={{ marginBottom: "10px", color: "var(--theme-primary)" }}
          />
          <p>Carregando pagamentos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content">
      <PaymentModal
        isVisible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        payments={payments.filter((p) => selectedPayments.includes(p.id))}
        onPaymentSubmit={handlePaymentSubmit}
        isGuest={!user || user.isGuest}
      />

      <div className="payment-schedule">
        <div className="payment-schedule__header">
          <div className="payment-schedule__title-group">
            <div className="payment-schedule__icon-wrapper">
              <CreditCard size={28} />
            </div>
            <div>
              <h2 className="payment-schedule__title">
                Pagamentos {(!user || user.isGuest) && "(Visitante)"}
              </h2>
              <p className="payment-schedule__subtitle">
                Gerencie todos os seus pagamentos pendentes e histórico
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
                  : `${
                      payments.filter((p) => p.status !== "Pago").length
                    } Pendentes`}
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
                      <option value="pendente">Pendentes</option>
                      <option value="atrasado">Atrasados</option>
                      <option value="vence hoje">Vence Hoje</option>
                      <option value="pago">Pagos</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label>Categoria</label>
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                      <option value="todos">Todas as Categorias</option>
                      {uniqueCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
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
                      selectedPayments.length > 0 &&
                      selectedPayments.length ===
                        filteredPayments.filter((p) => p.status !== "Pago")
                          .length
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
                          {sellerPayments.some((p) => p.status !== "Pago") && (
                            <input
                              type="checkbox"
                              checked={sellerPayments
                                .filter((p) => p.status !== "Pago")
                                .every((p) => selectedPayments.includes(p.id))}
                              onChange={() => handleSelectSellerGroup(seller)}
                            />
                          )}
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
                          } ${payment.status === "Pago" ? "paid-row" : ""}`}
                          style={
                            payment.status === "Pago" ? { opacity: 0.6 } : {}
                          }
                        >
                          <td>
                            {payment.status !== "Pago" && (
                              <input
                                type="checkbox"
                                checked={selectedPayments.includes(payment.id)}
                                onChange={() => handleSingleSelect(payment.id)}
                              />
                            )}
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
                                  {getSellerLabel(payment)}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="hidden-md">
                            {getSellerLabel(payment)}
                          </td>
                          <td className="hidden-md ceg-name">
                            {payment.cegName}
                          </td>
                          <td className="amount">
                            {payment.status === "atrasado" ? (
                              <div className="amount-with-fee">
                                <span className="original-amount">
                                  R${payment.originalAmount.toFixed(2)}
                                </span>
                                <span className="total-amount">
                                  R${calculateTotalWithFees(payment).toFixed(2)}
                                </span>
                              </div>
                            ) : (
                              `R$${payment.originalAmount.toFixed(2)}`
                            )}
                          </td>
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
                              className={`status-badge status-${payment.status
                                .toLowerCase()
                                .replace(" ", "-")}`}
                              style={{
                                backgroundColor:
                                  getStatusColor(payment.status) + "20",
                                color: getStatusColor(payment.status),
                              }}
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
                                  (+R$ {calculateLateFee(payment).toFixed(2)})
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
