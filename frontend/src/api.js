import axios from "axios";
import { ACCESS_TOKEN } from "./constants";


const api = axios.create({
  baseURL: "https://8iaok344e7.execute-api.us-east-1.amazonaws.com",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
