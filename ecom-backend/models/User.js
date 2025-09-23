import mongoose from "mongoose";
import bcrypt from "bcrypt";

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      min: 1,
      default: 1,
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Add a Username"],
    },
    email: {
      type: String,
      required: [true, "Add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Add a Password"],
    },
    status: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    cart: [cartItemSchema],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (EnteredPassword) {
  return await bcrypt.compare(EnteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
