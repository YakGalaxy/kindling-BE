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
      default: "", // Default empty string
    },
    preferences: {
      theme: {
        type: String,
        enum: ["light", "dark"],
        default: "light",
      },
      // Additional preferences can be added here
      notifications: {
        type: Boolean,
        default: true,
      },
    },
    // Example additional field
    profilePicture: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create the model
const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
