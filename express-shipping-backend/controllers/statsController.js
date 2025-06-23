const User = require("../models/User");
const Announcement = require("../models/Announcement");
const Request = require("../models/Request");
const Load = require("../models/Load");

// Admin statistics controller
const getAdminStats = async (req, res) => {
  try {
    // Total users by role
    const totalDrivers = await User.countDocuments({ role: "driver" });
    const totalShippers = await User.countDocuments({ role: "shipper" });

    // Total announcements
    const totalAnnouncements = await Announcement.countDocuments();

    // Total requests and acceptance rate
    const totalRequests = await Request.countDocuments();
    const acceptedRequests = await Request.countDocuments({
      status: "accepted",
    });
    const acceptanceRate =
      totalRequests > 0 ? (acceptedRequests / totalRequests) * 100 : 0;

    // Load counts
    const totalLoads = await Load.countDocuments();
    const deliveredLoads = await Load.countDocuments({ status: "delivered" });
    const activeLoads = await Load.countDocuments({ status: "active" });

    res.json({
      totalDrivers,
      totalShippers,
      totalUsers: totalDrivers + totalShippers,
      totalAnnouncements,
      totalRequests,
      acceptedRequests,
      acceptanceRate: acceptanceRate.toFixed(2),
      totalLoads,
      deliveredLoads,
      activeLoads,
    });
  } catch (err) {
    console.error("Get stats error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAdminStats };
