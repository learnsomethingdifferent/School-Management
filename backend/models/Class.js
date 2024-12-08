const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g., Grade 10
    section: { type: String, required: true }, // e.g., A
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Assigned teacher
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ], // List of students
  },
  { timestamps: true }
);

module.exports = mongoose.model("Class", ClassSchema);
