import React from "react";
import { Star } from "lucide-react";

const RatingBar = ({ selectedRating, onRatingChange }) => {
  const ratings = [5, 4, 3];

  return (
    <div>
      <p className="font-semibold">Customer Ratings</p>
      <div className="mt-5 flex flex-col gap-2">
        {ratings.map((rate) => (
          <label key={rate} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="rating"
              value={rate}
              checked={selectedRating === rate}
              onChange={() => onRatingChange(rate)}
              className="accent-blue-500"
            />
            <span className="flex flex-row gap-1 text-sm">
              <span>{rate}</span>
              <Star size={18} color="gold" fill="gold" />
              <span>& above</span>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RatingBar;
