import express from "express";
import { protect } from "../middleware/authMiddleWare.js";
import { GetProducts, GetProductById } from "../controllers/shopController.js";
const router = express.Router();

router.get("/products", GetProducts);
router.get("/product/:id", GetProductById);

export default router;
