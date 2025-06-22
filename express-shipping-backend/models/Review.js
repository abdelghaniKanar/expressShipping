const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    load: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Load",
      required: true,
      unique: true, // one review per load
    },
    shipper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      maxlength: 300,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
