const express = require("express");
const router = express.Router();
const HandoverKit = require("../models/HandoverKit.model");
const { isAuthenticated } = require("../middleware/jwt.middleware"); // Import JWT middleware

// CREATE a new handover kit (protected route)
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const { title, description, items } = req.body;
    const handoverKit = new HandoverKit({ title, description, items });
    await handoverKit.save();
    res.status(201).json(handoverKit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all handover kits (protected route)
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const handoverKits = await HandoverKit.find();
    res.status(200).json(handoverKits);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ a specific handover kit (protected route)
router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    const handoverKit = await HandoverKit.findById(req.params.id);
    if (!handoverKit)
      return res.status(404).json({ error: "Handover kit not found" });
    res.status(200).json(handoverKit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE a handover kit (protected route)
router.put("/:id", isAuthenticated, async (req, res) => {
  try {
    const { title, description, items } = req.body;
    const handoverKit = await HandoverKit.findByIdAndUpdate(
      req.params.id,
      { title, description, items },
      { new: true }
    );
    if (!handoverKit)
      return res.status(404).json({ error: "Handover kit not found" });
    res.status(200).json(handoverKit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a handover kit (protected route)
router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    const handoverKit = await HandoverKit.findByIdAndDelete(req.params.id);
    if (!handoverKit)
      return res.status(404).json({ error: "Handover kit not found" });
    res.status(200).json({ message: "Handover kit deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
