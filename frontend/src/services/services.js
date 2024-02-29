import axios from "axios";
import { axiosClient } from "./axios";

// export const getAllCategories = async () => await axios.get("/api/categories");
export const getAllCategories = async () => await axiosClient.get("/categories");

// export const getAllProducts = async () => await axios.get("/api/products");
export const getAllProducts = async () => await axiosClient.get("/products");

export const addProductReview = async (productId, payload) => await axiosClient.post(`/products/${productId}/review`, payload);


export const addProduct = async (payload) => {
  return await axiosClient.post("/products", { ...payload });
};
export const addCategory = async (payload) => {
  return await axiosClient.post("/categories", { ...payload });
};
export const deleteCategory=async(id)=> {
    return await axiosClient.delete(`/categories/${id}`);
}
export const updateProduct=async(id,payload)=> {
    return await axiosClient.put(`/products/${id}`,payload);
}
export const deleteProduct=async(id)=> {
    return await axiosClient.delete(`/products/${id}`);
}
export const uploadImage = async (payload) => {
  return await axiosClient.post("/uploads", payload,{ headers: { "Content-Type": "multipart/form-data" } })
};
