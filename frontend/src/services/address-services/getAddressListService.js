import { axiosClient } from "../axios";

export const getAddressListService = async () => {
  return await axiosClient.get("/address");
};
