import Product from "../models/Product.js";

export const GetProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json({
      message: "✅ Products fetched successfully",
      count: products.length,
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
