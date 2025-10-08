import React from "react";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Section */}
      <div className="lg:w-1/2 flex items-center justify-center bg-gray-100 p-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 text-center leading-tight">
          Welcome
          <br />
          Back
        </h1>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
