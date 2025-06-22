const express = require("express");
const { register } = require("../controllers/authController");
const { registerValidation } = require("../validators/authValidator");
const { validationResult } = require("express-validator");

const router = express.Router();

// Register route with validation middleware
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

module.exports = router;
