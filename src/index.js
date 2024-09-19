require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const { swaggerSpec } = require('./config/swagger'); 

const AuthRouter = require('./routes/AuthRouter'); 
const connectDB = require('./config/database');
const RoleMiddleware = require('./middleware/RoleMiddleware');
const TeacherRouter = require('./routes/Teachers');
const attendanceRoutes = require('./routes/AttendanceRouter'); 
const CoinRouter = require('./routes/coinRoutes');
const HwRouter = require('./routes/HomeworkRouter');

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Define routes
app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/student', CoinRouter);
app.use('/api/v1/attendance', RoleMiddleware(['teacher', 'admin']), attendanceRoutes);
app.use('/api/v1/student/homework', RoleMiddleware(['student']), HwRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
