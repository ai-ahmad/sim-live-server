require('dotenv').config()
const express = require('express');
const cors = require('cors');
const teacherRoutes = require('./routes/Teachers');
const studentsRoute = require('./routes/Students')
const connectDB = require('./config/database');


const app = express();
app.use(express.json());
app.use(cors());

connectDB()

// Use your teacher routes
app.use('/api/v1', teacherRoutes);
app.use('/api/v1/students', studentsRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
