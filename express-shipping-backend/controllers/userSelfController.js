const User = require("../models/User");

// @desc    Update logged-in user's profile
// @route   PUT /api/users/profile
// @access  Private
const updateMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Update allowed fields
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.phone = req.body.phone || user.phone;

    const updatedUser = await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        phone: updatedUser.phone,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } catch (err) {
    console.error("Update profile error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete logged-in user's account
// @route   DELETE /api/users/profile
// @access  Private
const deleteMyAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("Delete profile error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  updateMyProfile,
  deleteMyAccount,
};
