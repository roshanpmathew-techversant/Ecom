import React from "react";
import Price_Slider from "./Price_Slider";
import RatingBar from "./RatingBar";

const Shop_SideBar = ({
  categories,
  selectedCategories,
  onCategoryChange,
  min,
  max,
  setMin,
  setMax,
  selectedRating,
  onRatingChange,
}) => {
  return (
    <div className="p-4 w-full h-full rounded-lg bg-white shadow-md flex gap-5 flex-col">
      <h3 className="font-semibold mb-3 text-slate-700">Categories</h3>
      <div className="flex flex-col gap-2">
        {categories.map((cat) => (
          <label
            key={cat}
            className="flex items-center gap-2 text-sm cursor-pointer"
          >
            <input
              type="checkbox"
              value={cat}
              checked={selectedCategories.includes(cat)}
              onChange={() => onCategoryChange(cat)}
              className="accent-blue-500"
            />
            {cat}
          </label>
        ))}
      </div>
      <Price_Slider min={min} max={max} setMax={setMax} setMin={setMin} />
      <RatingBar
        selectedRating={selectedRating}
        onRatingChange={onRatingChange}
      />
    </div>
  );
};

export default Shop_SideBar;
