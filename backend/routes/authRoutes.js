const express = require("express");
const AuthController = require("../controllers/authController.js");
const AuthMiddleware = require("../middlewares/authMiddleware.js");
const RequestValidator = require("../utils/requesValidator.js");
const InputValidator = require("../utils/inputValidators.js");
const upload = require("../middlewares/uploader.js");

const router = express.Router();

// Registration route
router.post("/register", upload.single("image"), AuthController.register);
router.post(
  "/login",
  RequestValidator.validateBody(InputValidator.loginSchema),
  AuthController.login
);

router.get("/profile", AuthMiddleware.authenticate, AuthController.getProfile);

router.post("/logout", AuthMiddleware.authenticate, AuthController.logout);

// Forgot password route
router.post(
  "/forgot-password",
  RequestValidator.validateBody(InputValidator.forgotPasswordSchema),
  AuthController.forgotPassword
);

// Reset password route (requires OTP)
router.post(
  "/reset-password",
  RequestValidator.validateBody(InputValidator.resetPasswordSchema),
  AuthController.resetPassword
);

module.exports = router;
