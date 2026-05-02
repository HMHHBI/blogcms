import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://blog-cms-api.up.railway.app/api", // Laravel ka default port
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// ✅ Ye interceptor har request se pehle check karega
axiosInstance.interceptors.request.use((config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
