import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/api/services";

const Signupform = () => {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form.name, form.email, form.password);
      alert("SignUp Success");
      nav("/shop");
    } catch (e) {
      console.log("Error", e);
    }
  };

  return (
    <div className="w-80 flex flex-col gap-6 rounded-lg shadow-lg p-6 bg-white">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-700">SignUp</h2>
        <p className="text-slate-500 text-sm">Enter your details below.</p>
      </div>

      {/* Form */}
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        {/* Username */}
        <input
          className="outline-none border-2 rounded-md px-3 py-2 text-slate-600 w-full focus:border-blue-400"
          placeholder="Username"
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
        />
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
          type="password"
          value={form.password}
          onChange={handleChange}
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
          className="w-full py-2 cursor-pointer bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white font-medium transition"
          id="login"
          name="login"
          type="submit"
        >
          SignUp
        </button>

        {/* Sign Up */}
        <p className="text-center text-sm">
          Already have an account?{" "}
          <a
            className="text-blue-500 hover:underline font-medium"
            href="/login"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signupform;
