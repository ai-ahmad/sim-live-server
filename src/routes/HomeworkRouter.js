const express = require('express');
const multer = require('multer');
const router = express.Router();
const homeworkController = require('../controllers/HomeworkControlles');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true }); // Create the directory if it doesn't exist
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique file name
    }
});


const upload = multer({ storage: storage });

// Routes
router.post('/upload', upload.single('homework'), homeworkController.createHomework);
router.get('/:id', homeworkController.getHomework);
router.put('/upload/:id', upload.single('homework'), homeworkController.updateHomework);
router.delete('/:id', homeworkController.deleteHomework);

module.exports = router;
