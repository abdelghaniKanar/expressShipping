const express = require("express");
const { createRequest } = require("../controllers/requestController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

const router = express.Router();

// POST /api/requests — shipper sends a request
router.post("/", protect, authorizeRoles("shipper"), createRequest);

module.exports = router;
