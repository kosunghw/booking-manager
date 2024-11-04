const roomModel = require('../models/Room');

const roomController = {
  createRoom: async (req, res) => {
    try {
      console.log('createRoom HIT!');
      const { roomNumber } = req.body;
      const userId = req.user.user_id;

      console.log('Creating room:', { roomNumber, userId });

      const room = await roomModel.create({
        roomNumber,
        userId,
      });
      res.status(201).json({ ...room, success: 'Room Created Successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllRooms: async (req, res) => {
    try {
      const rooms = await roomModel.getAll();
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getRoomByUserId: async (req, res) => {
    try {
      const rooms = await roomModel.getById(req.user.user_id);
      if (!rooms) {
        return res.status(404).json({ message: 'Room not found' });
      }
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // TODO: updateRoom

  // TODO: deleteRoom
  deleteRoom: async (req, res) => {
    try {
      const room = await roomModel.delete(req.params.roomId);
      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }
      res.json(room);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = roomController;
