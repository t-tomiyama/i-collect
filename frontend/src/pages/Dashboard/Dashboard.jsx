import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Heart,
  BookOpen,
  BookHeart,
  Package,
  CreditCard,
  CalendarClock,
  AlertCircle,
  Wallet,
  Eye,
  EyeOff,
  Search,
  Hammer,
  Plus,
  ShoppingCart,
  RefreshCw,
} from "lucide-react";
import "../../App.css";
import "./Dashboard.css";
import { Sidebar, NAV_ITEMS } from "../../components/Sidebar";
import { Header } from "../../components/Header";
import { SearchPage } from "../SearchPage/SearchPage";
import { BinderPage } from "../BinderPage/BinderPage";
import Payments from "../Payments/Payments";
import DetailsModal from "../../components/DetailsModal";
import { RatingSection } from "../../components/RatingSection";
import "../SearchPage/SearchPage.css";
import Footer from "../../components/Footer";

import {
  dashboardAPI,
  paymentsAPI,
  searchAPI,
  ratingsAPI,
} from "../../services/api";

// MOCK: Atualizado payment_type para parecer com PaymentTerms
const MOCK_GUEST_DATA = {
  stats: {
    totalPhotocards: 127,
    activeCEGs: 3,
    wishlistCount: 12,
    photocardsThisWeek: 4,
    cegsArriving: 1,
    recentWishlistAdds: 2,
  },
  pendingPayments: [
    {
      id: "guest-1",
      photocard_name: "Hinata - Woke Up (Apple Music POB)",
      photocard_image:
        "https://i.pinimg.com/736x/59/f8/0d/59f80d212b56d7b7efab33118606f35d.jpg",
      amount: 45.0,
      seller_name: "lovejurin",
      due_date: new Date().toISOString(),
      status: "vence hoje",
      payment_type: "1º Pagamento (Item)",
      ceg_name: "CEG XG",
      late_fee: 0,
    },
    {
      id: "guest-2",
      photocard_name: "Chisa - AWE POB",
      photocard_image:
        "https://i.pinimg.com/736x/1a/ce/56/1ace56135e1c1d76149ab35f0bcce8c5.jpg",
      amount: 120.0,
      seller_name: "lovejurin",
      due_date: new Date(Date.now() + 86400000 * 2).toISOString(),
      status: "pendente",
      payment_type: "Item + Frete Int.",
      ceg_name: "CEG XG Mascara",
      late_fee: 0,
    },
    {
      id: "guest-3",
      photocard_name: "Maya - AWE",
      photocard_image:
        "https://i.pinimg.com/736x/9a/45/f4/9a45f486eca3c11f9a2fe4a40fd85690.jpg",
      amount: 55.5,
      seller_name: "alphaztore",
      due_date: new Date(Date.now() - 86400000).toISOString(),
      status: "atrasado",
      payment_type: "Frete Nacional",
      ceg_name: "Envios da Maya",
      late_fee: 2.5,
    },
  ],
};

const THEMES = {
  red: { name: "Vermelho" },
  pink: { name: "Rosa" },
  lightpink: { name: "Rosa Claro" },
  peach: { name: "Pêssego" },
  orange: { name: "Laranja" },
  mint: { name: "Menta" },
  teal: { name: "Verde-Água" },
  sky: { name: "Céu" },
  blue: { name: "Azul" },
  lavender: { name: "Lavanda" },
  violet: { name: "Violeta" },
  gray: { name: "Cinza" },
};

