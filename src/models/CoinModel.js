const mongoose = require('mongoose');

// Define the schema for student coins
const studentCoinsSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Student' 
  },
  numberOfCoins: {
    type: Number,
    required: true,
    min: [0, 'Coins cannot be negative']
  },
  teacherToken: {
    type: String,
    required: true
  },
}, {
  timestamps: true 
});

const StudentCoins = mongoose.model('StudentCoins', studentCoinsSchema);

module.exports = StudentCoins;
