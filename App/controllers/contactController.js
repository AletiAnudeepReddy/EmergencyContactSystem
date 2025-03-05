const Contact = require('../models/Contact');

exports.createContact = async (req, res) => {
    try {
        const { name, phone, email } = req.body;
        const newContact = new Contact({
            userId: req.user.userId, // Get userId from decoded JWT token
            name,
            phone,
            email
        });

        await newContact.save();
        res.status(201).json({ message: "Contact added successfully", contact: newContact });

    } catch (error) {
        res.status(500).json({ message: "Error adding contact", error });
    }
};
exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({ userId: req.user.userId });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching contacts", error });
    }
};
