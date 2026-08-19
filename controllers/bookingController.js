const Booking = require('../models/Booking');
const Room = require('../models/Room');

// ==========================================
// CREATE BOOKING
// POST /api/bookings
// ==========================================
const createBooking = async (req, res) => {
  try {
    const {
      roomId,
      guestName,
      checkInDate,
      checkOutDate,
      totalAmount
    } = req.body;

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }

    const booking = await Booking.create({
      roomId,
      guestName,
      checkInDate,
      checkOutDate,
      totalAmount
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully!',
      data: booking
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// ==========================================
// GET BOOKING HISTORY
// GET /api/bookings
// ==========================================
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('roomId')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: bookings
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ==========================================
// CANCEL BOOKING
// PATCH /api/bookings/:id/cancel
// ==========================================
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.status === 'Cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Booking is already cancelled'
      });
    }

    booking.status = 'Cancelled';
    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Reservation cancelled successfully',
      data: booking
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
  createBooking,
  getBookings,
  cancelBooking
};