require('dotenv').config();
const express = require('express');
const cors = require('cors');
const AuthRouter = require('./routes/AuthRouter'); 
const connectDB = require('./config/database');
const RoleMiddleware = require('./middleware/RoleMiddleware');
const TeacherRouter = require('./routes/Teachers');
const attendanceRoutes = require('./routes/AttendanceRouter'); 
const CoinRouter = require('./routes/coinRoutes');
const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/student',CoinRouter)
app.use('/api/v1',  RoleMiddleware(['teacher','admin']), attendanceRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
