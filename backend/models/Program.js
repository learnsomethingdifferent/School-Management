const mongoose = require("mongoose");

const ProgramSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g., Annual Day
    type: {
      type: String,
      enum: ["Program", "Exam", "Notice"],
      required: true,
    }, // Type of program
    date: { type: Date, required: true },
    description: { type: String, default: null },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }, // Teachers, Students, Parents
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Program", ProgramSchema);
