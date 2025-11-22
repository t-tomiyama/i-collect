import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000" ||
  "https://i-collect-backend.onrender.com";

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
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

export const usersAPI = {
  getCommunity: async () => {
    const response = await api.get("/api/users/list");
    return response.data;
  },
};

export const dashboardAPI = {
  getDashboardData: async (userId) => {
    if (!userId || userId === "undefined" || userId === "guest") {
      return null;
    }
    const response = await api.get(`/api/dashboard/${userId}`);
    return response.data;
  },
};

export const ratingsAPI = {
  getTopRatings: async () => {
    try {
      const response = await api.get("/api/ratings/top");
      return response.data.data;
    } catch (error) {
      console.error("Erro ao buscar ratings", error);
      return { topGoms: [], topCollectors: [] };
    }
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
  getUserBinders: async (userId, socialMedia) => {
    if (!userId || !socialMedia) return [];
    const response = await api.get(`/api/binders/${userId}/${socialMedia}`);
    return response.data;
  },

  getBinderDetails: async (username, socialMedia, binderId) => {
    if (!username || !socialMedia || !binderId) return null;
    const response = await api.get(
      `/api/binders/${username}/${socialMedia}/${binderId}`
    );
    return response.data;
  },

  getBinderStats: async (userId) => {
    if (!userId) return null;
    const response = await api.get(`/api/binders/stats/${userId}`);
    return response.data;
  },

  createBinder: async (username, socialMedia, binderData) => {
    const response = await api.post(
      `/api/binders/${username}/${socialMedia}`,
      binderData
    );
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
    if (!type || !id) return null;
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
  addToWishlist: async (data) => {
    const response = await api.post("/api/wishlist/add", data);
    return response.data;
  },
};

export default api;
