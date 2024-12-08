const Class = require("../models/Class.js");

class ClassService {
  async getAllClasses() {
    return await Class.find().populate("teacher students");
  }

  async getClassById(classId) {
    return await Class.findById(classId).populate("teacher students");
  }

  async createClass(data) {
    const newClass = new Class(data);
    return await newClass.save();
  }

  async updateClass(classId, data) {
    return await Class.findByIdAndUpdate(classId, data, { new: true });
  }

  async deleteClass(classId) {
    return await Class.findByIdAndDelete(classId);
  }
}

module.exports = new ClassService();
