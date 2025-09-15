const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_DB_STRING; // Change as needed
app.use(express.json());

const Con = mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

if (!Con) {
  console.error("❌ Failed to connect to MongoDB. Exiting...");
}

app.get("/", (req, res) => {
  res.send("E-commerce backend server is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
