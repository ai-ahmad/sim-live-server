const express = require('express');
const multer = require('multer');
const router = express.Router();
const homeworkController = require('../controllers/homeworkController'); // Import the controller

// Set up Multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to save uploaded files
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
