const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    uniqueId: {
      type: String,
      required: true,
      unique: true, // Custom unique ID for each user
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },

    dob: {
      type: Date,
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default: null,
    },
    nationality: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    otp: {
      type: String,
      default: null,
    },
    parents: {
      father: { type: String, default: null },
      parentsNumber: { type: Number, default: null },
      mother: { type: String, default: null },
    },
    role: {
      type: String,
      enum: ["Admin", "Teacher", "Student"],
      required: true,
    },
    // Role-specific fields
    teacherDetails: {
      schedule: [
        {
          day: { type: String, required: true }, // e.g., Sunday, Monday
          class: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class",
            required: true,
          }, // e.g., Grade-3
          period: { type: String, required: true }, // e.g., 1st period, 3rd period
          subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
            required: true,
          }, // e.g., English, Mathematics
          startTime: { type: String, required: true }, // e.g., 8:00 AM
          endTime: { type: String, required: true }, // e.g., 8:45 AM
        },
      ],
    },
    studentDetails: {
      class: { type: mongoose.Schema.Types.ObjectId, ref: "Class" }, // Class the student belongs to
      roleNumber: { type: Number, default: null }, // Roll/Role number within the class
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
