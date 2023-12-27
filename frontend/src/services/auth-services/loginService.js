import { axiosClient } from "../axios";

export const loginService = async (email, password) => {
  // return await axios.post("/api/auth/login", { email, password });
  return await axiosClient.post("/auth/login", { email, password });
};
