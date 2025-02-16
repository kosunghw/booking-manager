const { generatePassword } = require('../config/passwordUtils');
const userModel = require('../models/User');

const userController = {
  createUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashPassword = generatePassword(password);

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
    if (req.params.userId !== req.user.id);
    try {
      const user = await userModel.getById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // loginUser: async (req, res) => {
  //   try {
  //     console.log(req.body);
  //     const user = await userModel.getByName(req.body.username);
  //     if (!user) {
  //       return res.status(404).json({ message: 'User not found' });
  //     }
  //     const password = user.password_hash;
  //     const isUserValid = validPassword(req.body.password, password);
  //     if (!isUserValid) {
  //       return res.status(401).json({ message: 'Password is not correct' });
  //     }
  //     req.session.userId = user.user_id;
  //     res.status(200).json(user);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: error.message });
  //   }
  // },

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

  login: (req, res) => {
    console.log('=== Login Controller ===');
    console.log('req.session:', req.session);
    console.log('req.user:', req.user);
    console.log('req.isAuthenticated():', req.isAuthenticated());
    console.log('req.cookies:', req.cookies);
    console.log('==================');
    const { password_hash, created_at, ...safeUser } = req.user;
    res.json({
      message: 'Login successful',
      user: safeUser,
      isAuthenticated: req.isAuthenticated(),
    });
  },

  logout: (req, res) => {
    req.logout((err) => {
      if (err) {
        console.log('Logout Error:', err);
        return res.status(500).json({ message: 'Error logging out' });
      }
      res.clearCookie('userid');
      res.json({ message: 'Logged out successfully' });
    });
  },

  deleteUser: async (req, res) => {
    try {
      console.log(req.user);
      const userId = req.user.user_id;
      const user = await userModel.delete(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Passport logout
      req.logout((err) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to logout' });
        }

        req.session.destroy((err) => {
          if (err) {
            return res.status(500).json({ error: 'Failed to clear session' });
          }
          res.clearCookie('userid');
          res.json({ message: 'Account deleted successfully' });
        });
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = userController;
