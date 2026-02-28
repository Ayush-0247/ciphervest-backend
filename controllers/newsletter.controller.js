import Newsletter from "../models/newsletter.model.js";

export const subscribeNewsletter = async (req, res) => {
  try {
    const email = req.body?.email;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if already exists
    const existing = await Newsletter.findOne({ email });

    if (existing) {
      return res.status(400).json({ message: "Already subscribed" });
    }

    // Create new subscriber
    const newSubscriber = await Newsletter.create({ email });

    res.status(201).json({
      message: "Subscribed successfully",
      data: newSubscriber,
    });

  } catch (error) {
    console.error("Newsletter error:", error);
    res.status(500).json({ message: "Server error" });
  }
};