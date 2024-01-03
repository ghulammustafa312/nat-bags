import { axiosClient } from "../axios";

export const addToWishlistService = async (product) => {
  return await axiosClient.post("/wishlist", { product: { ...product } });
};
