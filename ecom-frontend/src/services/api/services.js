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
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
