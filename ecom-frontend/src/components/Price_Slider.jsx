import React, { useState } from "react";

const Price_Slider = ({ min, max, setMax, setMin }) => {
  const minGap = 200;
  const sliderMax = 100000;

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), max - minGap);
    setMin(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), min + minGap);
    setMax(value);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-1xl font-semibold text-slate-800 mb-4">
          Price Range
        </h2>

        {/* Current range display */}
        <div className="flex items-center text-blue-600 font-medium mb-4">
          <span>₹{min.toLocaleString()}</span>
          <span className="mx-2">-</span>
          <span>₹{max.toLocaleString()}</span>
        </div>

        {/* Slider */}
        <div className="relative w-full h-2">
          {/* background track */}
          <div className="absolute w-full h-1 bg-gray-300 rounded"></div>

          {/* active range */}
          <div
            className="absolute h-1 bg-blue-500 rounded"
            style={{
              left: `${(min / sliderMax) * 100}%`,
              right: `${100 - (max / sliderMax) * 100}%`,
            }}
          ></div>

          {/* Min handle */}
          <input
            type="range"
            min="0"
            max={sliderMax}
            value={min}
            onChange={handleMinChange}
            className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none"
            style={{ zIndex: min > sliderMax - 1000 ? "5" : "3" }}
          />

          {/* Max handle */}
          <input
            type="range"
            min="0"
            max={sliderMax}
            value={max}
            onChange={handleMaxChange}
            className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Price_Slider;
