import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_DB_STRING;

const ConnectDb = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (e) {
    console.error("Error Connecting to DB", e);
    process.exit(1);
  }
};

export default ConnectDb;
