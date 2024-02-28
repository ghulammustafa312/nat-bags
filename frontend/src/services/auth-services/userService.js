import { axiosClient } from "../axios";

export const userService = async (email, password) => {
  return await axiosClient.get("/users");
};
