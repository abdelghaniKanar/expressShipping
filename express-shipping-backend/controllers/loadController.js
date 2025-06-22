const Load = require("../models/Load");

// Get loads for current user (driver or shipper)
const getMyLoads = async (req, res) => {
  try {
    const filter =
      req.user.role === "driver"
        ? { driver: req.user._id }
        : { shipper: req.user._id };

    const loads = await Load.find(filter)
      .populate("announcement")
      .populate("request");

    res.json(loads);
  } catch (err) {
    console.error("Get loads error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getMyLoads };
