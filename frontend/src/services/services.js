import axios from "axios";
import { axiosClient } from "./axios";

// export const getAllCategories = async () => await axios.get("/api/categories");
export const getAllCategories = async () => await axiosClient.get("/categories");

// export const getAllProducts = async () => await axios.get("/api/products");
export const getAllProducts = async () => await axiosClient.get("/products");
