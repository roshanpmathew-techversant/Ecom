import { items } from "./items.js";

import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_DB_STRING;

mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerce")
  .then(async () => {
    console.log("MongoDB connected");

    await Product.deleteMany(); // clear old
    await Product.insertMany(items); // insert new
    console.log("Sample products inserted ✅");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
