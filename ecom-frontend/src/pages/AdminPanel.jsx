import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { getAllProducts } from "../services/api/services";
import AdminItem from "../components/AdminItem";
import ProductAddForm from "../components/ProductAddForm";
import { ArrowRight } from "lucide-react";

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getAllProducts();
        setProducts(fetchedProducts.products || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-6">
      <div className="flex items-center justify-between mb-8 sticky top-0 bg-gray-50 z-40 px-2 py-2 shadow-sm">
        <h1 className="text-4xl font-bold text-gray-800">Admin Panel</h1>
        <button
          onClick={() => nav("/shop")}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition"
        >
          Go To Shop <ArrowRight />
        </button>
      </div>

      <div className="flex justify-center mb-10">
        <Button text="Add Product" onClick={() => setShowForm(true)} />
      </div>

      <div className="w-full">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Items</h2>

        {products.length === 0 ? (
          <p className="text-gray-500">No products available.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <AdminItem key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 px-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center">
              Add Product
            </h2>

            <ProductAddForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
