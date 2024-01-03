import { axiosClient } from "../axios";

export const changeQuantityCartService = async (productId, type) => {
  return await axiosClient.put(`cart/${productId}`, {
    action: {
      type,
    },
  });
};
