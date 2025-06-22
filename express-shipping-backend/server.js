const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const { protect, authorizeRoles } = require("./middlewares/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const announcementRoutes = require("./routes/announcementRoutes");

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Create an Express app
const app = express();

// Middleware to handle CORS
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// auth route
app.use("/api/auth", authRoutes);

//  announcements routes
app.use("/api/announcements", announcementRoutes);

// role test route
app.get("/", protect, authorizeRoles("shipper"), (req, res) => {
  res.json({
    message: `Hello ${req.user.firstName}, only shippers can see this.`,
  });
});

// Start the server on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
