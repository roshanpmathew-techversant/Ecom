import User from "../models/User.js";
import generateToken from "../utils/token.js";
import { generateRefreshToken } from "../utils/token.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });

    if (user) {
      const accessToken = generateToken(user._id, user.status);
      const refreshToken = generateRefreshToken(user._id, user.status);

      // Set refresh token as httpOnly cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, // true in production with HTTPS
        sameSite: "strict",
      });

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        status: user.status,
        token: accessToken, // frontend stores this in localStorage
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (e) {
    res.status(500).json({ message: "Error creating user", error: e.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const accessToken = generateToken(user._id, user.status);
      const refreshToken = generateRefreshToken(user._id, user.status);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        status: user.status,
        token: accessToken,
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error logging in user", error: e.message });
  }
};

export const userProfile = async (req, res) => {
  return res.json(req.user);
};
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging out user", error: error.message });
  }
};
