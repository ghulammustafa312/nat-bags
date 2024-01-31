import { axiosClient } from "../axios";

export const getOrderService = async () => {
  return await axiosClient.get("/orders");
};
