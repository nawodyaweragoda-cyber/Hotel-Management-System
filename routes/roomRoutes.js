const express = require('express');
const router = express.Router();
const { getRooms, getRoomById } = require('../controllers/roomController');

router.get('/', getRooms);          // GET /api/rooms
router.get('/:id', getRoomById);    // GET /api/rooms/:id

module.exports = router;