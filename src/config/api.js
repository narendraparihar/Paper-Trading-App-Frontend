import axios from "axios";

export const API_BASE_URL = "http://localhost:5454";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 429 && !originalRequest._retry) {
      originalRequest._retry = true;
      await sleep(2000); // Wait before retrying
      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);
