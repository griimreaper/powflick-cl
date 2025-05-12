import axios from "axios";
import { signOut } from "next-auth/react";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const mainApi = axios.create({
  baseURL: BASE_API_URL,
});

// Interceptor para manejar 401
mainApi.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem("dashboard-storage");
      signOut({ redirect: true, callbackUrl: '/' })
    }

    return Promise.reject(error);
  }
);
