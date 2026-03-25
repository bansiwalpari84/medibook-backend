const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const mongoose = require("mongoose")


// CREATE APPOINTMENT
router.post("/", async (req, res) => {
  try {
    console.log("BODY RECEIVED :", req.body)
    const { doctorId, patientName, email, date, time } = req.body 

    const appointment = new Appointment({
      doctorId,
      patientName,
      email,  
      date,
      time
    })

    const saved = await appointment.save()
    res.status(201).json(saved)

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
});


// GET ALL APPOINTMENTS
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("doctorId");
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//for doctor profile 

router.get("/doctor/:id", async (req, res) => {
  const { id } = req.params

  // CHECK VALID ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid doctor ID" })
  }

  try {
    const appointments = await Appointment.find({
  doctorId: new mongoose.Types.ObjectId(id)
}).populate("doctorId")

    res.json(appointments)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//for appointment(doctor)
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )

    res.json(appointment)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router;