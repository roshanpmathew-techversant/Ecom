import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Add a Username"],
    },

    email: {
      type: String,
      required: [true, "Add an email"],
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
