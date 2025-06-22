const User = require("../models/User");

// Get all users
// const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find().select("-password");
//     res.json(users);
//   } catch (err) {
//     console.error("Get users error:", err.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// Get all users (only drivers and shippers)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      role: { $in: ["driver", "shipper"] },
    }).select("-password");
    res.json(users);
  } catch (err) {
    console.error("Get users error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Block or unblock a user
const toggleBlockUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.json({
      message: `User has been ${user.isBlocked ? "blocked" : "unblocked"}.`,
      user,
    });
  } catch (err) {
    console.error("Block/unblock user error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete user error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Mark user as verified
const verifyUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isVerified = true;
    await user.save();

    res.json({ message: "User verified successfully", user });
  } catch (err) {
    console.error("Verify user error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllUsers,
  toggleBlockUser,
  deleteUser,
  verifyUser,
};
