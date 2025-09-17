import jwt from "jsonwebtoken";

const JWT = process.env.JWT_SECRET;
const generateToken = (id, status) => {
  return jwt.sign({ id, status }, JWT, { expiresIn: "7d" });
};

export default generateToken;
