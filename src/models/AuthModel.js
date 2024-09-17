const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number },
  phone: { type: [String] },
  role: { type: String, enum: ['teacher', 'tutor', 'branch_manager','student', 'admin', 'academy_manager', 'academy_department', 'operator','developers', 'finance', 'hr', 'methodologs','call_center', 'marketing', 'audit'], required: true },
  parents: [
    {
      ota: { type: String },
      ona: { type: String }
    }
  ],
  price: [
    {
      nout: Number,
      kurs: Number,
      dopkurs: Number
    }
  ],
  status: { type: String },
  attendance: { type: Array },
  group: [
    {
      id: String,
      time: String,
      teacherId: String
    }
  ],
  gender: { type: String },
  degree: { type: String },
  workTime: { type: String },
  info: {
    cardNumber: String,
    address: String,
    certification: String,
    education: String
  },
  firstDate: { type: Date },
  coin: { type: Number },
  discount: { type: Number }
});

module.exports = mongoose.model('Auth', authSchema);
