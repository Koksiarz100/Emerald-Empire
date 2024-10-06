const { verifyToken } = require('../middlewares');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'n5Xy6bMN%rq%*57^Slq4';

module.exports = (app) => {
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
};