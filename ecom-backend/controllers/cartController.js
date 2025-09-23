import User from "../models/User.js";
import Product from "../models/Product.js";

export const AddtoCart = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const Cartproduct = await Product.findOne({ id: Number(id) });
    if (!Cartproduct) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }

    const existingItem = user.cart.find(
      (item) => item.product.toString() === Cartproduct._id.toString()
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cart.push({
        product: Cartproduct._id,
        quantity: 1,
      });
    }

    await user.save();

    const updatedUser = await User.findById(userId).populate("cart.product");
    res.status(200).json({ cart: updatedUser.cart });
  } catch (e) {
    console.log("Error Adding to Cart", e);
    res.status(500).json({ message: "Server error" });
  }
};

export const RemoveItem = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const Cartproduct = await Product.findOne({ id: Number(id) });
    if (!Cartproduct) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }

    const existingItem = user.cart.find(
      (item) => item.product.toString() === Cartproduct._id.toString()
    );

    if (!existingItem) {
      return res.status(404).json({ message: "Item not in cart" });
    }

    if (existingItem.quantity > 1) {
      existingItem.quantity -= 1;
    } else {
      user.cart = user.cart.filter(
        (item) => item.product.toString() !== Cartproduct._id.toString()
      );
    }

    await user.save();

    const updatedUser = await User.findById(userId).populate("cart.product");
    res.status(200).json({ cart: updatedUser.cart });
  } catch (e) {
    console.log("Error Removing from Cart", e);
    res.status(500).json({ message: "Server error" });
  }
};

export const PlaceOrder = async (req, res) => {};
