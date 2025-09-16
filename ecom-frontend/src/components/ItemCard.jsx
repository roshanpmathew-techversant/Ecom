import React from "react";
import { ShoppingCart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ItemCard = ({ item }) => {
  const { id, name, desc, price, image, rating } = item;
  const Nav = useNavigate();

  return (
    <div
      onClick={() => {
        Nav(`/item/${item.id}`);
      }}
      className="w-66  bg-white border-2 border-gray-800 p-5 rounded-md shadow-[4px_4px_0px_0px_#323232] flex flex-col gap-3 relative"
    >
      <div className="absolute top-3 right-3 flex items-center bg-yellow-100 px-2 py-1 rounded-md shadow-sm">
        <p className="text-sm font-medium text-gray-800 flex items-center gap-1">
          {rating} <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        </p>
      </div>

      <div className="flex justify-center transition-all duration-300 hover:-translate-y-1">
        <img
          className="rounded-3xl cursor-pointer max-h-40 object-contain"
          src={image}
          alt={name}
        />
      </div>

      <h2 className="text-lg font-semibold text-gray-800 text-center">
        {name}
      </h2>
      <p className="text-sm text-gray-500 line-clamp-2">{desc}</p>

      <hr className="w-full border border-gray-800 rounded-full" />

      <div className="flex justify-between items-center mt-auto">
        <p className="text-lg font-semibold text-gray-800">
          <span className="text-gray-500">$</span> {price}
        </p>

        <button className="cursor-pointer h-9 w-9 flex items-center justify-center border-2 border-gray-800 rounded-md transition-all duration-300 hover:border-green-400 active:translate-y-1">
          <ShoppingCart className="cursor-pointer w-6 h-6 text-gray-800 transition-colors duration-300 group-hover:text-green-300" />
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
