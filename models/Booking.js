const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },

  guestName: {
    type: String,
    required: true
  },

  checkInDate: {
    type: Date,
    required: true
  },

  checkOutDate: {
    type: Date,
    required: true
  },

  totalAmount: {
    type: Number,
    required: true
  },

status: {
  type: String,
  enum: ['Confirmed', 'Cancelled'],
  default: 'Confirmed'
}
  

}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);