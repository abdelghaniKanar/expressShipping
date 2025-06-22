const express = require("express");
const { createReview } = require("../controllers/reviewController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

const router = express.Router();

// POST /api/reviews/:loadId
router.post("/:loadId", protect, authorizeRoles("shipper"), createReview);

module.exports = router;
