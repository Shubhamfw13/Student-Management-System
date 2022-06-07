const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    rollnumber: { type: Number, unique: true },
    term: { type: String},
    contact: { type: Number, unique: true },
    currentyear: { type: Number },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = mongoose.model("Student", studentSchema);
