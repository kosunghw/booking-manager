const isAuth = (req, res, next) => {
  console.log('=== Auth Middleware ===');
  console.log('req.session:', req.session);
  console.log('req.user:', req.user);
  console.log('req.isAuthenticated():', req.isAuthenticated());
  console.log('req.cookies:', req.cookies);
  console.log('==================');
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Not authenticated' });
};

module.exports = isAuth;
