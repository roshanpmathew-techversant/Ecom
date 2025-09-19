import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import ConnectDb from "./config/db.js";
import cors from "cors";
import AuthRoutes from "./routes/authRoutes.js";
import AdminRoutes from "./routes/adminRoutes.js";
import ShopRoutes from "./routes/shopRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true, // allow sending cookies
  })
);
app.use(cookieParser());
app.use(express.json());
ConnectDb();

app.use("/api/auth", AuthRoutes);
app.use("/api/admin", AdminRoutes);
app.use("/api/shop", ShopRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
