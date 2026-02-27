import Newsletter from "../models/newsletter.model.js";

export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    // Basic validation
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Check if already exists
    const existing = await Newsletter.findOne({ email });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Email already subscribed",
      });
    }

    const newSubscriber = await Newsletter.create({ email });

    res.status(201).json({
      success: true,
      message: "Subscribed successfully 🎉",
      data: newSubscriber,
    });
  } catch (error) {
    console.error("Newsletter Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};