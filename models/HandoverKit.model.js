// models/handoverKit.model.js
const mongoose = require("mongoose");

// Define the schema for the Handover Kit model
const handoverKitSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    items: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        // Add any additional fields for items if necessary
      },
    ],
    // Add any additional fields as needed
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create the model
const HandoverKit = mongoose.model("HandoverKit", handoverKitSchema);

module.exports = HandoverKit;
