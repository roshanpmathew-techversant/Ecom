import React from "react";
import ItemCard from "../components/ItemCard";
import items from "../SampleDb/items";

const Shop = () => {
  return (
    <div className="max-w-7xl mx-auto p-5">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="shop-search "
        />

        <div className="flex flex-wrap gap-3">
          <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-400">
            <option>Category</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Home</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-400">
            <option>Price</option>
            <option>Low to High</option>
            <option>High to Low</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-400">
            <option>Sort By</option>
            <option>Newest</option>
            <option>Best Selling</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
