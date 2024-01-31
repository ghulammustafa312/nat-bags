import axios from "axios";
const baseURL = "http://localhost:8000";
const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return;
  return "Bearer " + token;
};
export const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  config.headers.Authorization = getToken();
  return config;
});
