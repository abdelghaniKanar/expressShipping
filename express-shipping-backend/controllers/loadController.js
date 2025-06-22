const Load = require("../models/Load");

// Get loads for current user
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

// Mark a load as delivered (driver only)
const deliverLoad = async (req, res) => {
  try {
    const { id } = req.params;

    const load = await Load.findById(id);

    if (!load) {
      return res.status(404).json({ message: "Load not found" });
    }

    if (String(load.driver) !== String(req.user._id)) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (load.status === "delivered") {
      return res
        .status(400)
        .json({ message: "Load already marked as delivered" });
    }

    load.status = "delivered";
    await load.save();

    res.json({ message: "Load marked as delivered", load });
  } catch (err) {
    console.error("Deliver load error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getMyLoads,
  deliverLoad,
};
