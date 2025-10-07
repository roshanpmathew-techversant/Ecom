import jwt from "jsonwebtoken";
import User from "../models/User.js";
import generateToken from "../utils/token.js";
const JWT = process.env.JWT_SECRET;
const REFRESH = process.env.REFRESH_SECRET;

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
      if (e.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }
      res.status(401).json({ message: "Invalid token" });
    }
  } else {
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

export const refreshAccessToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(401).json({
      message: "No Refresh Token",
    });
  try {
    const decoded = jwt.verify(refreshToken, REFRESH);
    const newAccessToken = generateToken(decoded.id, decoded.status);

    /*}console.log(
      "New Access Token Generated at: ",
      new Date().toLocaleTimeString()
    );*/

    res.json({
      accessToken: newAccessToken,
    });
  } catch (e) {
    res.status(403).json({
      message: "Invalid Refresh Token",
    });
  }
};

export { protect, admin };
