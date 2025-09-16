import React from "react";
import { useState } from "react";
const Price_Slider = () => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100000);

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
        {/* Title */}
        <h2 className="text-1xl font-semibold text-slate-800 mb-2">
          Price Range
        </h2>

        {/* Values */}
        <div className="flex items-center text-blue-600 font-medium mb-2">
          <span>${min}</span>
          <span className="mx-2">-</span>
          <span>${max}</span>
        </div>

        {/* Current Range */}
        <p className="text-gray-500 text-sm mb-4">
          Current Range:{" "}
          <span className="text-slate-700 font-semibold">${max - min}</span>
        </p>

        {/* Labels */}
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>1</span>
          <span>10,000</span>
        </div>

        {/* Range Sliders */}
        <div className="relative h-8">
          {/* Min */}

          {/* Max */}
          <input
            type="range"
            min="1"
            max="10000"
            value={max}
            onChange={(e) => setMax(Number(e.target.value))}
            className="absolute w-full h-1   cursor-pointer accent-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Price_Slider;
