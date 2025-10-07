import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { getAllProducts } from "../services/api/services";
import AdminItem from "../components/AdminItem";
import ProductAddForm from "../components/ProductAddForm";
import { ArrowRight } from "lucide-react";

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getAllProducts();
        const allProducts = fetchedProducts.products || [];
        setProducts(allProducts);
        setFilteredProducts(allProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    setFilteredProducts(
      products.filter(
        (product) =>
          product.ProductName.toLowerCase().includes(query) ||
          (product.category && product.category.toLowerCase().includes(query))
      )
    );
  }, [searchQuery, products]);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-6">
      <div className="flex items-center justify-between mb-4 sticky top-0 bg-gray-50 z-40 px-2 py-2 shadow-sm">
        <h1 className="text-4xl font-bold text-gray-800">Admin Panel</h1>
        <button
          onClick={() => nav("/shop")}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition"
        >
          Go To Shop <ArrowRight />
        </button>
      </div>

      <div className="flex justify-center mb-10">
        <Button text="Add Product" click={setShowForm} />
      </div>

      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">Items</h2>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-400 transition"
          />
        </div>

        {filteredProducts.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
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
