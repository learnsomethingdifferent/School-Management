const Subject = require("../models/Subject.js");

class SubjectService {
  async getAllSubjects() {
    return await Subject.find().populate("teacher class");
  }

  async getSubjectById(subjectId) {
    return await Subject.findById(subjectId).populate("teacher class");
  }

  async createSubject(data) {
    const newSubject = new Subject(data);
    return await newSubject.save();
  }

  async updateSubject(subjectId, data) {
    return await Subject.findByIdAndUpdate(subjectId, data, { new: true });
  }

  async deleteSubject(subjectId) {
    return await Subject.findByIdAndDelete(subjectId);
  }
}

module.exports = new SubjectService();
