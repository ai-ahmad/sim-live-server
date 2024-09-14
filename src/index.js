const express = require('express');
const cors = require('cors');
const run = require('./config/database.js');
const studentCoinsRoutes = require('./routes/coinRoutes');
require('dotenv').config();

run();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Use the student coins routes
app.use('/api/students', studentCoinsRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
