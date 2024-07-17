// backend/AdminMiddleware.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send('Access denied');
  }

  try {
    const { userId } = jwt.verify(token, JWT_SECRET);
    req.userId = userId;
    next();
  } catch {
    res.status(401).send('Invalid token');
  }
};

module.exports = authMiddleware;
