// axiosClient.ts o donde declares tu cliente
import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
import { signOut } from "next-auth/react";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipAuthInterceptor?: boolean;
}

// Crea una instancia tipada
export const mainApi: AxiosInstance = axios.create({
  baseURL: BASE_API_URL,
});

// Interceptor de respuesta
mainApi.interceptors.response.use(
  response => response,
  error => {
    const config = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !config?.skipAuthInterceptor) {
      localStorage.removeItem("dashboard-storage");
      signOut({ redirect: true, callbackUrl: "/" });
    }

    return Promise.reject(error);
  }
);
