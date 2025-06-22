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

//Get all available announcements with filters
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

module.exports = {
  createAnnouncement,
  getAllAnnouncements,
};
