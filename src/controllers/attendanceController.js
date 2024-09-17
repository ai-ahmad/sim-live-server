const Auth = require('../models/AuthModel');
const { DateTime } = require('luxon');

const updateAttendance = async (req, res) => {
  try {
    const { student_id, wasPresent, teacher_id } = req.body;
    if (!student_id || typeof wasPresent !== 'boolean' || !teacher_id) {
      return res.status(400).json({ success: false, message: 'Invalid input data' });
    }
    const uzbekistanTime = DateTime.utc().setZone('Asia/Tashkent').toISO();
    const currentDate = uzbekistanTime.split('T')[0];
    const currentTime = uzbekistanTime.split('T')[1].split('.')[0];
    const student = await Auth.findById(student_id);
    if (!student || student.role !== 'student') {
      return res.status(404).json({ success: false, message: 'Student not found or role is not "student"' });
    }
    const attendanceIndex = student.attendance.findIndex(record => {
      const recordDate = new Date(record.date).toISOString().split('T')[0];
      return recordDate === currentDate;
    });
    
    if (attendanceIndex !== -1) {
      student.attendance[attendanceIndex] = {
        ...student.attendance[attendanceIndex],
        wasPresent,
        teacher_id,
        time: currentTime
      };
    } else {
      const attendanceRecord = {
        wasPresent,
        student_id,
        date: currentDate,
        time: currentTime,
        teacher_id
      };
      student.attendance.push(attendanceRecord);
    }
    
    await student.save();
    res.status(201).json({
      success: true,
      message: 'Attendance record updated successfully!',
      data: student.attendance
    });
  } catch (error) {
    console.error('Error updating attendance record:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error updating attendance record',
      error: error.message
    });
  }
};

module.exports = {
  updateAttendance
};
