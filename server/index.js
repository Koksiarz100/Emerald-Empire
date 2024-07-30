const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 8080;
const SECRET_KEY = 'n5Xy6bMN%rq%*57^Slq4';

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));

function verifyToken(req, res, next) {
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

app.post('/login', (req, res) => {
  const users = [
    { id: 1, login: 'admin', password: 'admin', username: 'Admin' },
  ];

  const { username, password } = req.body;
  const user = users.find(u => u.login === username && u.password === password);

  if (!user) {
    return res.status(401).send({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, login: user.login }, SECRET_KEY, { expiresIn: '1h' });
  const credentials = { id: user.id, username: user.username};
  console.log('User logged in as', user.username, ', Token generated:', token)
  res.send({ token, credentials });
});

app.get('/protected', verifyToken, (req, res) => {
  console.log('User get access to protected route:', req.userId);
  res.json({ message: 'Welcome to the protected route!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});