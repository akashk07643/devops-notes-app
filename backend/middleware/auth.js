const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  // Get token from Authorization header (format: Bearer <token>)
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access Denied: No Token Provided" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || "supersecretkeyformynotesapp12345!");
    req.user = verified; // Contains id (userId), username, email
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or Expired Token" });
  }
};

module.exports = authenticateToken;
