import React from "react";
import { ShoppingCart, LogIn } from "lucide-react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white text-gray-900">
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
          E-Commerce
        </h1>
        <p className="text-lg sm:text-xl mt-3 text-gray-500">
          Simple. Modern. Fast.
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-12 flex gap-8"
      >
        {/* Shop Button */}
        <a href="/shop">
          <motion.button
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="flex flex-col items-center gap-2 border border-gray-300 hover:border-gray-900 rounded-xl px-6 py-4 transition-colors"
          >
            <ShoppingCart size={40} />
            <span className="text-sm font-medium">Shop</span>
          </motion.button>
        </a>

        {/* Login Button */}
        <a href="/login">
          <motion.button
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="flex flex-col items-center gap-2 border border-gray-300 hover:border-gray-900 rounded-xl px-6 py-4 transition-colors"
          >
            <LogIn size={40} />
            <span className="text-sm font-medium">Login</span>
          </motion.button>
        </a>
      </motion.div>
    </div>
  );
};

export default Home;
