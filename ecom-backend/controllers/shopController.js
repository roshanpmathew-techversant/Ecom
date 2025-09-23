import { Query } from "mongoose";
import Product from "../models/Product.js";
import mongoose from "mongoose";

export const GetProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      min,
      max,
      sort,
      rating,
      page = 1,
      limit = 8,
    } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { ProductName: { $regex: search, $options: "i" } },
        { ProductDesc: { $regex: search, $options: "i" } },
      ];
    }

    let categoriesArray = [];
    if (category) {
      if (Array.isArray(category)) categoriesArray = category;
      else if (typeof category === "string")
        categoriesArray = category.split(",");
    }
    if (categoriesArray.length > 0) {
      query.Category = {
        $in: categoriesArray.map((c) => new RegExp(`^${c}$`, "i")),
      };
    }

    if (min || max) {
      query.Price = {};
      if (min) query.Price.$gte = Number(min);
      if (max) query.Price.$lte = Number(max);
    }

    if (rating) {
      query.rating = { $gte: Number(rating) };
    }

    let sortOption = {};
    if (sort === "price_asc") sortOption = { Price: 1 };
    else if (sort === "price_desc") sortOption = { Price: -1 };
    else if (sort === "rating") sortOption = { rating: -1 };
    else if (sort === "new") sortOption = { createdAt: -1 };

    const skip = (Number(page) - 1) * Number(limit);

    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.status(200).json({
      message: "✅ Products fetched successfully",
      total,
      page: Number(page),
      limit: Number(limit),
      hasMore: skip + products.length < total,
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: "❌ Failed to fetch products",
      error: error.message,
    });
  }
};

export const GetProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ id });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "✅ Product fetched successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "❌ Failed to fetch product",
      error: error.message,
    });
  }
};

export const GetProduct = async (req, res) => {
  try {
    let { id } = req.params; // use let
    id = id.trim(); // remove extra spaces/newlines

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "✅ Product fetched successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "❌ Failed to fetch product",
      error: error.message,
    });
  }
};
