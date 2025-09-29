import React from "react";
import { useState } from "react";
import { AddOffer } from "../services/api/services";
const OfferAdd = ({ id, onClose }) => {
  const [formData, setFormData] = useState({
    offers: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await AddOffer(id, formData);
      if (res?.status === 200 || res?.status === 201) {
        alert(`Offer applied successfully!`);
        onClose();
        window.location.reload();
      }
    } catch (err) {
      console.log("Error adding product:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-1 right-2  text-gray-500 hover:text-gray-700 text-xl mb-8 cursor-pointer"
        >
          ✕
        </button>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="number"
            name="offers"
            value={formData.offers}
            onChange={handleChange}
            className="bg-gray-200 text-gray-900 rounded-md p-3 mb-4"
            required
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-3 px-6 rounded-md mt-4 hover:from-indigo-600 hover:to-blue-600 transition"
          >
            Apply Offer{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OfferAdd;
