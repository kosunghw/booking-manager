const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const verifyToken = require('../middleware/jwtAuth');

router.get('/', (req, res) => {
  res.send('ROOM ROUTER');
});

// create a new room (POST)
router.post('/', verifyToken, roomController.createRoom);

router.get('/my-rooms', verifyToken, roomController.getRoomByUserId);

router.delete('/:roomId', verifyToken, roomController.deleteRoom);

module.exports = router;
