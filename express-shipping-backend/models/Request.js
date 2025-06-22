const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    shipper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    announcement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Announcement",
      required: true,
    },
    goodsType: {
      type: String,
      required: true,
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    quantity: {
      type: Number,
      required: true,
    },
    endpoint: {
      type: String,
      required: true,
    },
    message: String,
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Request", requestSchema);
