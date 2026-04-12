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

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required",
      });
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