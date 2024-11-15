const express = require('express');
const { getContants, createContants, updateContact, deleteContacts } = require('../controllers/contactController');

const router = express.Router();

router.route('/').get(getContants).post(createContants).put(updateContact).delete(deleteContacts);

module.exports = router;
