const Review = require("../models/Review");
const Load = require("../models/Load");

// Create review (shipper only, after delivery)
const createReview = async (req, res) => {
  try {
    const { loadId } = req.params;
    const { rating, comment } = req.body;

    const load = await Load.findById(loadId);

    if (!load) {
      return res.status(404).json({ message: "Load not found" });
    }

    if (String(load.shipper) !== String(req.user._id)) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (load.status !== "delivered") {
      return res.status(400).json({ message: "Load not delivered yet" });
    }

    const existingReview = await Review.findOne({ load: loadId });
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "Review already submitted for this load" });
    }

    const newReview = new Review({
      load: loadId,
      shipper: req.user._id,
      driver: load.driver,
      rating,
      comment,
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    console.error("Create review error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createReview };
