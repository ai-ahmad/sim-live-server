const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../config/jwt');
const RoleMiddleware = (roles) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }
      const dependentRole = jwt.verify(token, JWT_SECRET_KEY);
      let isRole = false;
      roles.forEach((role) => {
        if (dependentRole.role === role) {
          isRole = true;
        }
      });

      if (!isRole) {
        return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
      }
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};

module.exports = RoleMiddleware;
