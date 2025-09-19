import React, { useState, useEffect } from "react";
import ItemCard from "../components/ItemCard";
import Shop_SideBar from "../components/Shop_SideBar";
import ProfileIcon from "../components/ProfileIcon";
import { getProducts } from "../services/api/services";

const Shop = () => {
  const categories = [
    "Electronics",
    "Clothes",
    "Food",
    "Home Appliances",
    "Sports & Fitness",
  ];

  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [price, setPrice] = useState("");
  const [sort, setSort] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100000);
  const [selectedRating, setSelectedRating] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const product = await getProducts();
        setItems(product.products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  let filteredItems = items.filter(
    (item) =>
      (selectedCategories.length === 0 ||
        selectedCategories.includes(item.Category)) &&
      (item.ProductName.toLowerCase().includes(search.toLowerCase()) ||
        item.ProductDesc.toLowerCase().includes(search.toLowerCase())) &&
      item.Price >= min &&
      item.Price <= max &&
      (selectedRating === null || item.rating >= selectedRating)
  );

  if (price === "Low to High") {
    filteredItems = filteredItems.sort((a, b) => a.Price - b.Price);
  } else if (price === "High to Low") {
    filteredItems = filteredItems.sort((a, b) => b.Price - a.Price);
  }

  if (sort === "Rate") {
    filteredItems = filteredItems.sort((a, b) => b.rating - a.rating);
  } else if (sort === "New") {
    filteredItems = filteredItems.sort(
      (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-5 flex gap-6">
      <div className="w-1/5">
        <Shop_SideBar
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
          min={min}
          max={max}
          setMax={setMax}
          setMin={setMin}
          selectedRating={selectedRating}
          onRatingChange={setSelectedRating}
        />
      </div>

      <div className="w-4/5">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search products..."
            className="shop-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-400"
          >
            <option value={""}>Price</option>
            <option value={"Low to High"}>Low to High</option>
            <option value={"High to Low"}>High to Low</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-400"
          >
            <option value={""}>Sort By</option>
            <option value={"New"}>Newest</option>
            <option value={"Rate"}>Top Rated</option>
          </select>
          <ProfileIcon />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => <ItemCard key={item.id} item={item} />)
          ) : (
            <p>No Items Found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
