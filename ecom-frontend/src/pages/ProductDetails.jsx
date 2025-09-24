import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  GetProductById,
  currentUser,
  AddtoCart,
} from "../services/api/services";
import {
  Star,
  StarHalf,
  StarOff,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";
import ImageMagnifier from "../components/ImageMagnifier";
import ProfileIcon from "../components/ProfileIcon";

const ProductDetails = () => {
  const nav = useNavigate();
  const [logged, Setlogged] = useState(false);
  const [cart, SetCart] = useState([]);
  const [inCart, SetinCart] = useState(false);
  const [inStock, SetinStock] = useState(true);
  const [hasOffer, setOffer] = useState(false);

  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await currentUser();
        if (user) {
          Setlogged(true);
          SetCart(user.cart || []);
        } else {
          Setlogged(false);
        }
      } catch (error) {
        Setlogged(false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const findItem = async () => {
      try {
        const res = await GetProductById(id);
        if (res && res.product) {
          setItem(res.product);
          SetinStock(res.product.stock > 0);
          setOffer(res.product.offers > 0);
        } else {
          console.log("No Product Found");
        }
      } catch (e) {
        console.log("Error Finding Product", e);
      }
    };
    findItem();
  }, [id]);

  useEffect(() => {
    if (cart && item) {
      const exists = cart.some((cartItem) => cartItem.product === item._id);
      SetinCart(exists);
    }
  }, [cart, item]);

  if (!item) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold animate-pulse">
          Loading Product...
        </p>
      </div>
    );
  }
  console.log(item);
  console.log(hasOffer);

  const {
    ProductName = "Unnamed Product",
    ProductDesc = "No description available",
    Price = 0,
    Image = "https://via.placeholder.com/150",
    rating = 0,
    stock = 0,
    offers = 0,
    offerPrice = 0,
  } = item;

  const renderStars = (rating) => {
    const stars = [];
    const roundedRating = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < roundedRating; i++) {
      stars.push(
        <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
      );
    }
    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          className="w-5 h-5 text-yellow-500 fill-yellow-500"
        />
      );
    }
    while (stars.length < 5) {
      stars.push(
        <StarOff key={stars.length} className="w-5 h-5 text-gray-400" />
      );
    }
    return stars;
  };

  const handleCart = async () => {
    try {
      if (inCart) {
        nav("/cart");
      } else {
        await AddtoCart(id);

        SetCart((prev) => [
          ...(prev || []),
          { product: item._id, quantity: 1 },
        ]);
        SetinCart(true);
        window.location.reload();

        alert(`${ProductName} added to Cart`);
      }
    } catch (e) {
      console.log("Error Adding to Cart: ", e);
    }
  };

  return (
    <div className="min-h-screen relative bg-gray-50 flex items-center justify-center p-4">
      <div className="absolute top-8 right-40">
        <ProfileIcon />
      </div>

      <div className="w-full max-w-7xl flex flex-col md:flex-row gap-10 bg-white shadow-lg rounded-lg overflow-hidden p-6">
        <div className="w-full md:w-2/5 flex items-center justify-center bg-gray-100 p-6 rounded-lg">
          <ImageMagnifier src={Image} width={400} height={400} zoom={2} />
        </div>

        <div className="w-full md:w-3/5 flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-gray-900">{ProductName}</h2>

          <div className="flex items-center gap-2">
            {renderStars(rating)}
            <span className="text-gray-500 text-sm">({rating} out of 5)</span>
          </div>

          <div>
            {hasOffer ? (
              <div className="text-2xl font-bold text-red-600 flex flex-col">
                ₹{offerPrice}{" "}
                <span>
                  <span className="line-through text-gray-500 text-lg ml-2">
                    ₹{Price}
                  </span>
                  <span className=" text-green-500 text-lg ml-2">
                    {offers}% off
                  </span>
                </span>
              </div>
            ) : (
              <div className="text-2xl font-bold text-green-600">₹{Price}</div>
            )}
          </div>

          <p className="text-gray-700 leading-relaxed">{ProductDesc}</p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={handleCart}
              className="flex cursor-pointer items-center justify-center gap-3 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!logged || (!inStock && !inCart)}
            >
              {inStock ? (
                <>
                  <ShoppingCart
                    className={`w-5 h-5 ${inCart ? "hidden" : "block"}`}
                  />
                  {inCart ? (
                    <span className="flex flex-col items-center gap-2">
                      <p className="text-[12px] font-extralight">
                        Already in Cart
                      </p>
                      <span className="flex gap-3">
                        <h1 className="bold">View Cart</h1>
                        <ArrowRight className="w-4 h-5 relative top-0.5" />
                      </span>
                    </span>
                  ) : (
                    "Add to Cart"
                  )}
                </>
              ) : !inStock && inCart ? (
                <span className="flex flex-col items-center gap-2">
                  <p className="text-[12px] font-extralight">Already in Cart</p>
                  <span className="flex gap-3">
                    <h1 className="bold">View Cart</h1>
                    <ArrowRight className="w-4 h-5 relative top-0.5" />
                  </span>
                </span>
              ) : (
                <span className="text-red-500 font-semibold">
                  Item is Out of Stock
                </span>
              )}
            </button>

            <button
              className={`bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed ${
                inStock ? "block" : "hidden"
              }`}
              disabled={!logged}
            >
              Buy Now
            </button>
          </div>

          <div className="mt-8 text-sm text-gray-600">
            <p>✅ Free delivery available</p>
            <p>🚚 Usually delivered within 2–4 business days</p>
            <p>🔒 Secure transaction</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
