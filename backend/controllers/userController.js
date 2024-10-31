const userModel = require('../models/User');
const { generatePassword } = require('../config/passwordUtils');

const userController = {
  createUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashPassword = generatePassword(password);
      console.log(hashPassword);

      // TODO:Check if user exists

      const user = await userModel.create({
        username,
        password_hash: hashPassword,
      });
      res.status(201).json({ ...user, success: 'User Created Successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await userModel.getAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await userModel.getById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const user = await userModel.update(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteBooking: async (req, res) => {
    try {
      const user = await userModel.delete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = userController;
