import React, { useState } from "react";
import { AddProduct } from "../services/api/services";

const ProductAddForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    id: "",
    ProductName: "",
    ProductDesc: "",
    Image: "", // will hold URL or base64 data
    Price: "",
    Category: "",
    rating: "",
    stock: "",
    offers: "",
  });

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image upload -> convert to base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        Image: reader.result, // base64 data URL
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await AddProduct(formData);
      if (res?.status === 200 || res?.status === 201) {
        alert(`${formData.ProductName} added successfully!`);
        window.location.reload();
        onClose();
      }
    } catch (err) {
      console.log("Error adding product:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Add New Product
        </h2>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          {/* Product ID */}
          <input
            type="number"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="Product ID"
            className="bg-gray-100 text-gray-900 rounded-md p-3 mb-4"
            required
          />

          {/* Product Name */}
          <input
            type="text"
            name="ProductName"
            value={formData.ProductName}
            onChange={handleChange}
            placeholder="Product Name"
            className="bg-gray-100 text-gray-900 rounded-md p-3 mb-4"
            required
          />

          {/* Product Description */}
          <textarea
            name="ProductDesc"
            value={formData.ProductDesc}
            onChange={handleChange}
            placeholder="Product Description"
            className="bg-gray-100 text-gray-900 rounded-md p-3 mb-4"
            required
          />

          {/* Image URL */}
          <input
            type="text"
            name="Image"
            value={formData.Image}
            onChange={handleChange}
            placeholder="Image URL (or upload below)"
            className="bg-gray-100 text-gray-900 rounded-md p-3 mb-4"
          />

          {/* Image Upload */}
          <div className="mb-4">
            <label
              htmlFor="file-upload"
              className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md border border-gray-300 text-sm font-medium transition"
            >
              Upload Image
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {formData.Image && (
            <img
              src={formData.Image}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-md mb-4"
            />
          )}

          {/* Price */}
          <input
            type="number"
            name="Price"
            value={formData.Price}
            onChange={handleChange}
            placeholder="Price"
            className="bg-gray-100 text-gray-900 rounded-md p-3 mb-4"
            required
          />

          {/* Category */}
          <input
            type="text"
            name="Category"
            value={formData.Category}
            onChange={handleChange}
            placeholder="Category"
            className="bg-gray-100 text-gray-900 rounded-md p-3 mb-4"
            required
          />

          {/* Rating */}
          <input
            type="number"
            step="0.1"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Rating (0 - 5)"
            className="bg-gray-100 text-gray-900 rounded-md p-3 mb-4"
          />

          {/* Stock */}
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="bg-gray-100 text-gray-900 rounded-md p-3 mb-4"
          />

          {/* Offers */}
          <input
            type="number"
            name="offers"
            value={formData.offers}
            onChange={handleChange}
            placeholder="Offers (%)"
            className="bg-gray-100 text-gray-900 rounded-md p-3 mb-4"
          />

          {/* Submit */}
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-3 px-6 rounded-md mt-4 hover:from-indigo-600 hover:to-blue-600 transition"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductAddForm;
