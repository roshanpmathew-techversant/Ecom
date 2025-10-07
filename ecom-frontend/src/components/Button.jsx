import React from "react";

const Button = ({ text, click }) => {
  return (
    <div className="flex justify-center w-full ">
      <button
        onClick={() => click(true)}
        className="w-[80%] h-50 text-center font-poppins font-light text-5xl uppercase  text-green-400
                   bg-transparent border-2 border-dashed border-gray-600/50 
                   rounded-2xl hover:border-black  hover:text-green-400 transition-colors duration-300 cursor-pointer"
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
