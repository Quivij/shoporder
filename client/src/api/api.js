import axios from "axios";

const base = import.meta.env.VITE_API_BASE || "http://localhost:5000";

// Tạo instance axios
const api = axios.create({
  baseURL: base,
});

// Interceptor: tự động gắn token cho mọi request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
