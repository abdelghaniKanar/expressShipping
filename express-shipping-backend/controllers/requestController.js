const Request = require("../models/Request");
const Announcement = require("../models/Announcement");
const Load = require("../models/Load");
const transporter = require("../config/mailer");

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

    const request = await Request.findById(id)
      .populate("announcement")
      .populate("shipper"); // Populate shipper to get email

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
        shipper: request.shipper._id,
        announcement: request.announcement._id,
        request: request._id,
      });

      await newLoad.save();
    }

    // Send email notification to shipper
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: request.shipper.email,
      subject: `Your Shipping Request has been ${request.status}`,
      text: `Hello ${request.shipper.firstName},\n\nYour request for the announcement "${request.announcement._id}" has been ${request.status} by the driver.`,
    });

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

// Admin: Get all shipping requests
const getAllRequestsAdmin = async (req, res) => {
  try {
    const requests = await Request.find()
      .populate("shipper", "firstName lastName email")
      .populate("announcement");
    res.json(requests);
  } catch (err) {
    console.error("Get all requests error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const request = await Request.findById(id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Admin can delete any, Shipper only their own
    if (
      user.role !== "admin" &&
      request.shipper.toString() !== user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this request" });
    }

    await Request.findByIdAndDelete(id);
    res.json({ message: "Request deleted successfully" });
  } catch (err) {
    console.error("Delete request error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllRequestsAdmin,
  deleteRequest,
  createRequest,
  getDriverRequests,
  respondToRequest,
  getMyRequests,
};
