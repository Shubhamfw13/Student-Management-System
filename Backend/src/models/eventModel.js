const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventname: { type: String, required: true },
    eventdetails: { type: String, required: true },
    start: { type: String, required: true }, 
    end: { type: String, required: true },
    eventstatus:{ type: Array },
    register: { type: "String",default: "Register Now" },
    student_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = mongoose.model("Event", eventSchema);
