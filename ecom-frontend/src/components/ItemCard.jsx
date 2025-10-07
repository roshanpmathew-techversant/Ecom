import React, { useState, useEffect } from "react";
import { ShoppingCart, Star, CircleSlash } from "lucide-react";
import { currentUser, AddtoCart } from "../services/api/services";
import { useNavigate } from "react-router-dom";

const ItemCard = ({ item }) => {
  const [logged, Setlogged] = useState(false);
  const [inStock, SetinStock] = useState(true);
  const [hasOffer, setOffer] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await currentUser();
        Setlogged(!!user);
      } catch (error) {
        Setlogged(false);
      }
    };
    fetchUser();
  }, []);

  const {
    id,
    ProductName = "Unnamed Product",
    ProductDesc = "No description available",
    Price = 0,
    Image = "https://via.placeholder.com/150",
    rating = 0,
    stock = 0,
    offers = 0,
    offerPrice = Price,
  } = item;

  useEffect(() => {
    SetinStock(stock > 0);
    setOffer(offers > 0);
  }, [stock, offers]);

  const Nav = useNavigate();
  const AddItem = async () => {
    await AddtoCart(id);
    window.location.reload();
    alert(`${ProductName} added to Cart Successfully`);
  };

  return (
    <div className="w-66 cursor-pointer m-4 bg-white border-2 border-gray-800 p-6 rounded-md shadow-[4px_4px_0px_0px_#323232] flex flex-col gap-3 relative">
      {hasOffer && (
        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow">
          {offers}% OFF
        </div>
      )}
      <div onClick={() => Nav(`/item/${id}`)}>
        <div className="absolute top-3 right-3 flex items-center bg-yellow-100 px-2 py-1 rounded-md shadow-sm">
          <p className="text-sm font-medium text-gray-800 flex items-center gap-1">
            {rating}{" "}
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          </p>
        </div>

        <div
          className="flex justify-center transition-all duration-300 hover:-translate-y-1"
          onClick={() => Nav(`/item/${id}`)}
        >
          <img
            className="rounded-3xl cursor-pointer max-h-40 mt-6 object-contain"
            src={Image}
            alt={ProductName}
          />
        </div>

        <h2 className="text-lg mt-2 font-semibold text-gray-800 text-center">
          {ProductName}
        </h2>
        <p className="text-sm text-gray-500 line-clamp-2">{ProductDesc}</p>
      </div>

      <hr className="w-full border border-gray-800 rounded-full" />

      <div className="flex justify-between items-center mt-auto">
        <div className="flex flex-col">
          {hasOffer ? (
            <>
              <span className="text-gray-400 line-through text-sm">
                ₹{Price.toLocaleString("en-IN")}
              </span>
              <span className="text-green-600 text-lg font-bold">
                ₹{offerPrice.toLocaleString("en-IN")}
              </span>
            </>
          ) : (
            <span className="text-lg font-semibold text-gray-800">
              ₹{Price.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {logged ? (
          <button
            onClick={inStock ? AddItem : () => alert("Out of Stock")}
            className="cursor-pointer h-9 w-9 flex items-center justify-center border-2 border-gray-800 rounded-md transition-all duration-300 hover:border-green-400 active:translate-y-1"
          >
            {inStock ? (
              <ShoppingCart className="w-6 h-6 text-gray-800" />
            ) : (
              <CircleSlash className="w-6 h-6 text-red-800" />
            )}
          </button>
        ) : (
          <button
            onClick={() => alert("Login to Access Cart")}
            className="cursor-pointer h-9 w-9 flex items-center justify-center border-2 border-gray-800 rounded-md transition-all duration-300 hover:border-red-900 active:translate-y-1"
          >
            <CircleSlash className="w-6 h-6 text-red-800" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
