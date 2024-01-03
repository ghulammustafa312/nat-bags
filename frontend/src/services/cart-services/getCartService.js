import { axiosClient } from "../axios";

export const getCartService = async () => await axiosClient.get("/cart");
