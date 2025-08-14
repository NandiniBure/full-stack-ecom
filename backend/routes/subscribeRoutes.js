const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscribes");

// @route   POST /api/subscribe
// @desc    Handle newsletter subscription
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    let existing = await Subscriber.findOne({ email });
    if (existing) {
      res.status(400).json({ message: "Email is already subscribed" });
      
    }

    const subscribe = new Subscriber({ email });
    await subscribe.save();

    return res.status(201).json({
      message: "Successfully subscribed to the newsletter"
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
