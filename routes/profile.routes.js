const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile.model");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// UPDATE a profile (protected route)
router.put("/:id", isAuthenticated, async (req, res) => {
  try {
    const { username, email, password, bio, preferences } = req.body;
    const profile = await Profile.findById(req.params.id);

    if (!profile) return res.status(404).json({ error: "Profile not found" });

    if (username || email || password) {
      const user = await User.findById(profile.user);

      if (username) user.username = username;
      if (email) user.email = email;
      if (password) user.password = await bcrypt.hash(password, 10); // Hash new password

      await user.save();
    }

    profile.bio = bio || profile.bio;
    profile.preferences = preferences || profile.preferences;
    await profile.save();

    res.status(200).json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
