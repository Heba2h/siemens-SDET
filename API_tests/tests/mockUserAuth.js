const express = require('express');

const mockUserAuth = () => {
  const router = express.Router();

  router.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') {
      res.json({ token: 'valid-token' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });

  router.post('/api/auth/register', (req, res) => {
    const { username, password, role } = req.body;
    if (!password) {
      res.status(400).json({ message: 'Password is required' });
    } else {
      res.status(201).json({ message: 'User registered successfully' });
    }
  });

  router.use((req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    if (token !== 'valid-token') {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  });

  router.get('/api/protected', (req, res) => {
    res.json({ message: 'This is a protected route' });
  });

  return router;
};

module.exports = mockUserAuth;
