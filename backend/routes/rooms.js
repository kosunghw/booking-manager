const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const passport = require('passport');
const isAuth = require('../middleware/auth');

router.get('/', (req, res) => {
  res.send('ROOM ROUTER');
});

// create a new room (POST)
router.post('/', isAuth, roomController.createRoom);

router.get('/my-rooms', isAuth, roomController.getRoomByUserId);

router.delete('/:roomId', isAuth, roomController.deleteRoom);

module.exports = router;
