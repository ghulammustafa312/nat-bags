import { axiosClient } from "../axios";

export const addOrderService = async (order) => {
  return await axiosClient.post("/orders", { ...order });
};
