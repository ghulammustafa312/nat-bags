import { axiosClient } from "../axios";

export const clearCartService = async () => {
  return await axiosClient.post("/cart/clearCart", {});
};