const PaymentModal = ({ isVisible, onClose, payments, onPaymentSubmit }) => {
  const [selectedMethod, setSelectedMethod] = useState("PIX");

  if (!isVisible) return null;

  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalLateFees = payments.reduce(
    (sum, p) => (p.status === "atrasado" ? sum + (p.late_fee || 0) : sum),
    0
  );

  const groupedPayments = payments.reduce((acc, pay) => {
    const seller = pay.seller_name || pay.seller_username;
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
            <CreditCard size={26} />
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
                item.status === "atrasado" ? sum + (item.late_fee || 0) : sum,
              0
            );

            return (
              <div key={seller} className="payment-modal__group-card">
                <h3 className="group-card__title">
                  GOM: <strong>{seller}</strong> ({items.length} itens)
                  {sellerLateFees > 0 && (
                    <span className="late-fee-badge">
                      (+R$ {sellerLateFees.toFixed(2)} de taxas)
                    </span>
                  )}
                </h3>
                <ul className="group-card__list">
                  {items.map((item) => (
                    <li key={item.id} className="group-card__item">
                      <div className="item-details">
                        {/* Exibe o payment_type (Termo) e o nome do item */}
                        <span className="item-name truncate">
                          <strong>{item.payment_type}</strong> -{" "}
                          {item.photocard_name || item.item_name}
                        </span>
                        <span className={`item-status status-${item.status}`}>
                          {item.status}
                          {item.status === "atrasado" && item.late_fee > 0 && (
                            <span className="late-fee-small">
                              (+R$ {item.late_fee.toFixed(2)})
                            </span>
                          )}
                        </span>
                      </div>
                      <span className="item-amount font-bold">
                        R$ {item.amount.toFixed(2).replace(".", ",")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* --- SELETOR DE MÉTODO DE PAGAMENTO --- */}
        <div
          className="payment-method-selector"
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
          <label
            htmlFor="method-select"
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "0.9rem",
              color: "var(--text-secondary)",
            }}
          >
            Selecione a forma de pagamento:
          </label>
          <select
            id="method-select"
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
            className="input-field" // Reutiliza estilo do CSS global se houver
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "var(--border-radius)",
              border: "1px solid var(--border-color)",
              backgroundColor: "var(--bg-secondary)",
              color: "var(--text-primary)",
              fontSize: "1rem",
            }}
          >
            <option value="PIX">PIX (Instantâneo)</option>
            <option value="PicPay">PicPay</option>
            <option value="Cartao de Credito">Cartão de Crédito</option>
          </select>
        </div>

        <div className="payment-modal__footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="btn btn-primary"
            onClick={() => onPaymentSubmit(selectedMethod)}
          >
            Pagar com {selectedMethod} (R${" "}
            {totalAmount.toFixed(2).replace(".", ",")})
          </button>
        </div>
      </div>
    </div>
  );
};

