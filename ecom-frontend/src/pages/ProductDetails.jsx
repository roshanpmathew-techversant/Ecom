import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetProductById } from "../services/api/services";
import { Star, StarHalf, StarOff, ShoppingCart } from "lucide-react";
import ImageMagnifier from "../components/ImageMagnifier";

const ProductDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const findItem = async () => {
      try {
        const res = await GetProductById(id);
        if (res && res.product) {
          setItem(res.product);
        } else {
          console.log("No Product Found");
        }
      } catch (e) {
        console.log("Error Finding Product", e);
      }
    };
    findItem();
  }, [id]);

  if (!item) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold animate-pulse">
          Loading Product...
        </p>
      </div>
    );
  }

  const {
    ProductName = "Unnamed Product",
    ProductDesc = "No description available",
    Price = 0,
    Image = "https://via.placeholder.com/150",
    rating = 0,
  } = item;

  // ⭐ Function to render rating stars
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
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

          <div className="text-2xl font-bold text-green-600">₹{Price}</div>

          <p className="text-gray-700 leading-relaxed">{ProductDesc}</p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium shadow-md transition">
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium shadow-md transition">
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
