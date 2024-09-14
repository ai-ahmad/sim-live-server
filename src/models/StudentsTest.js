const mongoose = require("mongoose");

const studentsSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  attendance: [
    {
      date: { type: String, required: false },
      was: { type: Boolean, required: false },
    },
  ],
});

module.exports = mongoose.model("Students", studentsSchema);
