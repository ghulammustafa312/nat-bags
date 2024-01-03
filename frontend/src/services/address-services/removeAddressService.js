import { axiosClient } from "../axios";

export const removeAddressService = async (address) => {
  return await axiosClient.delete(`/address/${address._id}`);
};
