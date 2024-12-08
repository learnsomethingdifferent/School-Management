const jwt = require("jsonwebtoken");

class AuthMiddleware {
  async authenticate(req, res, next) {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");
      if (!token) {
        return res.status(401).json({ message: "Unauthorized: Token missing" });
      }

      // Verify JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next(); // Proceed to next middleware or controller
    } catch (error) {
      console.error("JWT Verification Error:", error.message);
      res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  }
}

module.exports = new AuthMiddleware();
