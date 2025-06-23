const express = require("express");
const {
  updateMyProfile,
  deleteMyAccount,
} = require("../controllers/userSelfController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(protect);

router.put("/profile", updateMyProfile);
router.delete("/profile", deleteMyAccount);

module.exports = router;
