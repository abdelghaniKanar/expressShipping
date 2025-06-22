const express = require("express");
const router = express.Router();
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");
const { getMyLoads, deliverLoad } = require("../controllers/loadController");

// GET: All my loads (driver or shipper)
router.get("/", protect, getMyLoads);

// PUT: Mark load as delivered (driver only)
router.put("/:id/deliver", protect, authorizeRoles("driver"), deliverLoad);

module.exports = router;
