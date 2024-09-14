const express = require('express');
const bcrypt = require('bcrypt');
const TeacherModel = require('../models/Teachers');

const router = express.Router();

// Get all teachers
router.get('/teachers', async (req, res) => {
  try {
    const teachers = await TeacherModel.find();
    if (teachers.length === 0) return res.status(404).json({ message: 'No teachers found' });
    res.status(200).json({ data: teachers });
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single teacher by ID
router.get('/teacher/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await TeacherModel.findById({
      _id: id
    });
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
    res.status(200).json({ data: teacher });
  } catch (err) {
    console.error('Error fetching teacher:', err); // Log specific error
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new teacher (with password hash)
router.post('/teacher/create', async (req, res) => {
  const { name, surname, working_time, age, date_of_birth, salary, telefon_number, card_number, role, level, password } = req.body;

  try {
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const teacher = new TeacherModel({
      name,
      surname,
      working_time,
      age,
      date_of_birth,
      salary,
      telefon_number,
      card_number,
      role,
      level,
      password: hashedPassword
    });

    await teacher.save(); // Save the new teacher
    res.status(201).json({ message: 'Teacher created successfully', data: teacher });
  } catch (err) {
    console.error('Error creating teacher:', err); // Log specific error
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a teacher by ID
router.delete('/teacher/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await TeacherModel.findByIdAndDelete(id);
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
    res.status(200).json({ message: 'Teacher deleted successfully', data: teacher });
  } catch (err) {
    console.error('Error deleting teacher:', err); // Log specific error
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
