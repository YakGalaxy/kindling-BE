const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile.model"); // Adjust path if needed

// CREATE a new profile
router.post("/profiles", async (req, res) => {
  try {
    const { user, bio, preferences } = req.body;
    const profile = new Profile({ user, bio, preferences });
    await profile.save();
    res.status(201).json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all profiles
router.get("/profiles", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user");
    res.status(200).json(profiles);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ a specific profile
router.get("/profiles/:id", async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id).populate("user");
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.status(200).json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE a profile
router.put("/profiles/:id", async (req, res) => {
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

// DELETE a profile
router.delete("/profiles/:id", async (req, res) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
