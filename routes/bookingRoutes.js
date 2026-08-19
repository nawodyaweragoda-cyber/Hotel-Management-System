const express = require('express');
const router = express.Router();

const {
  createBooking,
  getBookings,
  cancelBooking
} = require('../controllers/bookingController');

const checkApiKey = require('../middleware/apiKey');

router.get('/', getBookings);

router.post('/', checkApiKey, createBooking);

router.patch('/:id/cancel', cancelBooking);

module.exports = router;