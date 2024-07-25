// Import Required Modules
const dotenv = require("dotenv");
const express = require("express");
const { isAuthenticated } = require("./middleware/jwt.middleware");

// Load Environment Variables
dotenv.config();

// Connect to the Database
require("./db");

// Initialize Express Application
const app = express();

// Load Configuration and Middleware
require("./config")(app);

// Define Routes
const allRoutes = require("./routes");
app.use("/api", allRoutes);

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

// Set Up Error Handling
require("./error-handling")(app);

// Export the Application
module.exports = app;
