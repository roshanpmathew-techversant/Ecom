import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: [true, "Id is required"],
      unique: true, // Better to avoid duplicate product IDs
    },
    ProductName: {
      type: String,
      required: [true, "Name is required"],
      trim: true, // removes extra spaces
    },
    ProductDesc: {
      type: String,
      required: [true, "Description is required"], // added message
      trim: true,
    },
    Image: {
      type: String,
      required: [true, "Image URL is required"],
    },
    Price: {
      type: Number,
      required: [true, "Price is Required"],
    },
    Category: {
      type: String,
      required: [true, "Category is required"],
    },
    rating: {
      type: Number,
      default: () => Math.round(Math.random() * 50) / 10, // 0.0 - 5.0
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot be more than 5"],
    },
    stock: {
      type: Number,
      required: false,
    },
    offers: {
      type: Number,
      required: false,
      max: [100, "Offers cannot be more than 100%"],
      min: [0, "Offers cannot be less than 0"],
      default: 0,
    },

    offerPrice: {
      type: Number,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
productSchema.pre("save", function (next) {
  if (this.offers && this.Price) {
    this.offerPrice = Math.round(this.Price - (this.Price * this.offers) / 100);
  } else {
    this.offerPrice = Math.round(this.Price);
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
