const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile.model");
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// GET a profile by ID (protected route)
router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id).populate("user");
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.status(200).json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE a profile (protected route)
router.put("/:id", isAuthenticated, async (req, res) => {
  try {
    const { username, email, password, bio, preferences } = req.body;
    const profile = await Profile.findById(req.params.id);

    if (!profile) return res.status(404).json({ error: "Profile not found" });

    // Handle updates to the User model
    if (username || email || password) {
      const user = await User.findById(profile.user);
      if (!user) return res.status(404).json({ error: "User not found" });

      if (username) user.username = username;
      if (email) user.email = email;
      if (password) user.password = await bcrypt.hash(password, 10); // Hash new password

      await user.save();
    }

    // Handle updates to the Profile model
    profile.bio = bio || profile.bio;
    profile.preferences = preferences || profile.preferences;
    await profile.save();

    res.status(200).json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
