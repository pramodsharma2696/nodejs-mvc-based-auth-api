const { check } = require("express-validator");

const registerValidation = [
  check("name").trim().notEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Must be a valid email"),
  check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  check("confirmPassword").custom((value, { req }) => value === req.body.password).withMessage("Passwords must match"),
];

const loginValidation = [
  check("email").isEmail().withMessage("Invalid email"),
  check("password").notEmpty().withMessage("Password is required"),
];

module.exports = { registerValidation, loginValidation };
