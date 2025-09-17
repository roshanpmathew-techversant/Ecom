import express from "express";
import {
  registerUser,
  loginUser,
  userProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleWare.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", registerUser);
router.get("/profile", protect, userProfile);

export default router;
