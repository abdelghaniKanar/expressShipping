const express = require("express");
const {
  getAllRequestsAdmin,
  deleteRequest,
  createRequest,
  getDriverRequests,
  respondToRequest,
  getMyRequests,
} = require("../controllers/requestController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

const router = express.Router();

// POST /api/requests — shipper sends a request
router.post("/", protect, authorizeRoles("shipper"), createRequest);

// driver gets requests for their announcement
router.get(
  "/my-requests",
  protect,
  authorizeRoles("driver"),
  getDriverRequests
);

// driver accepts or rejects a request
router.put("/:id/respond", protect, authorizeRoles("driver"), respondToRequest);

// shipper gets all their requests
router.get(
  "/my-requests/shipper",
  protect,
  authorizeRoles("shipper"),
  getMyRequests
);

// Admin routes
router.get("/admin", protect, authorizeRoles("admin"), getAllRequestsAdmin);

// one universal route
router.delete("/:id", protect, deleteRequest);

module.exports = router;
