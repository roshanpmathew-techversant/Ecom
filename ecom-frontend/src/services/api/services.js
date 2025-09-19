import api from "./axios";

export const signup = async (name, email, password) => {
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
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.log("Not Logged");
  }
};

export const getProducts = async () => {
  try {
    const res = await api.get("/shop/products");

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
