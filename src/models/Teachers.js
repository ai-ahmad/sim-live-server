const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const TeacherSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    working_time: {
        type: String,
        enum: ['Part Time', 'Full Time'],
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    telefon_number: {
        type: String,
        required: true
    },
    card_number: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Teacher', 'Admin'],
        default: 'Teacher'
    },
    level: {
        type: String,
        enum: ['Junior', 'Mid', 'Senior'],
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Pre-save middleware to hash the password before saving
TeacherSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

const Teacher = mongoose.model('Teacher', TeacherSchema);

module.exports = Teacher;
