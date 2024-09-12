const express = require("express");
const cors = require("cors");
const run = require("./config/database.js")
const env = require('dotenv').config();

run()
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
