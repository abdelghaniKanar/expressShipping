const Request = require("../models/Request");
const Announcement = require("../models/Announcement");
const Load = require("../models/Load");

// Create a shipping request
const createRequest = async (req, res) => {
  try {
    const { announcement, goodsType, dimensions, quantity, endpoint, message } =
      req.body;

    const newRequest = new Request({
      shipper: req.user._id,
      announcement,
      goodsType,
      dimensions,
      quantity,
      endpoint,
      message,
    });

    await newRequest.save();

    res.status(201).json(newRequest);
  } catch (err) {
    console.error("Create request error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all requests for the driver's announcement
const getDriverRequests = async (req, res) => {
  try {
    const announcement = await Announcement.findOne({
      driver: req.user._id,
      isActive: true,
    });

    if (!announcement) {
      return res.status(404).json({ message: "No active announcement found" });
    }

    const requests = await Request.find({
      announcement: announcement._id,
    }).populate("shipper", "firstName lastName email");

    res.json(requests);
  } catch (err) {
    console.error("Get driver requests error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Accept or reject a request
const respondToRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body;

    const request = await Request.findById(id).populate("announcement");

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (String(request.announcement.driver) !== String(req.user._id)) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!["accept", "reject"].includes(action)) {
      return res.status(400).json({ message: "Invalid action" });
    }

    request.status = action === "accept" ? "accepted" : "rejected";
    await request.save();

    // If accepted -- create Load
    if (action === "accept") {
      const existingLoad = await Load.findOne({
        driver: req.user._id,
        status: "active",
      });
      if (existingLoad) {
        return res
          .status(400)
          .json({ message: "Driver already has an active load" });
      }

      const newLoad = new Load({
        driver: req.user._id,
        shipper: request.shipper,
        announcement: request.announcement._id,
        request: request._id,
      });

      await newLoad.save();
    }

    res.json({ message: `Request has been ${request.status}.`, request });
  } catch (err) {
    console.error("Respond to request error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Shipper sees all their own requests
const getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({ shipper: req.user._id })
      .populate("announcement")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    console.error("Get my requests error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createRequest,
  getDriverRequests,
  respondToRequest,
  getMyRequests,
};
