// src/config.js

const API_URL = import.meta.env.PROD
  ? "https://i-collect-backend.onrender.com"
  : "/api";

export default API_URL;
