import { axiosClient } from "../axios";

export const addToCartService = async (product) => {
  return await axiosClient.post("/cart", { product: { ...product } });
};
