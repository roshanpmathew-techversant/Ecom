import React from "react";
import { ShoppingCart, LogIn } from "lucide-react";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-8xl font-bold">E-COMMERCE</h1>
      <h1 className="text-7xl mt-4 font-bold tracking-wider">Site</h1>
      <div className="mt-15 flex flex-row gap-10">
        <button className="home-icon">
          <a href="/shop">
            {" "}
            <ShoppingCart size={80} />
          </a>
        </button>
        <button className="home-icon">
          <a href="/login">
            <LogIn size={80} />
          </a>
        </button>
      </div>
    </div>
  );
};

export default Home;
