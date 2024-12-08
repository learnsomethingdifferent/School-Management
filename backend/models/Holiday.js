const mongoose = require("mongoose");

const HolidaySchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g., Winter Break
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    description: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Holiday", HolidaySchema);
