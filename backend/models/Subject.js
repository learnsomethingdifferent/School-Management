const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g., Mathematics
    description: { type: String, default: null },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Assigned teacher (linked with User schema)
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    }, // Linked class
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", SubjectSchema);
