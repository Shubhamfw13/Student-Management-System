const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    subject: { type: String },
    role: { type: String, default: "Faculty", required: true },
    password: { type: String, required: true },
    student_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = mongoose.model("Faculty", facultySchema);
