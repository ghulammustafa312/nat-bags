import { axiosClient } from "../axios";

export const signupService = async (
  email,
  password,
  firstName,
  lastName,
  phoneNo
) =>
  // await axios.post("/api/auth/signup", {
  //   email,
  //   password,
  //   firstName,
  //   lastName,
  // });
  {
    return await axiosClient.post("/auth/signup", {
      email,
      password,
      firstName,
      lastName,
      phoneNo,
      role: "USER",
      addresses: [],
    });
  };
