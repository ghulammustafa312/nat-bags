import { axiosClient } from "../axios";

export const removeFromCartService = async (productId) => {
  return await axiosClient.delete(`/cart/${productId}`);
};
