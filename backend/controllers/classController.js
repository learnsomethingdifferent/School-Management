const Class = require("../models/Class.js");

class ClassController {
  // Fetch all classes
  async getClasses(req, res) {
    try {
      const classes = await Class.find().populate("teacher students");
      res.status(200).json(classes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Fetch a class by ID
  async getClassById(req, res) {
    try {
      const classId = req.params.id;
      const classData = await Class.findById(classId).populate(
        "teacher students"
      );
      if (!classData) {
        return res.status(404).json({ message: "Class not found" });
      }
      res.status(200).json(classData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Create a new class
  async createClass(req, res) {
    try {
      const { name, section, teacher, students } = req.body;
      const newClass = new Class({ name, section, teacher, students });
      await newClass.save();
      res
        .status(201)
        .json({ message: "Class created successfully", class: newClass });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update a class by ID
  async updateClass(req, res) {
    try {
      const classId = req.params.id;
      const { name, section, teacher, students } = req.body;
      const updatedClass = await Class.findByIdAndUpdate(
        classId,
        {
          name,
          section,
          teacher,
          students,
        },
        { new: true }
      );
      if (!updatedClass) {
        return res.status(404).json({ message: "Class not found" });
      }
      res
        .status(200)
        .json({ message: "Class updated successfully", class: updatedClass });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Delete a class by ID
  async deleteClass(req, res) {
    try {
      const classId = req.params.id;
      const deletedClass = await Class.findByIdAndDelete(classId);
      if (!deletedClass) {
        return res.status(404).json({ message: "Class not found" });
      }
      res.status(200).json({ message: "Class deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ClassController();
