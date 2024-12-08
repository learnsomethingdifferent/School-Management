const Subject = require("../models/Subject.js");

class SubjectController {
  // Fetch all subjects
  async getSubjects(req, res) {
    try {
      const subjects = await Subject.find().populate("teacher class");
      res.status(200).json(subjects);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Fetch a subject by ID
  async getSubjectById(req, res) {
    try {
      const subjectId = req.params.id;
      const subject = await Subject.findById(subjectId).populate(
        "teacher class"
      );
      if (!subject) {
        return res.status(404).json({ message: "Subject not found" });
      }
      res.status(200).json(subject);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Create a new subject
  async createSubject(req, res) {
    try {
      const { name, description, teacher, classId } = req.body;
      const newSubject = new Subject({
        name,
        description,
        teacher,
        class: classId,
      });
      await newSubject.save();
      res
        .status(201)
        .json({ message: "Subject created successfully", subject: newSubject });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update a subject by ID
  async updateSubject(req, res) {
    try {
      const subjectId = req.params.id;
      const { name, description, teacher, classId } = req.body;
      const updatedSubject = await Subject.findByIdAndUpdate(
        subjectId,
        {
          name,
          description,
          teacher,
          class: classId,
        },
        { new: true }
      );
      if (!updatedSubject) {
        return res.status(404).json({ message: "Subject not found" });
      }
      res.status(200).json({
        message: "Subject updated successfully",
        subject: updatedSubject,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Delete a subject by ID
  async deleteSubject(req, res) {
    try {
      const subjectId = req.params.id;
      const deletedSubject = await Subject.findByIdAndDelete(subjectId);
      if (!deletedSubject) {
        return res.status(404).json({ message: "Subject not found" });
      }
      res.status(200).json({ message: "Subject deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new SubjectController();
