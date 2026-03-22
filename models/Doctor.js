const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  experience: String,
  fees: Number,
  image: String
});

module.exports = mongoose.model("Doctor", doctorSchema);