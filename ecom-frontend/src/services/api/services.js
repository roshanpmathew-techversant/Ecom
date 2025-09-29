import api from "./axios";
import { useNavigate } from "react-router-dom";

export const signup = async (name, email, password) => {
  const nav = useNavigate();
  try {
    const res = await api.post("/auth/signup", { name, email, password });

    localStorage.setItem("token", res.data.token);
  } catch (e) {
    console.error("SignUp Error: ", e.response?.data || e.message);
    throw e;
  }
};
export const login = async (email, password) => {
  try {
    const res = await api.post("/auth/login", { email, password });

    localStorage.setItem("token", res.data.token);
    return res.data;
  } catch (e) {
    console.error("Login Error: ", e.response?.data || e.message);
    throw e;
  }
};

export const currentUser = async () => {
  try {
    const res = await api.get("/auth/profile");
    return res.data;
  } catch (e) {
    console.log("Not Logged");
  }
};

export const getProducts = async (filters = {}) => {
  try {
    const res = await api.get("/shop/products", { params: filters });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export const getAllProducts = async () => {
  try {
    const res = await api.get("/shop/allproducts");
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const GetProductById = async (id) => {
  try {
    const res = await api.get(`/shop/product/${id}`);
    return res.data;
  } catch (e) {
    console.log("Product Not Found", e);
  }
};
export const GetProduct = async (id) => {
  try {
    const res = await api.get(`/shop/cartproduct/${id}`);
    return res.data;
  } catch (e) {
    console.log("Product Not Found", e);
  }
};

export const LogoutUser = async () => {
  try {
    const res = await api.post("/auth/logout");
    localStorage.removeItem("token");
  } catch (e) {
    console.log(e);
  }
};

export const AddtoCart = async (id) => {
  try {
    const res = await api.post(`/cart/add/${id}`);
    return res.data;
  } catch (e) {
    if (e.response && e.response.data?.message === "Product Out of Stock") {
      alert("Sorry, this product is out of stock!");
    } else {
      console.log("Error Adding to Cart: ", e);
    }
  }
};
export const RemoveFromCart = async (id) => {
  try {
    const res = await api.post(`/cart/remove/${id}`);
    return res.data;
  } catch (e) {
    console.log("Error Adding to Cart: ", e);
  }
};

export const AddProduct = async (product) => {
  try {
    const res = await api.post(`/admin/product`, product);
    console.log(res);
    return res;
  } catch (e) {
    console.log("Error Adding Product", e);
  }
};

export const DltProduct = async (id) => {
  try {
    const res = await api.delete(`/admin/product/${id}`);
    return res;
  } catch (e) {
    console.log("Error Deleting Product", e);
  }
};

export const AddOffer = async (id, offer) => {
  try {
    const res = await api.put(`/admin/offer/${id}`, offer);
    return res;
  } catch (e) {
    console.log("Error adding Offer", e);
  }
};

export const UpdateProduct = async (id, product) => {
  try {
    const res = await api.put(`/admin/product/${id}`, product);
    return res;
  } catch (e) {
    console.log("Error Updating Product", e);
  }
};
