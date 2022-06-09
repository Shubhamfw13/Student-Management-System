const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    return console.log("Connected STUDENT MANAGEMENT APP");
  } catch (err) {
    console.log({ ERROR: err.message });
  }
}; 
