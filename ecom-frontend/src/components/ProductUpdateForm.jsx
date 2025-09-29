import React, { useState, useEffect } from "react";
import { GetProductById, UpdateProduct } from "../services/api/services";

const ProductUpdateForm = ({ id, onClose }) => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await GetProductById(id);
        const product = res.product;
        setFormData({ ...product });
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        Image: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await UpdateProduct(id, formData);
      if (res?.status === 200 || res?.status === 201) {
        alert(`${formData.ProductName} updated successfully!`);
        onClose();
        window.location.reload();
      }
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  if (loading || !formData) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
        <p className="text-white text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg relative max-h-[90vh] overflow-y-auto p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Update Product
        </h2>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label className="mb-1 font-medium text-gray-700">Product ID</label>
          <input
            type="number"
            name="id"
            value={id}
            onChange={handleChange}
            className="bg-gray-100 text-gray-900 rounded-md p-3 mb-4"
            disabled
          />

          <label className="mb-1 font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="ProductName"
            value={formData.ProductName}
            onChange={handleChange}
            className="bg-gray-100 text-gray-900 rounded-md p-3 mb-4"
            required
          />

          <label className="mb-1 font-medium text-gray-700">
            Product Description
          </label>
          <textarea
            name="ProductDesc"
            value={formData.ProductDesc}
            onChange={handleChange}
            className="bg-gray-100 text-gray-900 rounded-md p-3 mb-4"
            required
          />

          <label className="mb-1 font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            name="Image"
            value={formData.Image}
            onChange={handleChange}
            className="bg-gray-100 text-gray-900 rounded-md p-3 mb-4"
          />

          <label className="mb-1 font-medium text-gray-700">Upload Image</label>
          <div className="mb-4">
            <label
              htmlFor="file-upload"
              className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md border border-gray-300 text-sm font-medium transition"
            >
              Choose File
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

          <label className="mb-1 font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="Price"
            value={formData.Price}
            onChange={handleChange}
            className="bg-gray-100 text-gray-900 rounded-md p-3 mb-4"
            required
          />

          <label className="mb-1 font-medium text-gray-700">Category</label>
          <input
            type="text"
            name="Category"
            value={formData.Category}
            onChange={handleChange}
            className="bg-gray-100 text-gray-900 rounded-md p-3 mb-4"
            required
          />

          <label className="mb-1 font-medium text-gray-700">Rating</label>
          <input
            type="number"
            step="0.1"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="bg-gray-100 text-gray-900 rounded-md p-3 mb-4"
          />

          <label className="mb-1 font-medium text-gray-700">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="bg-gray-100 text-gray-900 rounded-md p-3 mb-4"
          />

          <label className="mb-1 font-medium text-gray-700">Offers (%)</label>
          <input
            type="number"
            name="offers"
            value={formData.offers}
            onChange={handleChange}
            className="bg-gray-100 text-gray-900 rounded-md p-3 mb-4"
          />

          <button
            type="submit"
            className=" cursor-pointer bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-3 px-6 rounded-md mt-4 hover:from-indigo-600 hover:to-blue-600 transition"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductUpdateForm;
