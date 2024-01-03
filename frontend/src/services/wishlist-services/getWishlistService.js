import { axiosClient } from "../axios";

export const getWishlistService = async () => await axiosClient.get("/wishlist");
