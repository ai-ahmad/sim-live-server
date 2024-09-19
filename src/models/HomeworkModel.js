const mongoose = require('mongoose');

const HomeworkModels = mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Student'
    },
    homework: {
        type: String, 
        required: true
    },
    response_message: {
        type: String,
        required: false
    },
    link: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Homework', HomeworkModels);
