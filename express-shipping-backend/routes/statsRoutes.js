const express = require("express");
const router = express.Router();
const { getAdminStats } = require("../controllers/statsController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

// Only admin can access this route
router.get("/", protect, authorizeRoles("admin"), getAdminStats);

module.exports = router;
