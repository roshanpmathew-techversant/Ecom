import React, { useState, useEffect } from "react";
import { GetProduct } from "../services/api/services";
import Payment from "./Payment";

const Checkout = ({ items }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await Promise.all(
          items.map(async (item) => {
            const res = await GetProduct(item.product);
            return { ...res.product, quantity: item.quantity };
          })
        );

        setProducts(fetchedProducts);

        const totalAmount = fetchedProducts.reduce(
          (acc, item) => acc + item.Price * item.quantity,
          0
        );
        setTotal(totalAmount);
      } catch (e) {
        console.error("Error fetching checkout products", e);
      }
    };

    if (items.length > 0) {
      fetchProducts();
    }
  }, [items]);

  const handlePayClick = () => {
    setShowPayment((prev) => !prev);
  };

  return (
    <div className="p-6 mx-auto bg-white w-[50%] shadow-lg rounded-xl relative">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>

      <div className="flex justify-between items-center mt-6 pt-4 border-t">
        <p className="text-lg font-bold">Total:</p>
        <p className="text-xl font-bold text-green-600">
          ₹{total.toLocaleString("en-IN")}
        </p>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={handlePayClick}
          className="group relative w-[130px] h-[40px] flex items-center justify-center bg-neutral-900 text-white font-semibold gap-2 cursor-pointer shadow-md overflow-hidden transition active:translate-x-[5px] active:translate-y-[5px]"
        >
          Pay
          <svg className="w-4 fill-white" viewBox="0 0 576 512">
            <path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path>
          </svg>
          <span className="absolute left-[-100%] top-0 w-[130px] h-[130px] bg-white rounded-full transition-transform duration-300 ease-in-out mix-blend-difference group-hover:translate-x-[100%] group-hover:-translate-y-1/2 group-hover:rounded-none"></span>
        </button>
      </div>

      {/* Payment modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
          <Payment />
        </div>
      )}
    </div>
  );
};

export default Checkout;
