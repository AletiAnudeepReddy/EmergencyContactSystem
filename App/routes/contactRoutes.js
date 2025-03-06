const express = require('express');
const { createContact, getContacts, deleteContact, updateContact } = require('../controllers/contactController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', authMiddleware, createContact);
router.get('/', authMiddleware, getContacts);
router.delete('/delete', authMiddleware, deleteContact);
router.put('/update', authMiddleware, updateContact);

module.exports = router;
