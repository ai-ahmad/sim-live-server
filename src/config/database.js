const mongoose = require("mongoose");
const uri = "mongodb+srv://azamat:azamat18@azamat.dfyih.mongodb.net/?retryWrites=true&w=majority&appName=Azamat"

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB using Mongoose!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process if unable to connect
  }
};

module.exports = connectDB;
