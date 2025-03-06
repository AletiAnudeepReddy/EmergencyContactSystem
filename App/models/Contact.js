const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
    name: { type: String, required: true },
    phone: { type: String, required: true },
    priority: { type: Number, default: 0 }, // Default priority set to 0
    category: { type: String, enum: ['Friends', 'Family', 'Others'], required: true } // Category must be one of these values
});

module.exports = mongoose.model('Contact', contactSchema);
