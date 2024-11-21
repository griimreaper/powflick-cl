import axios from "axios";
const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const mainApi = axios.create({
  baseURL: BASE_API_URL,
});
