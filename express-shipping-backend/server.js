const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const { protect, authorizeRoles } = require("./middlewares/authMiddleware");

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
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// announcement routes
const announcementRoutes = require("./routes/announcementRoutes");
app.use("/api/announcements", announcementRoutes);

// request routes
const requestRoutes = require("./routes/requestRoutes");
app.use("/api/requests", requestRoutes);

// load routes
const loadRoutes = require("./routes/loadRoutes");
app.use("/api/loads", loadRoutes);

// review routes
const reviewRoutes = require("./routes/reviewRoutes");
app.use("/api/reviews", reviewRoutes);

// user routes
// user
const userSelfRoutes = require("./routes/userSelfRoutes");
app.use("/api/users", userSelfRoutes);
// admin
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// role test route
app.get("/", protect, authorizeRoles("shipper"), (req, res) => {
  res.json({
    message: `Hello ${req.user.firstName}, only shippers can see this.`,
  });
});

// email test
app.use("/api/test", require("./routes/testRoutes"));

// Start the server on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
