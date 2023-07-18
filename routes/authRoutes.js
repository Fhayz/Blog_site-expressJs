const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.post('/logout', authController.postLogout);

router.get('/', (req, res) => {
    // Handle the request and send the response
  });

exports.postSignup = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Check if user with the same username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).render('authentication/signup', { error: 'Username already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the new user
      const user = await User.create({ username, password: hashedPassword });
  
      // Store the user ID in the session
      req.session.userId = user._id;
  
      // Redirect to the homepage or user profile
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).render('authentication/signup', { error: 'Failed to sign up' });
    }
  };
  

module.exports = router;
