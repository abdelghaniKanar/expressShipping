const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { getMyLoads } = require("../controllers/loadController");

// GET /api/loads
router.get("/", protect, getMyLoads);

module.exports = router;
