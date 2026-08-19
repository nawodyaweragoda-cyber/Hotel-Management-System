const express = require('express');
const router = express.Router();

const {
  createPayment,
  getPayments,
  getPayHereHash
} = require('../controllers/paymentController');

router.get('/', getPayments);

router.post('/', createPayment);

router.post('/payhere-hash', getPayHereHash);

module.exports = router;