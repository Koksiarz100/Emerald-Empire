const jwt = require('jsonwebtoken');
const SECRET_KEY = 'n5Xy6bMN%rq%*57^Slq4';

function verifyToken(req, res, next) { // Login middleware
  let token = req.headers['authorization'];
  if (!token) return res.status(403).send({ message: 'No token provided.' });

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error('Failed to authenticate token:', err);
      return res.status(500).send({ message: 'Failed to authenticate token.' });
    }
    req.userId = decoded.id;
    next();
  });
}

module.exports = { verifyToken };