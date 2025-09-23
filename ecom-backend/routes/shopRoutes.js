import express from "express";
import { protect } from "../middleware/authMiddleWare.js";
import {
  GetProducts,
  GetProductById,
  GetProduct,
} from "../controllers/shopController.js";
const router = express.Router();

router.get("/products", GetProducts);
router.get("/product/:id", GetProductById);
router.get("/cartproduct/:id", GetProduct);

export default router;
