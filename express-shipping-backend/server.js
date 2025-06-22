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

// add the auth  route
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Protected route accessible only by driver
app.get("/", protect, authorizeRoles("driver"), (req, res) => {
  res.json({
    message: `Hello ${req.user.firstName}, only drivers can see this.`,
  });
});

// Start the server on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
