import jwt from "jsonwebtoken";
import User from "../models/User.js";
const JWT = process.env.JWT_SECRET;

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decode = jwt.verify(token, JWT);

      req.user = await User.findById(decode.id).select("-password");
      next();
    } catch (e) {
      console.log("Auth Error");
      res.status(401).json({ message: "Not Authorized" });
    }
  }
  if (!token) {
    return res.status(401).json({ message: "No Token, Not Authorized" });
  }
};

const admin = async (req, res, next) => {
  if (req.user && req.user.status === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin Access Only" });
  }
};

export { protect, admin };
