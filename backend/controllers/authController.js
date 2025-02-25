const jwt = require('jsonwebtoken');
const { generatePassword, validPassword } = require('../config/passwordUtils');
const userModel = require('../models/User');

const authController = {
  register: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Check if user exists
      const existingUser = await userModel.getByName(username);
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      const hashPassword = generatePassword(password);

      const user = await userModel.create({
        username,
        password_hash: hashPassword,
      });

      // Remove sensitive data before sending the response
      const { password_hash, ...userWithoutPassword } = user;

      res.status(201).json({
        message: 'User created successfully',
        user: userWithoutPassword,
      });
    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({ message: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Find user in database
      const user = await userModel.getByName(username);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Verify password
      const isPasswordValid = validPassword(password, user.password_hash);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.user_id, username: user.username },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      );

      // Remove sensitive data from user object
      const { password_hash, ...userWithoutPassword } = user;

      res.status(200).json({
        message: 'Login successful',
        user: userWithoutPassword,
        token,
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: error.message });
    }
  },

  // This function verifies a token and returns the user data
  verifyToken: async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'your-secret-key'
      );

      const user = await userModel.getById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      // Remove sensitive data
      const { password_hash, ...userWithoutPassword } = user;

      res.json({ user: userWithoutPassword });
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({ message: 'Invalid token' });
    }
  },

  // For users to change their password
  changePassword: async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.user.user_id;

      // Get user from database
      const user = await userModel.getById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Verify current password
      const isCurrentPasswordValid = validPassword(
        currentPassword,
        user.password_hash
      );
      if (!isCurrentPasswordValid) {
        return res
          .status(401)
          .json({ message: 'Current password is incorrect' });
      }

      // Hash new password
      const newPasswordHash = generatePassword(newPassword);

      // Update user password
      await userModel.update(userId, { password_hash: newPasswordHash });

      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Change password error:', error);
      res.status(500).json({ message: error.message });
    }
  },

  logout: async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
  },
};

module.exports = authController;
