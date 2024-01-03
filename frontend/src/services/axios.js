import axios from "axios";
const baseURL = "http://localhost:8000";
const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};
export const axiosClient = axios.create({
  baseURL,
  headers: {
    Authorization: "Bearer " + getToken(),
    "Content-Type": "application/json",
  },
});
