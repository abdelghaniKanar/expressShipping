const express = require("express");
const {
  getAllUsers,
  toggleBlockUser,
  deleteUser,
  verifyUser,
} = require("../controllers/userController");

const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

const router = express.Router();

// All these routes are restricted to ADMIN
router.use(protect, authorizeRoles("admin"));

router.get("/", getAllUsers);
router.put("/:id/block", toggleBlockUser);
router.put("/:id/verify", verifyUser);
router.delete("/:id", deleteUser);

module.exports = router;
