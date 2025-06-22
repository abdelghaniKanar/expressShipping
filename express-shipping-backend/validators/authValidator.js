const { check } = require("express-validator");

// Validation rules for user registration
exports.registerValidation = [
  check("firstName", "First name is required").not().isEmpty(),
  check("lastName", "Last name is required").not().isEmpty(),
  check("email", "Valid email is required").isEmail(),
  check("phone", "Phone number is required").not().isEmpty(),
  check("password", "Password must be 6+ characters").isLength({ min: 6 }),
  check("role", "Role must be either driver or shipper").isIn([
    "driver",
    "shipper",
  ]),
];
