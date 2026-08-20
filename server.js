const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();

// ==========================================
// 1. MIDDLEWARES SETUP
// ==========================================
app.use(cors()); // CORS Policy Fix
app.use(express.json()); // Parse JSON bodies
app.use(express.static('public')); // Serve frontend files inside 'public' folder

// ==========================================
// 2. MONGODB CONNECTION SETUP
// ==========================================
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hotel_db';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// ==========================================
// 3. MONGOOSE SCHEMAS & MODELS
// ==========================================
const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true },
  type: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true }
});

const bookingSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  guestName: { type: String, required: true },
  checkInDate: { type: String, required: true },
  checkOutDate: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Room = mongoose.model('Room', roomSchema);
const Booking = mongoose.model('Booking', bookingSchema);

// ==========================================
// 4. API KEY SECURITY MIDDLEWARE
// ==========================================
const verifyApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const validApiKey = process.env.API_KEY || 'hotel_secret_key_123';

  if (!apiKey || apiKey !== validApiKey) {
    return res.status(401).json({
      success: false,
      message: 'Access Denied: Invalid or Missing API Key'
    });
  }
  next();
};

// ==========================================
// 5. API ROUTES
// ==========================================

// API 1: Get All Rooms (GET)
app.get('/api/rooms', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json({ success: true, data: rooms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// API 2: Get Single Room Details (GET by ID)
app.get('/api/rooms/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }
    res.json({ success: true, data: room });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid Room ID format' });
  }
});

// API 3: Create Booking (POST - Protected with API Key)
app.post('/api/bookings', verifyApiKey, async (req, res) => {
  try {
    const { roomId, guestName, checkInDate, checkOutDate, totalAmount } = req.body;

    if (!roomId || !guestName || !checkInDate || !checkOutDate || !totalAmount) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    const newBooking = new Booking({
      roomId,
      guestName,
      checkInDate,
      checkOutDate,
      totalAmount
    });

    await newBooking.save();

    res.status(201).json({
      success: true,
      message: 'Booking created successfully!',
      data: newBooking
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// 6. START SERVER & PRINT TERMINAL LINKS
// ==========================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`==================================================`);
  console.log(`🔗 Interface 1 (All Rooms):      http://localhost:${PORT}/rooms.html`);
  console.log(`🔗 Interface 2 (Room Details):   http://localhost:${PORT}/room-details.html`);
  console.log(`🔗 Interface 3 (Create Booking): http://localhost:${PORT}/create-booking.html`);
  console.log(`==================================================\n`);
});