const DashboardHome = ({
  user,
  showTotalAmount,
  setShowTotalAmount,
  setActiveNav,
  dashboardData,
  ratings,
  loading,
  onRefreshData,
}) => {
  const navigate = useNavigate();
  const [selectedPayments, setSelectedPayments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedItemDetails, setSelectedItemDetails] = useState(null);
  const [detailsType, setDetailsType] = useState("photocards");
  const [loadingDetails, setLoadingDetails] = useState(false);

  const { stats = {}, pendingPayments = [] } = dashboardData;

  const handleOpenItemDetails = async (type, id) => {
    if (user?.isGuest || String(id).startsWith("guest")) {
      alert("Detalhes indisponíveis no modo visitante.");
      return;
    }

    setDetailsType(type);
    setDetailsModalOpen(true);
    setLoadingDetails(true);

    try {
      const data = await searchAPI.getDetails(type, id);
      setSelectedItemDetails(data);
    } catch (error) {
      console.error("Erro ao buscar detalhes:", error);
      setSelectedItemDetails(null);
    } finally {
      setLoadingDetails(false);
    }
  };

  const isSellerSelected = (seller) => {
    const paymentsOfSeller = pendingPayments
      .filter((p) => (p.seller_name || p.seller_username) === seller)
      .map((p) => p.id);
    return paymentsOfSeller.every((id) => selectedPayments.includes(id));
  };

  const handleSingleSelect = (id) => {
    setSelectedPayments((prev) =>
      prev.includes(id) ? prev.filter((_id) => _id !== id) : [...prev, id]
    );
  };

  const handleSelectSeller = (seller) => {
    const paymentsOfSeller = pendingPayments
      .filter((p) => (p.seller_name || p.seller_username) === seller)
      .map((p) => p.id);
    const isAllSelected = isSellerSelected(seller);

    if (isAllSelected) {
      setSelectedPayments((prev) =>
        prev.filter((id) => !paymentsOfSeller.includes(id))
      );
    } else {
      setSelectedPayments((prev) => [
        ...prev.filter((id) => !paymentsOfSeller.includes(id)),
        ...paymentsOfSeller,
      ]);
    }
  };

  const handlePaySelected = async () => {
    if (selectedPayments.length === 0) return;
    setIsModalOpen(true);
  };

  const handlePaymentSubmit = async (method) => {
    if (selectedPayments.length === 0) return;

    if (user?.isGuest) {
      alert(
        "Modo Visitante: O pagamento não pode ser processado, pois é apenas uma simulação."
      );
      setIsModalOpen(false);
      return;
    }

    try {
      setProcessingPayment(true);
      // Passa o método escolhido para a API
      await paymentsAPI.processPayments(selectedPayments, method);

      alert(
        `Pagamento de ${selectedPayments.length} item(s) realizado com sucesso via ${method}!`
      );
      setSelectedPayments([]);
      setIsModalOpen(false);
      onRefreshData();
    } catch (error) {
      console.error("Erro ao processar pagamentos:", error);
      alert("Erro ao processar pagamentos. Tente novamente.");
    } finally {
      setProcessingPayment(false);
    }
  };

  const calculateTotalPayments = () => {
    const total = pendingPayments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );
    return `R$${total.toFixed(2).replace(".", ",")}`;
  };

  const calculateTotalLateFees = () => {
    return pendingPayments.reduce(
      (sum, payment) =>
        payment.status === "atrasado" ? sum + (payment.late_fee || 0) : sum,
      0
    );
  };

  const paymentsToPay = pendingPayments.filter((p) =>
    selectedPayments.includes(p.id)
  );

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

  const getStatusIcon = (status) => {
    switch (status) {
      case "atrasado":
        return <AlertCircle size={14} />;
      case "vence hoje":
        return <Wallet size={14} />;
      case "pendente":
        return <CalendarClock size={14} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "atrasado":
        return "status-late";
      case "vence hoje":
        return "status-due-today";
      case "pendente":
        return "status-pending";
      default:
        return "status-pending";
    }
  };

  const groupedPaymentsBySeller = pendingPayments.reduce((acc, pay) => {
    const seller = pay.seller_name || pay.seller_username;
    if (!acc[seller]) {
      acc[seller] = [];
    }
    acc[seller].push(pay);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="content">
        <div className="loading-dashboard">
          <div className="loading-spinner"></div>
          <p>Carregando seus dados...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData || Object.keys(dashboardData).length === 0) {
    return (
      <div className="content">
        <div className="empty-state">
          <div className="empty-state__icon">
            <AlertCircle size={48} />
          </div>
          <h3>Não foi possível carregar os dados</h3>
          <p>Erro ao carregar o dashboard. Tente novamente.</p>
          <button className="btn btn-primary" onClick={onRefreshData}>
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <PaymentModal
        isVisible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        payments={paymentsToPay}
        onPaymentSubmit={handlePaymentSubmit}
      />

      <DetailsModal
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        type={detailsType}
        data={selectedItemDetails}
        loading={loadingDetails}
        onRelatedClick={handleOpenItemDetails}
      />

      <div className="content">
        <div className="dashboard-header">
          <div className="welcome-banner">
            <div className="welcome-banner__content">
              <h2 className="welcome-banner__title">
                {!user || user.isGuest
                  ? "Bem-vindo(a), Visitante!"
                  : `Bem-vindo(a), ${
                      user?.user_name || user?.name || "Colecionador"
                    }!`}
              </h2>

              {user && !user.isGuest ? (
                <p className="welcome-banner__subtitle">
                  {stats.photocardsThisWeek > 0 ? (
                    <>
                      Sua coleção cresceu em
                      <span className="welcome-banner__highlight">
                        {" "}
                        {stats.photocardsThisWeek} photocards{" "}
                      </span>
                      esta semana.
                    </>
                  ) : (
                    <>
                      Sua coleção tem
                      <span className="welcome-banner__highlight">
                        {" "}
                        {stats.totalPhotocards || 0} photocards{" "}
                      </span>
                      organizados.
                    </>
                  )}
                </p>
              ) : (
                <p className="welcome-banner__subtitle">
                  Você está no <strong>Modo Visitante</strong>. Dados de análise
                  e pagamentos mostrados abaixo são apenas para demonstração,
                  tops 5 são dados reais. Acesse o <strong>Catálogo</strong>{" "}
                  para acessar os dados no nosso sistema.
                </p>
              )}

              <div className="welcome-banner__actions">
                {user && !user.isGuest ? (
                  <>
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate("/searchpage")}
                      disabled
                    >
                      <Plus size={18} />
                      Adicionar Photocard
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => setActiveNav("my-binders")}
                      disabled
                    >
                      <BookOpen size={18} />
                      Adicionar Binder
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => navigate("/searchpage?type=purchase")}
                      disabled
                    >
                      <ShoppingCart size={18} />
                      Adicionar Compra
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={onRefreshData}
                      disabled={loading}
                    >
                      <RefreshCw
                        size={18}
                        className={loading ? "spinning" : ""}
                      />
                      Atualizar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate("/register")}
                    >
                      Criar Conta
                    </button>

                    <button
                      className="btn btn-secondary"
                      onClick={() => navigate("/login")}
                    >
                      Fazer Login
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {user && (
          <div className="stat-grid">
            {[
              {
                label: "Pagamentos Pendentes",
                value: showTotalAmount
                  ? calculateTotalPayments()
                  : `${pendingPayments.length} Pagamentos`,
                icon: CreditCard,
                trend:
                  calculateTotalLateFees() > 0
                    ? `+R$ ${calculateTotalLateFees().toFixed(2)} taxas`
                    : `${
                        pendingPayments.filter((p) => p.status === "atrasado")
                          .length
                      } atrasados`,
                trendType: calculateTotalLateFees() > 0 ? "late" : "neutral",
                isPaymentStat: true,
              },
              {
                label: "Wishlist",
                value: stats.wishlistCount?.toString() || "0",
                icon: Heart,
                trend: stats.recentWishlistAdds
                  ? `+${stats.recentWishlistAdds}`
                  : "+0",
                trendType: "positive",
              },
            ].map((stat, i) => (
              <div key={i} className="stat-card">
                <div className="stat-card__header">
                  <div className="stat-card__icon-wrapper">
                    <stat.icon size={26} className="stat-card__icon" />
                  </div>
                  <span className={`stat-card__trend ${stat.trendType}`}>
                    {stat.trend}
                  </span>
                </div>
                <h3 className="stat-card__value">
                  {stat.value}
                  {stat.isPaymentStat && (
                    <button
                      onClick={() => setShowTotalAmount(!showTotalAmount)}
                      className="stat-card__toggle-visibility"
                      title={
                        showTotalAmount ? "Ocultar Total" : "Mostrar Total"
                      }
                    >
                      {showTotalAmount ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  )}
                </h3>
                <p className="stat-card__label">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        <RatingSection
          topGoms={ratings?.topGoms}
          topCollectors={ratings?.topCollectors}
          loading={loading}
        />

        {user && pendingPayments.length > 0 && (
          <div className="payment-schedule">
            <div className="payment-schedule__header">
              <div className="payment-schedule__title-group">
                <div className="payment-schedule__icon-wrapper">
                  <CalendarClock size={28} />
                </div>
                <div>
                  <h2 className="payment-schedule__title">
                    Pagamentos Pendentes {user.isGuest && "(Simulação)"}
                  </h2>
                  <p className="payment-schedule__subtitle">
                    Acompanhe seus pagamentos de CEGs e compras
                    {calculateTotalLateFees() > 0 && (
                      <span className="late-fee-indicator">
                        • Taxas de atraso: R${" "}
                        {calculateTotalLateFees().toFixed(2)}
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <div className="payment-schedule__actions">
                <button
                  className="btn btn-primary btn-pay-selected"
                  onClick={handlePaySelected}
                  disabled={selectedPayments.length === 0 || processingPayment}
                >
                  <CreditCard size={20} />
                  {processingPayment
                    ? "Processando..."
                    : `Pagar ${selectedPayments.length || ""} Item(s)`}
                </button>
              </div>
            </div>

            <div className="payment-schedule__table-wrapper">
              <table className="payment-schedule__table">
                <thead>
                  <tr>
                    <th>Sel.</th>
                    <th>Detalhes do Item</th>
                    <th className="hidden-md">CEG</th>
                    <th className="hidden-md">GOM/Seller</th>
                    <th>Valor</th>
                    <th>Vencimento</th>
                    <th className="text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(groupedPaymentsBySeller).map(
                    ([seller, payments]) => (
                      <React.Fragment key={seller}>
                        <tr className="payment-schedule__group-row">
                          <td colSpan="7" style={{ padding: 0 }}>
                            <div
                              className="payment-schedule__group-header"
                              onClick={() => handleSelectSeller(seller)}
                            >
                              <input
                                type="checkbox"
                                checked={isSellerSelected(seller)}
                                readOnly
                                className="group-checkbox"
                              />
                              <span>
                                <strong>GOM: {seller}</strong> (
                                {payments.length} itens)
                                <span className="seller-late-fee">
                                  Taxa de atraso: R${" "}
                                  {payments[0]?.late_fee?.toFixed(2) || "0.00"}{" "}
                                  por item
                                </span>
                              </span>
                            </div>
                          </td>
                        </tr>
                        {payments.map((pay) => (
                          <tr
                            key={pay.id}
                            className={`payment-schedule__row ${
                              selectedPayments.includes(pay.id)
                                ? "selected-row"
                                : ""
                            }`}
                          >
                            <td>
                              <input
                                type="checkbox"
                                checked={selectedPayments.includes(pay.id)}
                                onChange={() => handleSingleSelect(pay.id)}
                                disabled={processingPayment}
                                style={{
                                  accentColor: "var(--theme-primary)",
                                }}
                              />
                            </td>
                            <td className="payment-schedule__cell-item">
                              <div
                                className="payment-schedule__item-wrapper clickable-item"
                                onClick={() =>
                                  handleOpenItemDetails(
                                    "photocards",
                                    pay.photocard_id || pay.photocard
                                  )
                                }
                                title="Clique para ver detalhes"
                              >
                                <div className="payment-schedule__preview">
                                  {pay.photocard_image ? (
                                    <img
                                      src={pay.photocard_image}
                                      alt={pay.photocard_name}
                                    />
                                  ) : (
                                    <div className="image-placeholder">
                                      {pay.photocard_name?.charAt(0) || "PC"}
                                    </div>
                                  )}
                                </div>
                                <div className="payment-schedule__text-content">
                                  {/* AJUSTE: Usando payment_type (Termo) e nome do card */}
                                  <span className="payment-schedule__item-name">
                                    {pay.photocard_name || pay.item_name}
                                  </span>
                                  <span
                                    className="payment-schedule__item-type"
                                    style={{
                                      color: "var(--theme-primary)",
                                      fontWeight: "500",
                                    }}
                                  >
                                    {pay.payment_type}{" "}
                                    {/* Ex: "1º Pagamento", "Frete" */}
                                  </span>
                                  <span className="payment-schedule__item-seller-mobile">
                                    {pay.seller_name || pay.seller_username}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="hidden-md">
                              <span className="ceg-name">
                                {pay.ceg_name || "-"}
                              </span>
                            </td>
                            <td className="hidden-md">
                              {pay.seller_name || pay.seller_username}
                            </td>
                            <td className="font-bold">
                              R$ {pay.amount.toFixed(2).replace(".", ",")}
                            </td>
                            <td className="font-medium">
                              {formatDisplayDate(pay.due_date)}
                            </td>
                            <td className="text-right">
                              <span
                                className={`status-badge ${getStatusColor(
                                  pay.status
                                )}`}
                              >
                                {getStatusIcon(pay.status)}
                                {pay.status}
                                {pay.status === "atrasado" &&
                                  pay.late_fee > 0 && (
                                    <span className="late-fee-badge-small">
                                      (+R$ {pay.late_fee.toFixed(2)})
                                    </span>
                                  )}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    )
                  )}
                </tbody>
              </table>
            </div>

            <div className="payment-schedule__footer">
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/payments")}
              >
                Ver Todos os Pagamentos
              </button>
            </div>
          </div>
        )}

        {user && pendingPayments.length === 0 && (
          <div className="empty-state">
            <div className="empty-state__icon">
              <CreditCard size={48} />
            </div>
            <h3>Nenhum pagamento pendente</h3>
            <p>Todos os seus pagamentos estão em dia! 🎉</p>
          </div>
        )}
      </div>
    </>
  );
};

const getInitialDarkMode = () => {
  const storedMode = localStorage.getItem("i-collect-mode");
  if (storedMode) {
    return storedMode === "dark";
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches;
};

const getInitialTheme = () => {
  const storedTheme = localStorage.getItem("i-collect-theme");
  if (storedTheme && Object.keys(THEMES).includes(storedTheme)) {
    return storedTheme;
  }
  return "pink";
};

function Dashboard({ onLogout, user }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [darkMode, setDarkMode] = useState(getInitialDarkMode);
  const [currentTheme, setCurrentTheme] = useState(getInitialTheme);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dashboardData, setDashboardData] = useState({});
  const [ratings, setRatings] = useState({ topGoms: [], topCollectors: [] });
  const [loading, setLoading] = useState(true);
  const [showTotalAmount, setShowTotalAmount] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState([
    "collection",
    "my-binders",
    "purchases",
    "sales",
  ]);

  const loadDashboardData = async () => {
    setLoading(true);

    try {
      const [rankData] = await Promise.all([
        ratingsAPI.getTopRatings().catch((error) => {
          console.error("Erro ao buscar rankings:", error);
          return { topGoms: [], topCollectors: [] };
        }),
      ]);

      setRatings(rankData);

      if (!user || user.isGuest || user.id === "guest") {
        console.log("Usando dados mock para guest");
        setDashboardData(MOCK_GUEST_DATA);
      } else {
        console.log("Buscando dados reais para user:", user.id);
        try {
          const dashData = await dashboardAPI.getDashboardData(user.id);
          console.log("Dados do dashboard recebidos:", dashData);
          setDashboardData(dashData);
        } catch (error) {
          console.error("Erro detalhado ao carregar dashboard:", error);
          setDashboardData({
            stats: {
              totalPhotocards: 0,
              activeCEGs: 0,
              wishlistCount: 0,
              photocardsThisWeek: 0,
              cegsArriving: 0,
              recentWishlistAdds: 0,
            },
            pendingPayments: [],
            recentActivity: [],
          });
        }
      }
    } catch (error) {
      console.error("Erro geral no loadDashboardData:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  const getActiveNavFromPath = () => {
    const path = location.pathname;
    if (path === "/" || path === "/dashboard") return "home";
    if (path === "/searchpage") return "search";

    if (path === "/binders") return "col-binders-list";
    if (path === "/binders" || path.startsWith("/binders/"))
      return "my-binders";
    if (path === "/payments") return "payments";

    if (path.startsWith("/section/")) {
      return path.replace("/section/", "");
    }

    return "home";
  };

  const activeNav = getActiveNavFromPath();

  useEffect(() => {
    const dashboardElement = document.getElementById("i-collect-dashboard");
    if (dashboardElement) {
      if (darkMode) {
        dashboardElement.classList.add("dark");
        localStorage.setItem("i-collect-mode", "dark");
      } else {
        dashboardElement.classList.remove("dark");
        localStorage.setItem("i-collect-mode", "light");
      }
    }
  }, [darkMode]);

  useEffect(() => {
    const dashboardElement = document.getElementById("i-collect-dashboard");
    if (dashboardElement) {
      Object.keys(THEMES).forEach((themeKey) => {
        dashboardElement.classList.remove(`theme-${themeKey}`);
      });
      dashboardElement.classList.add(`theme-${currentTheme}`);
      localStorage.setItem("i-collect-theme", currentTheme);
    }
  }, [currentTheme]);

  const toggleCategory = (catId) => {
    if (!sidebarOpen) setSidebarOpen(true);
    setExpandedCategories((prev) =>
      prev.includes(catId)
        ? prev.filter((id) => id !== catId)
        : [...prev, catId]
    );
  };

  const handleNavClick = (itemId) => {
    if (window.innerWidth < 768) setSidebarOpen(false);

    switch (itemId) {
      case "search":
        navigate("/searchpage");
        break;
      case "col-binders-list":
      case "my-binders":
        navigate("/binders");
        break;
      case "payments":
        navigate("/payments");
        break;
      case "home":
        navigate("/dashboard");
        break;
      default:
        if (itemId.startsWith("binder-")) {
          navigate(`/binders/${itemId}`);
        } else {
          navigate(`/section/${itemId}`);
        }
    }
  };

  const handleGlobalSearch = (query) => {
    navigate(`/searchpage?q=${query}`);
  };

  const getCurrentPageInfo = () => {
    const findItemRecursive = (items, id) => {
      for (const item of items) {
        if (item.id === id) return item;
        if (item.items) {
          const found = findItemRecursive(item.items, id);
          if (found) return found;
        }
      }
      return null;
    };

    const currentItem = findItemRecursive(NAV_ITEMS, activeNav);
    if (activeNav === "search")
      return { icon: Search, label: "Pesquisar Catálogo" };
    if (activeNav === "my-binders")
      return { icon: BookOpen, label: "Meus Binders" };
    if (activeNav === "payments")
      return { icon: CreditCard, label: "Pagamentos" };

    return {
      icon: currentItem?.icon || BookHeart,
      label: currentItem?.label || "Página",
    };
  };

  const renderContent = () => {
    const path = location.pathname;

    switch (activeNav) {
      case "search":
        if (path === "/searchpage" || path.includes("searchpage")) {
          return <SearchPage />;
        }
      case "artists":
        return <SearchPage initialSection="artists" />;

      case "releases":
        return <SearchPage initialSection="releases" />;

      case "pcs":
        return <SearchPage initialSection="pcs" />;
    }

    if (path === "/binders" || path.startsWith("/binders/")) {
      return <BinderPage user={user} />;
    }

    if (path === "/payments") {
      return <Payments user={user} />;
    }

    if (path === "/dashboard" || path === "/") {
      return (
        <DashboardHome
          user={user}
          showTotalAmount={showTotalAmount}
          setShowTotalAmount={setShowTotalAmount}
          setActiveNav={handleNavClick}
          dashboardData={dashboardData}
          ratings={ratings}
          loading={loading}
          onRefreshData={loadDashboardData}
        />
      );
    }

    const currentPage = getCurrentPageInfo();
    return (
      <div className="placeholder-content">
        <div className="placeholder-content__icon-wrapper">
          <currentPage.icon
            size={64}
            className="placeholder-content__icon"
            strokeWidth={1.5}
          />
        </div>
        <h2 className="placeholder-content__title">{currentPage.label}</h2>
        <div className="construction-notice">
          <Hammer size={18} />
          <span>Página em Construção</span>
        </div>
        <p className="placeholder-content__subtitle">Em breve!</p>
      </div>
    );
  };

  return (
    <div id="i-collect-dashboard" className="i-collect-app">
      <Header
        user={user}
        onLogout={onLogout}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
        THEMES={THEMES}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onSearchSubmit={handleGlobalSearch}
      />

      <div className="main-layout">
        <Sidebar
          user={user}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeNav={activeNav}
          handleNavClick={handleNavClick}
          expandedCategories={expandedCategories}
          toggleCategory={toggleCategory}
          onLogout={onLogout}
        />

        {sidebarOpen && (
          <div
            className="mobile-overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="main-content">
          <div className="main-content__inner">{renderContent()}</div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
