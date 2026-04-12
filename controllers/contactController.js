import Contact from "../models/Contact.js";

export const submitContact = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      queryType,
      subject,
      message,
    } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ success: false, message: "Valid name is required" });
    }
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "A valid email is required" });
    }
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({ success: false, message: "Valid message is required" });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      company,
      queryType,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      data: contact,
    });
  } catch (error) {
    console.error("Contact submission error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};