const mongoose = require("mongoose");
const uri = "mongodb+srv://admin:admin@admiral.8xw5rol.mongodb.net/?retryWrites=true&w=majority&appName=Admiral"

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

const connectDB = async () => {
  try {
    await mongoose.connect(uri).then(() => console.log("Connected to MongoDB using Mongoose!")).catch(err => console.log("Error connecting"))
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
