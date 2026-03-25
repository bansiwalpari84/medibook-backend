const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor"
  },
  patientName: String,
  
  email: {       
    type: String,
    required: true
  },
  date: String,
  time: String,
  status: {
    type: String,
    enum: ["Pending", "Approved", "Cancelled"],
    default: "Pending"
    
  }
}, { timestamps: true })

module.exports = mongoose.model("Appointment", appointmentSchema);