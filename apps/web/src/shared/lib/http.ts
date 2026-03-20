import axios from "axios";

export const http = axios.create({
  baseURL: import.meta.env.VITE_CORE_API_URL ?? "http://localhost:3000/api",
  timeout: 10_000,
});

http.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ??
      error.message ??
      "Unexpected request error.";

    return Promise.reject(new Error(message));
  },
);
