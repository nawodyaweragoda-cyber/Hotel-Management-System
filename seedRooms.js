const mongoose = require('mongoose');
require('dotenv').config();

const Room = require('./models/Room');
const rooms = require('./rooms.json');

const seedRooms = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('✅ MongoDB Connected');

    await Room.deleteMany({});
    console.log('🗑️ Old room data cleared');

    await Room.insertMany(rooms);
    console.log('✅ Rooms imported successfully');

    process.exit();
  } catch (error) {
    console.error('❌ Import Error:', error.message);
    process.exit(1);
  }
};

seedRooms();