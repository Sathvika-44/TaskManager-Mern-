import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract Bearer token

  if (!token) {
    console.log("❌ No token provided");
    return res.status(401).json({ message: "Unauthorized: No token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("❌ Token verification failed:", err.message);
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
    
    console.log("✅ Authenticated User:", decoded); // Log decoded user
    req.user = decoded;  // Expecting flat payload: { userId, name, ... }
    next();
  });
};

export default authMiddleware;
