const Room = require('../models/Room');

// @desc    Get all available rooms
// @route   GET /api/rooms
exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json({ success: true, count: rooms.length, data: rooms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single room details by ID
// @route   GET /api/rooms/:id
exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    res.status(200).json({ success: true, data: room });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid Room ID format' });
  }
};