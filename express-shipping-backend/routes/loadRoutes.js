const express = require("express");
const router = express.Router();
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");
const {
  getMyLoads,
  deliverLoad,
  getActiveLoadsForAdmin,
  getDeliveredLoadsForAdmin,
} = require("../controllers/loadController");

// GET: All my loads (driver or shipper)
router.get("/", protect, getMyLoads);

// PUT: Mark load as delivered (driver only)
router.put("/:id/deliver", protect, authorizeRoles("driver"), deliverLoad);

// get the loads based on their status
router.get(
  "/admin/active",
  protect,
  authorizeRoles("admin"),
  getActiveLoadsForAdmin
);

router.get(
  "/admin/delivered",
  protect,
  authorizeRoles("admin"),
  getDeliveredLoadsForAdmin
);

module.exports = router;
