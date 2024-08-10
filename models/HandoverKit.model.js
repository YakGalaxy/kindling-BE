const mongoose = require("mongoose");

const contentItemSchema = new mongoose.Schema(
  {
    type: { type: String, required: true }, // e.g., "title", "description", "paragraph"
    value: { type: String, required: true },
  },
  { timestamps: true }
); // Add timestamps here if needed for individual content items

const handoverKitSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    contentItems: [contentItemSchema], // Array of content items
  },
  { timestamps: true }
); // Add timestamps to the main schema

const HandoverKit = mongoose.model("HandoverKit", handoverKitSchema);

module.exports = HandoverKit;
