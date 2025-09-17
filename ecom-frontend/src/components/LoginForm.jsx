import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
      console.log("Error", e);
    }
  };

  return (
    <div className="w-80 flex flex-col gap-6 rounded-lg shadow-lg p-6 bg-white">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-700">Login</h2>
        <p className="text-slate-500 text-sm">Enter your details below.</p>
      </div>

      {/* Form */}
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        {/* Username */}
        <input
          className="outline-none border-2 rounded-md px-3 py-2 text-slate-600 w-full focus:border-blue-400"
          placeholder="Email"
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />

        {/* Password */}
        <input
          className="outline-none border-2 rounded-md px-3 py-2 text-slate-600 w-full focus:border-blue-400"
          placeholder="Password"
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          type="password"
        />

        {/* Options */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-500">
            <input
              className="w-4 h-4 accent-blue-500"
              id="remember"
              name="remember"
              type="checkbox"
            />
            Remember me
          </label>
          <a className="text-blue-500 font-medium hover:underline" href="#">
            Forgot Password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          className="w-full py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white font-medium transition"
          id="login"
          name="login"
          type="submit"
        >
          Login
        </button>

        {/* Sign Up */}
        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <a
            className="text-blue-500 hover:underline font-medium"
            href="/signup"
          >
            SignUp{" "}
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
