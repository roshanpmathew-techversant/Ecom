import React, { useState, useEffect, useRef } from "react";
import ItemCard from "../components/ItemCard";
import Shop_SideBar from "../components/Shop_SideBar";
import ProfileIcon from "../components/ProfileIcon";
import { getProducts } from "../services/api/services";
import InfiniteScroll from "react-infinite-scroll-component";

const Shop = () => {
  const categories = [
    "Electronics",
    "Clothes",
    "Food",
    "Home Appliances",
    "Sports & Fitness",
  ];

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [items, setItems] = useState([]);
  const [price, setPrice] = useState("");
  const [sort, setSort] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100000);
  const [selectedRating, setSelectedRating] = useState(null);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 8;

  const fetchMoreTimeout = useRef(null);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  const fetchProducts = async (reset = false) => {
    let sortParam = null;
    if (price === "Low to High") sortParam = "price_asc";
    else if (price === "High to Low") sortParam = "price_desc";
    else if (sort === "Rate") sortParam = "rating";
    else if (sort === "New") sortParam = "new";

    const product = await getProducts({
      search: debouncedSearch,
      category: selectedCategories.join(","),
      min,
      max,
      rating: selectedRating,
      sort: sortParam,
      page,
      limit,
    });

    if (reset) setItems(product.products);
    else setItems((prev) => [...prev, ...product.products]);

    setHasMore(product.hasMore);
  };

  useEffect(() => {
    setPage(1);
    setItems([]);
    fetchProducts(true);
  }, [
    debouncedSearch,
    selectedCategories,
    min,
    max,
    price,
    sort,
    selectedRating,
  ]);

  const fetchMore = () => {
    if (fetchMoreTimeout.current) return;

    fetchMoreTimeout.current = setTimeout(() => {
      setPage((prev) => prev + 1);
      fetchMoreTimeout.current = null;
    }, 1000);
  };

  useEffect(() => {
    if (page > 1) fetchProducts();
  }, [page]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-5 flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-1/5">
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

      <div className="w-full lg:w-4/5">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="🔍 Search products..."
            className="px-4 py-2 w-full sm:w-64 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex gap-3">
            <select
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 shadow-sm"
            >
              <option value={""}>Price</option>
              <option value={"Low to High"}>Low to High</option>
              <option value={"High to Low"}>High to Low</option>
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 shadow-sm"
            >
              <option value={""}>Sort By</option>
              <option value={"New"}>Newest</option>
              <option value={"Rate"}>Top Rated</option>
            </select>
          </div>

          <ProfileIcon />
        </div>

        <InfiniteScroll
          dataLength={items.length}
          next={fetchMore}
          hasMore={hasMore}
          loader={
            <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin mx-auto my-4"></div>
          }
          className="w-[100%] mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-[90%]">
            {items.length ? (
              items.map((item) => <ItemCard key={item._id} item={item} />)
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No Items Found
              </p>
            )}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Shop;
