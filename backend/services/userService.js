const User = require("../models/User.js");
const { ErrorHandler } = require("../middlewares/errorHandler.js");

class UserService {
  // Fetch all users
  async getAllUsers() {
    const users = await User.find({}, "-password");
    return users;
  }

  // Fetch a user by ID or unique ID
  async getUserById(id) {
    const user = await User.findOne({
      $or: [{ _id: id }, { uniqueId: id }],
    });
    if (!user) {
      throw new ErrorHandler(404, "User not found");
    }
    return user;
  }

  // Update a user's information
  async updateUser(id, updatedData) {
    const user = await User.findOneAndUpdate(
      { $or: [{ _id: id }, { uniqueId: id }] },
      updatedData,
      { new: true, runValidators: true }
    );
    if (!user) {
      throw new ErrorHandler(404, "User not found");
    }
    return user;
  }

  // Delete a user
  async deleteUser(id) {
    const user = await User.findOneAndDelete({
      $or: [{ _id: id }, { uniqueId: id }],
    });
    if (!user) {
      throw new ErrorHandler(404, "User not found");
    }
  }
}

module.exports = new UserService();
