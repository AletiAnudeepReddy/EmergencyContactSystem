const express = require('express');
const { createContact, getContacts } = require('../controllers/contactController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', authMiddleware, createContact);
router.get('/', authMiddleware, getContacts);

module.exports = router;
