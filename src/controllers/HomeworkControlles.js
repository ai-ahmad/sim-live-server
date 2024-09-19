const Homework = require('../models/AuthModel');
const moment = require('moment-timezone');

// Create Homework
exports.createHomework = async (req, res) => {
    try {
        const student = await Homework.findOne({ _id: req.body.studentId, role: 'student' });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const fileUrl = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;

        // Automatically set the date to the current date and time in Uzbekistan timezone
        const newHomework = {
            fileUrl: fileUrl,
            date: req.body.date || moment().tz('Asia/Tashkent').format('YYYY-MM-DD HH:mm:ss')
        };

        student.homework.push(newHomework);

        // Save the updated student document
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Homework
exports.getHomework = async (req, res) => {
    try {
        const homework = await Homework.findById(req.params.id);
        if (!homework) return res.status(404).json({ message: 'Homework not found' });
        res.json(homework);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Homework
exports.updateHomework = async (req, res) => {
    try {
        const homework = await Homework.findById(req.params.id);
        if (!homework) return res.status(404).json({ message: 'Homework not found' });

        // Construct the URL of the uploaded file if a new file is provided
        const fileUrl = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : homework.homework;

        homework.studentId = req.body.studentId || homework.studentId;
        homework.homework = fileUrl;
        homework.link = req.body.link || homework.link;
        homework.date = req.body.date || moment().tz('Asia/Tashkent').format('YYYY-MM-DD HH:mm:ss');

        await homework.save();
        res.json(homework);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Homework
exports.deleteHomework = async (req, res) => {
    try {
        const homework = await Homework.findByIdAndDelete(req.params.id);
        if (!homework) return res.status(404).json({ message: 'Homework not found' });
        res.json({ message: 'Homework deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
