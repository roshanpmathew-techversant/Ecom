import express from "express";
import {
  registerUser,
  loginUser,
  userProfile,
  logoutUser,
} from "../controllers/authController.js";
import { protect, refreshAccessToken } from "../middleware/authMiddleWare.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", registerUser);
router.get("/profile", protect, userProfile);
router.post("/logout", logoutUser);
router.post("/refresh", refreshAccessToken);

export default router;
