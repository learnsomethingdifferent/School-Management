const userService = require("../services/userService");
const mongoose = require("mongoose");
const User = require("../models/User.js");

class UserController {
  // Fetch all users
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json({ message: "Users fetched successfully", users });
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  // Fetch a user by ID or unique ID
  async getUserById(req, res) {
    try {
      const { id } = req.params;

      let user;

      // Check if the ID is a valid MongoDB ObjectId
      if (mongoose.Types.ObjectId.isValid(id)) {
        // Fetch by MongoDB ObjectId
        user = await User.findById(id);
      } else {
        // Fetch by unique ID
        user = await User.findOne({ uniqueId: id });
      }

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update a user's information
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      const updatedUser = await userService.updateUser(id, updatedData);
      res
        .status(200)
        .json({ message: "User updated successfully", updatedUser });
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  // Delete a user
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await userService.deleteUser(id);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
}

module.exports = new UserController();
