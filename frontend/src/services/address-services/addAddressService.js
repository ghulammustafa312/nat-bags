import axios from "axios";
import { axiosClient } from "../axios";

export const addAddressService = async (address) => {
  return await axiosClient.post("/address/", { address });
};
