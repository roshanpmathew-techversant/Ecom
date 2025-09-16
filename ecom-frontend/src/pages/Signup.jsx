import React from "react";
import Signupform from "../components/SignupForm";

const SignUp = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="w-1/2 flex items-center justify-center bg-blue-300">
        <h1 className="text-7xl text-center  font-semibold font-mono">
          Hi There
        </h1>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex items-center justify-center">
        <Signupform />
      </div>
    </div>
  );
};

export default SignUp;
