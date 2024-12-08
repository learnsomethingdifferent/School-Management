const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    students: [
      {
        student: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Refers to the updated User schema
        status: {
          type: String,
          enum: ["Present", "Absent"],
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", AttendanceSchema);
