const mongoose = require("mongoose");

const MeetingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: null },
    date: { type: Date, required: true },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }, // Teachers and Parents
    ],
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      default: null,
    }, // Optional, linked to a specific class
  },
  { timestamps: true }
);

module.exports = mongoose.model("Meeting", MeetingSchema);
