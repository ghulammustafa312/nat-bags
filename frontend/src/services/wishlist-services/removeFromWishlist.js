import { axiosClient } from "../axios";

export const removeFromWishlistService = async (productId) => {
  return await axiosClient.delete(`/wishlist/${productId}`);
};
