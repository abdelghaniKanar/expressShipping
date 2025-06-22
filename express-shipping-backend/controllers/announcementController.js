const Announcement = require("../models/Announcement");

// Create a new announcement
const createAnnouncement = async (req, res) => {
  try {
    // Prevent multiple active announcements
    const existing = await Announcement.findOne({
      driver: req.user._id,
      isActive: true,
    });
    if (existing) {
      return res
        .status(400)
        .json({ message: "You already have an active announcement" });
    }

    const announcement = new Announcement({
      driver: req.user._id,
      ...req.body,
    });

    await announcement.save();
    res.status(201).json(announcement);
  } catch (err) {
    console.error("Create announcement error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createAnnouncement };
