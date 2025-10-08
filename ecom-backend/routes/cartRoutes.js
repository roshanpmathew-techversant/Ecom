import express from "express";
import {
  AddtoCart,
  RemoveItem,
  PlaceOrder,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleWare.js";

const router = express.Router();

router.post("/add/:id", protect, AddtoCart);
router.post("/remove/:id", protect, RemoveItem);
router.post("/placeorder", PlaceOrder);

export default router;
