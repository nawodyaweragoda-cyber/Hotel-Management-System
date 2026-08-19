const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

// ==========================================
// 1. MIDDLEWARES SETUP
// ==========================================
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/api/payments', paymentRoutes);
// ==========================================
// 2. MONGODB CONNECTION SETUP
// ==========================================
const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hotel_db';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully');
  })
  .catch((error) => {
    console.error('❌ MongoDB Connection Error:', error.message);
  });

// ==========================================
// 3. API ROUTES
// ==========================================

// Room APIs
app.use('/api/rooms', roomRoutes);

// Booking APIs
app.use('/api/bookings', bookingRoutes);

// ==========================================
// 4. BASIC HOME ROUTE
// ==========================================
app.get('/', (req, res) => {
  res.redirect('/rooms.html');
});

// ==========================================
// 5. 404 API HANDLER
// ==========================================
app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found'
  });
});

// ==========================================
// 6. START SERVER
// ==========================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('\n==================================================');
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('==================================================');
  console.log(
    `🔗 Interface 1 (All Rooms):      http://localhost:${PORT}/rooms.html`
  );
  console.log(
    `🔗 Interface 2 (Room Details):   http://localhost:${PORT}/room-details.html`
  );
  console.log(
    `🔗 Interface 3 (Create Booking): http://localhost:${PORT}/create-booking.html`
  );
  console.log(
    `🔗 Booking API:                  http://localhost:${PORT}/api/bookings`
  );
  console.log('==================================================\n');
});