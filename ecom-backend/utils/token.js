import jwt from "jsonwebtoken";

const JWT = process.env.JWT_SECRET;
const REFRESH = process.env.REFRESH_SECRET;
const generateToken = (id, status) => {
  return jwt.sign({ id, status }, JWT, { expiresIn: "10m" });
};

export const generateRefreshToken = (id, status) => {
  return jwt.sign({ id, status }, REFRESH, { expiresIn: "7d" });
};

export default generateToken;
