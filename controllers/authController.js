const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.getSignup = (req, res) => {
  res.render('authentication/signup');
};

exports.postSignup = async (req, res) => {
  // Handle user signup logic
};

exports.getLogin = (req, res) => {
  res.render('authentication/login');
};

exports.postLogin = async (req, res) => {
  // Handle user login logic
};

exports.postLogout = (req, res) => {
  // Handle user logout logic
};
