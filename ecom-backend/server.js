import express from "express";
import dotenv from "dotenv";

dotenv.config();
import ConnectDb from "./config/db.js";
import cors from "cors";
import AuthRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
ConnectDb();

app.use("/api/auth", AuthRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
