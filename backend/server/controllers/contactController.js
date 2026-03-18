import Contact from "../models/Contact.js";

export const createContactMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email and message are required" });
    }

    const contact = await Contact.create({ name, email, message });
    return res.status(201).json({ message: "Message sent successfully", contactId: contact._id });
  } catch (error) {
    next(error);
  }
};
