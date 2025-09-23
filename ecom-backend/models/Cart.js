import mongoose from "mongoose";
import Product from "./Product";

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: false,
    },
    quantity: {
      type: Number,
      required: false,
      min: 1,
      default: 1,
    },
  },
  { _id: false }
);

const CartItem = mongoose.model("CartItem", cartItemSchema);

export default CartItem;
