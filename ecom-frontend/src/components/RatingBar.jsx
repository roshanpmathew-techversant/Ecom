import React from "react";
import { Star, StarHalfIcon } from "lucide-react";

const RatingBar = () => {
  return (
    <div>
      <p>Customer Ratings</p>
      <div className="mt-5">
        <span className="flex flex-row gap-4">
          <input
            type="checkbox"
            className="h-4 w-4"
            name="rating"
            id="5stars"
          />
          <p className="flex flex-row gap-1">
            <span>5</span>
            <Star size={20} color="gold" fill="gold" />
            <span>&above</span>
          </p>
        </span>
        <span className="flex flex-row gap-4">
          <input
            type="checkbox"
            className="h-4 w-4"
            name="rating"
            id="5stars"
          />
          <p className="flex flex-row gap-1">
            <span>4</span>
            <Star size={20} color="gold" fill="gold" />
            <span>&above</span>
          </p>
        </span>
        <span className="flex flex-row gap-4">
          <input
            type="checkbox"
            className="h-4 w-4"
            name="rating"
            id="5stars"
          />
          <p className="flex flex-row gap-1">
            <span>3</span>
            <Star size={20} color="gold" fill="gold" />
            <span>&above</span>
          </p>
        </span>
      </div>
    </div>
  );
};

export default RatingBar;
