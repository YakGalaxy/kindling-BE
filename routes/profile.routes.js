const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile.model"); // Adjust path if needed
const { isAuthenticated } = require("../middleware/jwt.middleware"); // Import JWT middleware

// CREATE a new profile (protected route)
router.post("/profiles", isAuthenticated, async (req, res) => {
  try {
    const { user, bio, preferences } = req.body;
    const profile = new Profile({ user, bio, preferences });
    await profile.save();
    res.status(201).json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all profiles (protected route)
router.get("/profiles", isAuthenticated, async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user");
    res.status(200).json(profiles);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ a specific profile (protected route)
router.get("/profiles/:id", isAuthenticated, async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id).populate("user");
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.status(200).json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE a profile (protected route)
router.put("/profiles/:id", isAuthenticated, async (req, res) => {
  try {
    const { bio, preferences } = req.body;
    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      { bio, preferences },
      { new: true }
    );
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.status(200).json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a profile (protected route)
router.delete("/profiles/:id", isAuthenticated, async (req, res) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
