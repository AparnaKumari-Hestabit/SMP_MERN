const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User').default;
const { activeTokens } = require('../middleware/auth').default;

const secretKey = process.env.JWT_SECRET || 'aparna_kumari';
const router = express.Router();


router.post = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
};


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ error: 'Invalid credentials' });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
          return res.status(400).json({ error: 'Invalid password' });
      }

      // Generate a new token for each login
      const token = jwt.sign({ userId: user._id, email: user.email }, secretKey);

      // Store active token (Ensures only the latest token is valid)
      activeTokens.set(user._id.toString(), token);

      res.status(200).json({ token, userId: user._id });
  } catch (error) {
      res.status(500).json({ error: 'Server error' });
  }
});


router.post('/logout', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (token) {
      // Find user by token and remove from activeTokens
      jwt.verify(token, secretKey, (err, user) => {
          if (user) {
              activeTokens.delete(user.userId.toString());// Remove token
          }
      });
  }

  res.json({ message: 'Logged out successfully' });
});

module.exports = router;