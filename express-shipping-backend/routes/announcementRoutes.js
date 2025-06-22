const express = require("express");
const { createAnnouncement } = require("../controllers/announcementController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

const router = express.Router();

// Create announcement (only for drivers)
router.post("/", protect, authorizeRoles("driver"), createAnnouncement);

module.exports = router;
