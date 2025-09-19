import express from "express";
import { admin, protect } from "../middleware/authMiddleWare.js";
import {
  AddProduct,
  DeleteProduct,
  UpdateProduct,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/product", protect, admin, AddProduct);

router.delete("/product/:id", protect, admin, DeleteProduct);

router.put("/product/:id", protect, admin, UpdateProduct);

export default router;
