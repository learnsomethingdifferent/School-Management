const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");
const roleMiddleware = require("../middlewares/roleMiddleware.js");
const RequestValidator = require("../utils/requesValidator.js");

// Fetch all users
router.get(
  "/",
  authMiddleware.authenticate,
  roleMiddleware.checkRoles(["Admin"]),
  userController.getAllUsers
);

// Fetch a user by ID or unique ID
router.get(
  "/:id",
  authMiddleware.authenticate,
  roleMiddleware.checkRoles(["Admin"]),

  userController.getUserById
);

// Update a user's information
router.put(
  "/:id",
  authMiddleware.authenticate,
  roleMiddleware.checkRoles(["Admin"]),
  userController.updateUser
);

// Delete a user
router.delete(
  "/:id",
  authMiddleware.authenticate,
  roleMiddleware.checkRoles(["Admin"]),
  userController.deleteUser
);

module.exports = router;
