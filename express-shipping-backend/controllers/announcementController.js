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

// Get all available announcements with filters For shipper use
const getAllAnnouncements = async (req, res) => {
  try {
    const { destination, vehicleType, goodsType, minPrice, maxPrice } =
      req.query;

    const query = { isActive: true };

    if (destination) query.destination = destination;
    if (vehicleType) query.vehicleType = vehicleType;
    if (goodsType) query.goodsType = goodsType;
    if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) };
    if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };

    const announcements = await Announcement.find(query).populate(
      "driver",
      "firstName lastName"
    );

    res.json(announcements);
  } catch (err) {
    console.error("Get announcements error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET one announcement by ID
const getAnnouncementById = async (req, res) => {
  try {
    const { id } = req.params;

    const announcement = await Announcement.findById(id).populate(
      "driver",
      "firstName lastName phone email"
    );

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.json(announcement);
  } catch (err) {
    console.error("Get announcement by ID error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// For admin: Get all announcements
const getAllAnnouncementsAdmin = async (req, res) => {
  try {
    const announcements = await Announcement.find().populate(
      "driver",
      "-password"
    );
    res.json(announcements);
  } catch (err) {
    console.error("Get all announcements error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin: Delete an announcement
const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const announcement = await Announcement.findById(id);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    // If user is not admin, check ownership
    if (
      user.role !== "admin" &&
      announcement.driver.toString() !== user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this announcement" });
    }

    await Announcement.findByIdAndDelete(id);
    res.json({ message: "Announcement deleted successfully" });
  } catch (err) {
    console.error("Delete announcement error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  getAllAnnouncementsAdmin,
  deleteAnnouncement,
};
