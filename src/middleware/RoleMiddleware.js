const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../config/jwt');

const RoleMiddleware = (roles) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
      }
      const token = authHeader.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Invalid authorization header format' });
      }

      const decoded = jwt.verify(token, JWT_SECRET_KEY);
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
      }

      // Attach decoded token to request
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};

module.exports = RoleMiddleware;
