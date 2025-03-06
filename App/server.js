require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

app.use(express.json());
app.use(cors()); // Enable CORS to allow frontend requests

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
