import express from "express";
import Contact from "../models/Contact.js";
import Newsletter from "../models/newsletter.model.js";

const router = express.Router();

// Simple token-based auth middleware
const adminAuth = (req, res, next) => {
  const token = req.headers["x-admin-token"];
  if (token !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

// GET /api/admin/stats
router.get("/stats", adminAuth, async (req, res) => {
  try {
    const [totalContacts, totalSubscribers, recentContacts] = await Promise.all([
      Contact.countDocuments(),
      Newsletter.countDocuments(),
      Contact.find().sort({ createdAt: -1 }).limit(5).select("name email queryType createdAt"),
    ]);

    res.json({
      totalContacts,
      totalSubscribers,
      recentContacts,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/admin/contacts
router.get("/contacts", adminAuth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/admin/subscribers
router.get("/subscribers", adminAuth, async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/admin/contacts/:id
router.delete("/contacts/:id", adminAuth, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/admin/subscribers/:id
router.delete("/subscribers/:id", adminAuth, async (req, res) => {
  try {
    await Newsletter.findByIdAndDelete(req.params.id);
    res.json({ message: "Subscriber deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
