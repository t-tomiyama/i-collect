import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "https://i-collect-backend.onrender.com";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

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

export const authAPI = {
  login: async (credentials) => {
    const response = await api.post("/api/auth/login", credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post("/api/auth/register", userData);
    return response.data;
  },

  getSocialMedias: async () => {
    const response = await api.get("/api/auth/social-medias");
    return response.data;
  },
};

export const dashboardAPI = {
  getDashboardData: async (userId) => {
    // CORREÇÃO 3: Proteção contra userId undefined
    if (!userId || userId === "undefined") {
      console.warn("Dashboard tentou carregar sem userId válido.");
      return null;
    }
    const response = await api.get(`/api/dashboard/${userId}`);
    return response.data;
  },

  getStats: async (userId) => {
    if (!userId) return null;
    const response = await api.get(`/api/dashboard/${userId}/stats`);
    return response.data;
  },

  getRecentActivity: async (userId, limit = 10) => {
    if (!userId) return [];
    const response = await api.get(
      `/api/dashboard/${userId}/activity?limit=${limit}`
    );
    return response.data;
  },
};

export const paymentsAPI = {
  getPendingPayments: async (userId) => {
    if (!userId) return [];
    const response = await api.get(`/api/payments/pending/${userId}`);
    return response.data;
  },

  processPayments: async (paymentIds) => {
    const response = await api.post("/api/payments/process", { paymentIds });
    return response.data;
  },

  getPaymentHistory: async (userId, limit = 50) => {
    if (!userId) return [];
    const response = await api.get(
      `/api/payments/history/${userId}?limit=${limit}`
    );
    return response.data;
  },
};

export const bindersAPI = {
  getUserBinders: async (userId) => {
    if (!userId) return [];
    const response = await api.get(`/api/binders/user/${userId}`);
    return response.data;
  },

  getBinderStats: async (userId) => {
    if (!userId) return null;
    const response = await api.get(`/api/binders/stats/${userId}`);
    return response.data;
  },

  createBinder: async (binderData) => {
    const response = await api.post("/api/binders", binderData);
    return response.data;
  },
};

export const searchAPI = {
  searchQuery: async (query) => {
    if (!query) return [];
    const response = await api.get(`/api/search/query?q=${query}`);
    return response.data;
  },
  getDetails: async (type, id) => {
    if (!type || !id) {
      console.error("Tipo ou ID faltando para getDetails.");
      return null;
    }
    const response = await api.get(`/api/search/details/${type}/${id}`);
    return response.data;
  },
};

export const collectorsAPI = {
  getWishlist: async (userId) => {
    if (!userId) return [];
    const response = await api.get(`/api/collectors/wishlist/${userId}`);
    return response.data;
  },

  getActiveCEGs: async (userId) => {
    if (!userId) return [];
    const response = await api.get(`/api/collectors/cegs/active/${userId}`);
    return response.data;
  },

  getActiveAds: async (limit = 50) => {
    const response = await api.get(`/api/collectors/ads/active?limit=${limit}`);
    return response.data;
  },
};

export default api;
