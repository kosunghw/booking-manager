const jwt = require('jsonwebtoken');
const userModel = require('../models/User');

const verifyToken = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Format should be "Bearer [token]"
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Invalid token format' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from database
    const user = await userModel.getById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Set user in request
    req.user = user;
    next();
  } catch (error) {
    console.error('JWT verification error:', error.message);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = verifyToken;
