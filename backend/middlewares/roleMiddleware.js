class RoleMiddleware {
  checkRoles(allowedRoles) {
    return (req, res, next) => {
      const userRole = req.user.role; // Extracted from JWT
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: "Forbidden: Access denied" });
      }
      next();
    };
  }
}

module.exports = new RoleMiddleware();
