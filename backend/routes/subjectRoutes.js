const express = require("express");
const subjectController = require("../controllers/subjectController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");
const roleMiddleware = require("../middlewares/roleMiddleware.js");

const router = express.Router();

// Fetch all subjects
router.get(
  "/",
  authMiddleware.authenticate,
  roleMiddleware.checkRoles(["Admin"]),
  subjectController.getSubjects
);

// Fetch a subject by ID
router.get(
  "/:id",
  authMiddleware.authenticate,
  roleMiddleware.checkRoles(["Admin"]),
  subjectController.getSubjectById
);

// Create a new subject
router.post(
  "/create",
  authMiddleware.authenticate,
  roleMiddleware.checkRoles(["Admin"]),
  subjectController.createSubject
);

// Update a subject
router.put(
  "/:id",
  authMiddleware.authenticate,
  roleMiddleware.checkRoles(["Admin"]),
  subjectController.updateSubject
);

// Delete a subject
router.delete(
  "/:id",
  authMiddleware.authenticate,
  roleMiddleware.checkRoles(["Admin"]),
  subjectController.deleteSubject
);

module.exports = router;
