// models/profile.model.js
const mongoose = require("mongoose");

// Define the schema for the Profile model
const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    preferences: {
      theme: {
        type: String,
        enum: ["light", "dark"],
        default: "light",
      },
      // Add any additional preference fields as needed
    },
    // Add any additional fields as needed
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create the model
const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
