import React, { useState, useEffect } from "react";
import { ShoppingCart, Star, CircleSlash } from "lucide-react";
import { currentUser, AddtoCart } from "../services/api/services";

import { useNavigate } from "react-router-dom";

const ItemCard = ({ item }) => {
  const [logged, Setlogged] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await currentUser();

        if (user) {
          Setlogged(true);
        } else {
          Setlogged(false);
        }
      } catch (error) {
        Setlogged(false);
      }
    };
    fetchUser();
  }, []);

  const {
    id,
    name = item.ProductName ?? "Unnamed Product",
    desc = item.ProductDesc ?? "No description available",
    price = item.Price ?? 0,
    image = item.Image ?? "https://via.placeholder.com/150",
    rating = item.rating ?? 0,
  } = item;

  const Nav = useNavigate();
  const AddItem = async () => {
    await AddtoCart(id);
    window.location.reload();
    alert(`${name} added to Cart`);
  };

  return (
    <div className="w-66 cursor-pointer   bg-white border-2 border-gray-800 p-10 rounded-md shadow-[4px_4px_0px_0px_#323232] flex flex-col gap-3 relative">
      <div
        onClick={() => {
          Nav(`/item/${item.id}`);
        }}
      >
        <div className="absolute top-3 right-3 flex items-center bg-yellow-100 px-2 py-1 rounded-md shadow-sm">
          <p className="text-sm font-medium text-gray-800 flex items-center gap-1">
            {rating}{" "}
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          </p>
        </div>

        <div className="flex justify-center transition-all duration-300 hover:-translate-y-1">
          <img
            className="rounded-3xl cursor-pointer max-h-40 object-contain"
            src={image}
            alt={name}
          />
        </div>

        <h2 className="text-lg mt-5 font-semibold text-gray-800 text-center">
          {name}
        </h2>
        <p className="text-sm text-gray-500 line-clamp-2">{desc}</p>

        <hr className="w-full border border-gray-800 rounded-full" />
      </div>

      <div className="flex justify-between items-center mt-auto">
        <p className="text-lg font-semibold text-gray-800">
          <span className="text-gray-500">₹</span> {price}
        </p>

        {logged ? (
          <button
            onClick={AddItem}
            className="cursor-pointer h-9 w-9 flex items-center justify-center border-2 border-gray-800 rounded-md transition-all duration-300 hover:border-green-400 active:translate-y-1"
          >
            <ShoppingCart className="cursor-pointer w-6 h-6 text-gray-800 transition-colors duration-300 group-hover:text-green-300" />
          </button>
        ) : (
          <button
            onClick={() => {
              alert("Login to Access Cart");
            }}
            className="cursor-pointer h-9 w-9 flex items-center justify-center border-2 border-gray-800 rounded-md transition-all duration-300 hover:border-red-900 active:translate-y-1"
          >
            <CircleSlash className="cursor-pointer w-6 h-6 text-red-800 transition-colors duration-300 group-hover:text-green-300" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
