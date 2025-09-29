import React, { useState, useEffect } from "react";
import {
  AddtoCart,
  RemoveFromCart,
  GetProduct,
} from "../services/api/services";
import { useNavigate } from "react-router-dom";

import { Minus, Plus, Trash2 } from "lucide-react"; // nice icons

const CartItem = ({ product, quantity }) => {
  const [Item, setItem] = useState();
  const [hasOffer, setOffer] = useState(false);
  const Nav = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetched = await GetProduct(product);

        if (fetched) {
          setItem(fetched.product);

          setOffer(fetched.product.offers > 0);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchProduct();
  }, [product]);

  const AddItem = async () => {
    try {
      await AddtoCart(Item?.id);

      window.location.reload();
    } catch (e) {
      console.log("Error Adding to Cart:", e);
      alert("Something went wrong while adding to cart.");
    }
  };

  const RemoveItem = async () => {
    try {
      await RemoveFromCart(Item?.id);

      window.location.reload();
    } catch (e) {
      console.log("Error Removing from Cart:", e);
      alert("Something went wrong while removing from cart.");
    }
  };
  console.log(hasOffer);

  return (
    <div className=" flex w-full items-center gap-6 bg-white shadow-sm rounded-2xl p-4 mb-4 border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="w-24 h-24 flex-shrink-0">
        <img
          src={Item?.Image}
          onClick={() => Nav(`/item/${Item?.id}`)}
          alt={Item?.ProductName}
          className="w-full h-full object-cover rounded-xl cursor-pointer"
        />
      </div>

      <div className="flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">
          {Item?.ProductName}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2">
          {Item?.ProductDesc}
        </p>
        <p className="text-blue-600 font-bold mt-1">
          ₹{hasOffer ? Item?.offerPrice : Item?.Price}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={RemoveItem}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
        >
          {quantity === 1 ? <Trash2 size={18} /> : <Minus size={18} />}
        </button>
        <span className="text-lg font-semibold text-gray-700 min-w-[2ch] text-center cursor-pointer">
          {quantity}
        </span>
        <button
          onClick={AddItem}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
