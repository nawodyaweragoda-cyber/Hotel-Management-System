const Payment = require('../models/Payment');
const Booking = require('../models/Booking');
const crypto = require('crypto');

// ==========================================
// PAYHERE HASH
// POST /api/payments/payhere-hash
// ==========================================
const getPayHereHash = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId)
      .populate('roomId');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.status === 'Cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Cannot pay for a cancelled booking'
      });
    }

    const merchantId = process.env.PAYHERE_MERCHANT_ID;
    const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET;

    if (!merchantId || !merchantSecret) {
      return res.status(500).json({
        success: false,
        message: 'PayHere configuration missing'
      });
    }

    const orderId = `BOOKING-${booking._id}`;
    const amount = Number(booking.totalAmount).toFixed(2);
    const currency = 'LKR';

    const hashedSecret = crypto
      .createHash('md5')
      .update(merchantSecret)
      .digest('hex')
      .toUpperCase();

    const hash = crypto
      .createHash('md5')
      .update(
        merchantId +
        orderId +
        amount +
        currency +
        hashedSecret
      )
      .digest('hex')
      .toUpperCase();

    res.status(200).json({
      success: true,
      data: {
        merchantId,
        orderId,
        amount,
        currency,
        hash,
        booking
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ==========================================
// CREATE PAYMENT
// POST /api/payments
// ==========================================
const createPayment = async (req, res) => {
  try {
    const {
      bookingId,
      paymentMethod
    } = req.body;

    if (!bookingId || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Booking ID and payment method are required'
      });
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.status === 'Cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Cannot pay for a cancelled booking'
      });
    }

    const existingPayment = await Payment.findOne({
      bookingId,
      paymentStatus: 'Paid'
    });

    if (existingPayment) {
      return res.status(400).json({
        success: false,
        message: 'This booking has already been paid'
      });
    }

    const payment = await Payment.create({
      bookingId,
      amount: booking.totalAmount,
      paymentMethod,
      paymentStatus: 'Paid'
    });

    res.status(201).json({
      success: true,
      message: 'Payment processed successfully!',
      data: payment
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ==========================================
// GET PAYMENTS
// GET /api/payments
// ==========================================
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate({
        path: 'bookingId',
        populate: {
          path: 'roomId'
        }
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: payments
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ==========================================
// EXPORT CONTROLLERS
// ==========================================
module.exports = {
  createPayment,
  getPayments,
  getPayHereHash
};