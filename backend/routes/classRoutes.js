const express = require("express");
const classController = require("../controllers/classController");
const authMiddleware = require("../middlewares/authMiddleware.js");
const roleMiddleware = require("../middlewares/roleMiddleware.js");
const InputValidator = require("../utils/inputValidators.js");
const RequestValidator = require("../utils/requesValidator.js");

const router = express.Router();

// Fetch all classes
router.get(
  "/",
  authMiddleware.authenticate,

  roleMiddleware.checkRoles(["Admin"]),
  classController.getClasses
);

// Fetch a class by ID
router.get(
  "/:id",
  authMiddleware.authenticate,
  roleMiddleware.checkRoles(["Admin"]),
  classController.getClassById
);

// Create a new class
router.post(
  "/create",
  authMiddleware.authenticate,
  roleMiddleware.checkRoles(["Admin"]),
  RequestValidator.validateBody(InputValidator.classSchema),
  classController.createClass
);

// Update a class
router.put(
  "/:id",
  authMiddleware.authenticate,
  roleMiddleware.checkRoles(["Admin"]),
  classController.updateClass
);

// Delete a class
router.delete(
  "/:id",
  authMiddleware.authenticate,
  roleMiddleware.checkRoles(["Admin"]),
  classController.deleteClass
);

module.exports = router;
