const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String }
});

module.exports = mongoose.model('Contact', contactSchema);
