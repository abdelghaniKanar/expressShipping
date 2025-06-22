const Request = require("../models/Request");

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

module.exports = { createRequest };
