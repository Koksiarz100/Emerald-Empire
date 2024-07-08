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
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send({ message: 'No token provided.' });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(500).send({ message: 'Failed to authenticate token.' });
    req.userId = decoded.id;
    next();
  });
}

app.post('/login', (req, res) => {
  const users = [
    { id: 1, username: 'admin', password: 'admin' }
  ];

  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).send({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  console.log('User logged in:', user.username)
  res.send({ token });
});

app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'Welcome to the protected route!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});