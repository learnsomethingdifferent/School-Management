const Joi = require("joi");

const registrationSchema = Joi.object({
  fullName: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
  role: Joi.string().valid("Admin", "Teacher", "Student").required(),
  dob: Joi.date().optional(),
  address: Joi.string().optional(),
  phone: Joi.number().optional(),
  country: Joi.string().optional(),
  nationality: Joi.string().optional(),
  parents: Joi.object({
    father: Joi.string().optional(),
    mother: Joi.string().optional(),
    parentsNumber: Joi.string().optional(),
  }).optional(),
});

// Validation schemas using Joi
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().length(4).required(),
  newPassword: Joi.string().min(6).required(),
});

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().email().required(),
  newPassword: Joi.string().min(6).required(),
});

const classSchema = Joi.object({
  name: Joi.string().required(),
  section: Joi.string().required(),
  teacher: Joi.string().required(),
  students: Joi.array().items(Joi.string()),
});

const subjectSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  teacher: Joi.string().required(),
  classId: Joi.string().required(),
});

module.exports = {
  registrationSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  classSchema,
  subjectSchema,
};
