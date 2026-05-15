import axios from "axios";

/*
  API INSTANCE
*/

const api = axios.create({
  baseURL:
    "https://vulnprobe-backend.onrender.com/api",
});

/*
  ATTACH JWT TOKEN
*/

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);

export default api;