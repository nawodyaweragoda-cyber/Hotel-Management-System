const express = require('express');
const router = express.Router();
const { createBooking } = require('../controllers/bookingController');
const checkApiKey = require('../middleware/apiKey');

// API Key එක ආරක්ෂාව සඳහා එකතු කර ඇත
router.post('/', checkApiKey, createBooking); // POST /api/bookings

module.exports = router;