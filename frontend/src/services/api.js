// services/api.js

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Configuração base do axios com interceptors
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Interceptor para adicionar token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API específica para o Dashboard
export const dashboardAPI = {
  // Buscar dados do dashboard
  getDashboardData: async (userId) => {
    const response = await api.get(`/api/dashboard/${userId}`);
    return response.data;
  },

  // Buscar estatísticas resumidas
  getStats: async (userId) => {
    const response = await api.get(`/api/dashboard/${userId}/stats`);
    return response.data;
  },

  // Buscar atividades recentes
  getRecentActivity: async (userId, limit = 10) => {
    const response = await api.get(
      `/api/dashboard/${userId}/activity?limit=${limit}`
    );
    return response.data;
  },
};

// API para pagamentos
export const paymentsAPI = {
  // Buscar pagamentos pendentes
  getPendingPayments: async (userId) => {
    const response = await api.get(`/api/payments/pending/${userId}`);
    return response.data;
  },

  // Processar pagamentos
  processPayments: async (paymentIds) => {
    const response = await api.post("/api/payments/process", { paymentIds });
    return response.data;
  },

  // Buscar histórico de pagamentos
  getPaymentHistory: async (userId, limit = 50) => {
    const response = await api.get(
      `/api/payments/history/${userId}?limit=${limit}`
    );
    return response.data;
  },
};

// API para binders
export const bindersAPI = {
  // Buscar binders do usuário
  getUserBinders: async (userId) => {
    const response = await api.get(`/api/binders/user/${userId}`);
    return response.data;
  },

  // Buscar estatísticas de binders
  getBinderStats: async (userId) => {
    const response = await api.get(`/api/binders/stats/${userId}`);
    return response.data;
  },

  // Criar novo binder
  createBinder: async (binderData) => {
    const response = await api.post("/api/binders", binderData);
    return response.data;
  },
};

// API para collectors
export const collectorsAPI = {
  // Buscar wishlist
  getWishlist: async (userId) => {
    const response = await api.get(`/api/collectors/wishlist/${userId}`);
    return response.data;
  },

  // Buscar CEGs ativas
  getActiveCEGs: async (userId) => {
    const response = await api.get(`/api/collectors/cegs/active/${userId}`);
    return response.data;
  },

  // Buscar anúncios ativos
  getActiveAds: async (limit = 50) => {
    const response = await api.get(`/api/collectors/ads/active?limit=${limit}`);
    return response.data;
  },
};

export default api;
