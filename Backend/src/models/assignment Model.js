const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
  {
    assignmentname: { type: String, required: true },
    assignmentdetails: { type: String, required: true },
    start: { type: String, required: true }, 
    end: { type: String, required: true },
    assignmentstatus:{ type: String },
    student_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = mongoose.model("Assignment", assignmentSchema);
