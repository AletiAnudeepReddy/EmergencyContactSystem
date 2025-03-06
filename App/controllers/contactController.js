const Contact = require('../models/Contact');

// Create Contact
exports.createContact = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        const { name, phone, priority, category } = req.body;

        if (!name || !phone || !priority || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newContact = new Contact({
            userId: req.user.userId,
            name,
            phone,
            priority,
            category
        });

        await newContact.save();
        console.log("Contact Saved:", newContact);
        res.status(201).json({ message: "Contact added successfully", contact: newContact });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error adding contact", error });
    }
};


// Get Contacts
exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({ userId: req.user.userId });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching contacts", error });
    }
};

// Delete Contact by Name
exports.deleteContact = async (req, res) => {
    try {
        const { name } = req.body;
        const deletedContact = await Contact.findOneAndDelete({ userId: req.user.userId, name });

        if (!deletedContact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        res.json({ message: "Contact deleted successfully", contact: deletedContact });
    } catch (error) {
        res.status(500).json({ message: "Error deleting contact", error });
    }
};

// Update Contact by Old Name
exports.updateContact = async (req, res) => {
    try {
        const { oldName, newName, phone, priority, category } = req.body; // Include category

        const updatedContact = await Contact.findOneAndUpdate(
            { userId: req.user.userId, name: oldName },
            { name: newName, phone, priority, category }, // Update category as well
            { new: true } // Return updated contact
        );

        if (!updatedContact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        res.json({ message: "Contact updated successfully", contact: updatedContact });
    } catch (error) {
        res.status(500).json({ message: "Error updating contact", error });
    }
};
