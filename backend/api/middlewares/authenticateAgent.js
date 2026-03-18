const jwt = require("jsonwebtoken");

class AuthMiddleware {

  static checkAgent = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log(decoded)
      if (decoded.role !== "agent") {
        return res.status(403).json({ message: "Forbidden: Not an agent" });
      }
      req.user = decoded; // Attach dealer ID to request object
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  }
}


module.exports = AuthMiddleware;
