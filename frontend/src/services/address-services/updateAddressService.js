import axios from "axios";
import { axiosClient } from "../axios";

export const updateAddressService = async (address) => {
  return await axiosClient.put(`/address/${address._id}`, { address });
};
