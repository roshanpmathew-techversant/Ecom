import Product from "../models/Product.js";

export const AddProduct = async (req, res) => {
  try {
    const {
      id,
      ProductName,
      ProductDesc,
      Image,
      Price,
      Category,
      rating,
      stock,
    } = req.body;

    const product = new Product({
      id,
      ProductName,
      ProductDesc,
      Image,
      Price,
      Category,
      rating,
      stock,
    });

    await product.save();

    res.status(201).json({
      message: "✅ Product added successfully",
      product,
    });
  } catch (error) {
    res.status(400).json({
      message: "❌ Failed to add product",
      error: error.message,
    });
  }
};

export const UpdateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { ProductName, ProductDesc, Image, Price, Category, rating, stock } =
      req.body;
    const updatedProduct = await Product.findOneAndUpdate(
      { id },
      { ProductName, ProductDesc, Image, Price, Category, rating, stock },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "⚠️ Product not found" });
    }

    res.status(200).json({
      message: "✅ Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: "❌ Failed to update product",
      error: error.message,
    });
  }
};

export const DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findOneAndDelete({ id });

    if (!deletedProduct) {
      return res.status(404).json({ message: "⚠️ Product not found" });
    }

    res.status(200).json({
      message: "🗑️ Product deleted successfully",
      deletedProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: "❌ Failed to delete product",
      error: error.message,
    });
  }
};

export const ApplyOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const { offers } = req.body;

    const OfferApply = await Product.findOne({ id });

    if (!OfferApply) {
      return res.status(404).json({ message: "⚠️ Product not found" });
    }
    OfferApply.offers = offers;
    await OfferApply.save();
    res.status(200).json({
      message: "✅ Offer Applied successfully",
      OfferApply,
    });
  } catch (error) {
    res.status(400).json({
      message: "❌ Failed to Apply Offer",
      error: error.message,
    });
  }
};
