const Homework = require('../models/Homework');
exports.createHomework = async (req, res) => {
    try {
        const newHomework = new Homework({
            studentId: req.body.studentId,
            homework: req.file.path, // Save file path
            link: req.body.link,
            date: req.body.date
        });

        await newHomework.save();
        res.status(201).json(newHomework);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getHomework = async (req, res) => {
    try {
        const homework = await Homework.findById(req.params.id);
        if (!homework) return res.status(404).json({ message: 'Homework not found' });
        res.json(homework);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateHomework = async (req, res) => {
    try {
        const homework = await Homework.findById(req.params.id);
        if (!homework) return res.status(404).json({ message: 'Homework not found' });

        // Update fields
        homework.studentId = req.body.studentId || homework.studentId;
        homework.homework = req.file ? req.file.path : homework.homework; 
        homework.link = req.body.link || homework.link;
        homework.date = req.body.date || homework.date;

        await homework.save();
        res.json(homework);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteHomework = async (req, res) => {
    try {
        const homework = await Homework.findByIdAndDelete(req.params.id);
        if (!homework) return res.status(404).json({ message: 'Homework not found' });
        res.json({ message: 'Homework deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
