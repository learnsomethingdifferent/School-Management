const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const EmailService = require("../config/email");
const { ErrorHandler } = require("../middlewares/errorHandler.js");

class AuthService {
  async register(userDetails, file) {
    const { email, password, fullName, role } = userDetails;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ErrorHandler(400, "User already exists");
    }

    // Restrict multiple admins
    if (userDetails.role === "Admin") {
      const existingAdmin = await User.findOne({ role: "Admin" });
      if (existingAdmin) {
        throw new Error("Only one admin is allowed in the system.");
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate custom unique ID
    const fullNameParts = fullName.split(" ");
    const firstLetter = fullNameParts[0]?.charAt(0).toUpperCase() || "";
    const lastLetter =
      fullNameParts[fullNameParts.length - 1]?.charAt(0).toUpperCase() || "";
    const randomNumber = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit random number
    const roleLetter = role.charAt(0).toUpperCase();
    const uniqueId = `${firstLetter}${lastLetter}${randomNumber}${roleLetter}`;

    // Save the user
    const newUser = await User.create({
      ...userDetails,
      password: hashedPassword,
      uniqueId,
      image: file ? file.path : null,
    });

    // Send registration email
    const emailText = `
Dear ${newUser.fullName},,

We are delighted to welcome you to Future Mind Global Secondary School. Your registration has been successfully completed, and you are now part of our growing community. Below are your login credentials and unique ID for accessing our system:

- Your Email: ${newUser.email}
- Your Password: ${userDetails.password}  

To access your account and explore our school management platform, please log in using the following link:  
www.futuremindglobalsecondaryschool.com


Important Information:
1. Please do not share your login credentials with anyone.  
2. For security purposes, it is recommended to change your password after the first login.

If you have any questions or face any issues, feel free to contact our support team at support@futuremindglobalsecondaryschool.com.

Thank you for choosing Future Mind Global Secondary School. We are committed to providing you with the best experience.

Warm regards,  
Future Mind Global Secondary School 
www.futuremindglobalsecondaryschool.com
    `;
    await EmailService.sendEmail(
      newUser.email,
      "Registration Successful",
      emailText
    );

    return newUser;
  }

  async login(email, password) {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new ErrorHandler(400, "Invalid email or password");
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new ErrorHandler(400, "Invalid email or password");
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return {
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        fullName: user.fullName,
      },
    };
  }

  async getProfile(userId) {
    const user = await User.findById(userId);

    if (!user) {
      throw new ErrorHandler(404, "User not found");
    }
    return user;
  }

  // Forgot password - Generate OTP and send to user's email
  async forgotPassword(email) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new ErrorHandler(404, "User not found");
    }

    const otp = Math.floor(1000 + Math.random() * 9000); // Generate 4-digit OTP
    user.otp = otp.toString();
    await user.save();

    // Send OTP to user's email
    await EmailService.sendEmail(
      user.email,
      "Password Reset OTP",
      `Your password reset OTP is: ${otp}`
    );
  }

  // Reset password - Validate OTP and reset password
  async resetPassword(email, otp, newPassword) {
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp) {
      throw new ErrorHandler(400, "Invalid OTP or user");
    }

    // Hash the new password and save it
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otp = null; // Clear OTP after successful reset
    await user.save();
  }
}

module.exports = new AuthService();
