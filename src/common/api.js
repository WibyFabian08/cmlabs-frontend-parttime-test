import axios from "axios";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

api.interceptors.request.use(
  (config) => {

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;