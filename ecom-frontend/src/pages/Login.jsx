import React from "react";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="w-1/2 flex items-center justify-center bg-blue-300">
        <h1 className="text-7xl text-center  font-semibold font-mono">
          Welcome back
        </h1>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
