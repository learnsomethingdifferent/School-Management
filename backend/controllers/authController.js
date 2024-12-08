const { registrationSchema } = require("../utils/inputValidators.js");
const { ErrorHandler } = require("../middlewares/errorHandler.js");
const AuthService = require("../services/authService.js");

class AuthController {
  async register(req, res, next) {
    try {
      // Validate request body
      const { error } = registrationSchema.validate(req.body);
      if (error) {
        throw new ErrorHandler(400, error.details[0].message);
      }

      // Call service to register user
      const newUser = await AuthService.register(req.body, req.file);

      // Send response
      res.status(201).json({
        success: true,
        message: "User registered successfully.",
        data: {
          id: newUser._id,
          email: newUser.email,
          fullName: newUser.fullName,
          role: newUser.role,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new ErrorHandler(400, "Email and password are required");
      }

      // Use AuthService here (uppercase and consistent)
      const result = await AuthService.login(email, password);

      // Send response
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req, res) {
    try {
      const { id } = req.user;
      const profile = await AuthService.getProfile(id);
      return res.status(200).json({ profile });
    } catch (error) {
      return res
        .status(error.statusCode || 500)
        .json({ message: error.message });
    }
  }

  // Logout - invalidate the JWT token (store it in Redis)
  async logout(req, res) {
    try {
      // Inform the client to delete the token
      res.status(200).json({
        message: "Logout successful. Please remove the token from your client.",
      });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong during logout." });
    }
  }

  // Forgot password - generate OTP
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      await AuthService.forgotPassword(email);
      return res.status(200).json({ message: "OTP sent to email" });
    } catch (error) {
      return res
        .status(error.statusCode || 500)
        .json({ message: error.message });
    }
  }

  // Reset password - validate OTP and reset the password
  async resetPassword(req, res) {
    try {
      const { email, otp, newPassword } = req.body;
      await AuthService.resetPassword(email, otp, newPassword);
      return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
      return res
        .status(error.statusCode || 500)
        .json({ message: error.message });
    }
  }
}

module.exports = new AuthController();
