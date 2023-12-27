import axios from "axios";
const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};
export const axiosClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Authorization: "Bearer " + getToken(),
    "Content-Type": "application/json",
  },
});
