const Booking = require('../models/Booking');
const Room = require('../models/Room');

// @desc    Create a new booking
// @route   POST /api/bookings
exports.createBooking = async (req, res) => {
  try {
    const { roomId, guestName, checkInDate, checkOutDate, totalAmount } = req.body;

    // 1. Room එකක් තිබේදැයි පරීක්ෂා කිරීම (Validation)
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    // 2. Booking එක සෑදීම
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
    res.status(400).json({ success: false, message: error.message });
  }
};