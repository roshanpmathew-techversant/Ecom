import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api/services";

const LoginForm = () => {
  const nav = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login(form.email, form.password);
      alert("Login Success");
      if (userData.status === "admin") {
        nav("/admindash");
      } else {
        nav("/shop");
      }
    } catch (e) {
      const errorMsg =
        e.response?.data?.message || "Login failed. Please try again.";
      alert(errorMsg);
      console.error("Login Error:", e.response?.data || e.message);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-md p-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Login</h2>
        <p className="text-gray-500 text-sm mt-1">
          Enter your details to access your account
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Email */}
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400 transition"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400 transition"
        />

        {/* Options */}
        <div className="flex items-center justify-between text-sm mt-1">
          <label className="flex items-center gap-2 text-gray-600">
            <input
              type="checkbox"
              name="remember"
              className="w-4 h-4 accent-blue-600"
            />
            Remember me
          </label>
          <a href="#" className="text-blue-600 hover:underline">
            Forgot Password?
          </a>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full mt-2 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 active:bg-blue-800 transition"
        >
          Login
        </button>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600 mt-3">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
