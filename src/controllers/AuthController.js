// controllers/userController.js
const Auth = require('../models/AuthModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../config/jwt');

// Function to generate access token
const generateAccessToken = (id, role) => {
  const payload = { id, role };
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '12h' });
};

const registerUser = async (req, res) => {
  const { name, surname, password, age, phone, role, parents, price, status, attendance, group, gender, degree, workTime, info, firstDate, coin, discount } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 7);
    const user = await Auth.create({
      name,
      surname,
      password: hashPassword,
      age,
      phone,
      role,
      parents,
      price,
      status,
      attendance,
      group,
      gender,
      degree,
      workTime,
      info,
      firstDate,
      coin,
      discount,
    });
    res.status(201).json({ data: user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// User login
const loginUser = async (req, res) => {
  const { phone, password } = req.body;

  try {
    const user = await Auth.findOne({ phone: phone });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid Password' });
    }

    const token = generateAccessToken(user._id, user.role);
    res.json({ data: user, token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
