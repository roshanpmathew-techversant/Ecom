import express from "express";
import { admin, protect } from "../middleware/authMiddleWare.js";
import {
  AddProduct,
  DeleteProduct,
  UpdateProduct,
  ApplyOffer,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/product", protect, admin, AddProduct);

router.delete("/product/:id", protect, admin, DeleteProduct);

router.put("/product/:id", protect, admin, UpdateProduct);
router.put("/offer/:id", protect, admin, ApplyOffer);

export default router;
