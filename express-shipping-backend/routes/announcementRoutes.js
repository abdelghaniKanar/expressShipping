const express = require("express");
const {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  getAllAnnouncementsAdmin,
  deleteAnnouncement,
} = require("../controllers/announcementController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

const router = express.Router();

// Create announcement (only for drivers)
router.post("/", protect, authorizeRoles("driver"), createAnnouncement);

// GET all active announcements (shippers and others)
router.get("/", protect, getAllAnnouncements);

// Admin-only routes
router.get(
  "/admin",
  protect,
  authorizeRoles("admin"),
  getAllAnnouncementsAdmin
);
router.delete("/:id", protect, deleteAnnouncement);

// Get one announcement by ID
router.get("/:id", protect, getAnnouncementById);

module.exports = router;
