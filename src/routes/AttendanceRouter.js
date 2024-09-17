// routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const { updateAttendance } = require('../controllers/attendanceController');

router.post('/students/attendance', updateAttendance);

module.exports = router;
