const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    departure: {
      type: String,
      required: true,
    },
    waypoints: [String],
    destination: {
      type: String,
      required: true,
    },
    vehicleType: {
      type: String,
      required: true,
    },
    goodsType: {
      type: String,
      required: true,
    },
    maxDimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    capacity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Announcement", announcementSchema);
