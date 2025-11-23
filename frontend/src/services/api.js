import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Ou 'i-collect-token' dependendo de como você salvou
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authAPI = {
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },
  getSocialMedias: async () => {
    const response = await api.get("/auth/social-medias");
    return response.data.data;
  },
};

export const dashboardAPI = {
  getDashboardData: async (userId) => {
    const response = await api.get(`/dashboard/${userId}`);
    return response.data;
  },
};

export const searchAPI = {
  search: async (category, query, limit = 18) => {
    const endpoint = category === "global" ? "photocards" : category;
    const response = await api.get(`/search/${endpoint}`, {
      params: { q: query, limit },
    });
    return response.data;
  },

  getDetails: async (type, id) => {
    const response = await api.get(`/search/details/${type}/${id}`);
    return response.data.data;
  },

  addToWishlist: async (data) => {
    const response = await api.post("/search/wishlist/add", data);
    return response.data;
  },
};

export const paymentsAPI = {
  processPayments: async (paymentIds) => {
    const response = await api.post("/payments/process", {
      paymentIds,
    });
    return response.data;
  },

  getPayments: async (userId) => {
    const response = await api.get(`/payments/${userId}`);
    return response.data;
  },
};

export const ratingsAPI = {
  getTopRatings: async () => {
    const response = await api.get("/ratings/top");
    return response.data;
  },
};

export default api;
