const express = require("express");
const { register, login } = require("../controllers/authController");
const { registerValidation } = require("../validators/authValidator");
const { check, validationResult } = require("express-validator");

const router = express.Router();

// Route for registration
router.post(
  "/register",
  registerValidation,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
  register
);

// Route for login
router.post(
  "/login",
  [
    check("email", "Valid email is required").isEmail(),
    check("password", "Password is required").exists(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
  login
);

module.exports = router;
